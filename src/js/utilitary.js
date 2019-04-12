function quicker() {

  const fetchJSON = async (url, func) => {
    const r = await fetch(url)
      .then(res => res.json())
      .then(json => json);
    func(r);
  };

  function createElementsFromArray(_parent = document.querySelector('body'), _array) {
    // createElementsFromArray stands for putArrayInElement
    for (const i of _array) {
      const currentElement = document.createElement(i.name);
      _parent.appendChild(currentElement);
      if (i.inner) currentElement.innerHTML += i.inner;
      if (i.attr) {
        for (let a in i.attr) {
          currentElement.setAttribute(a, i.attr[a]);
        }
      }
      if (i.children) {
        createElementsFromArray(currentElement, i.children);
      }
    }
  }

  function analyseAudio(audio) {
    // variable = analyseAudio(audio) --> after user triggering (click or alike)
    // variable.getFrequency().array --> inside a framelooper function
    const context = new AudioContext();
    const analyser = context.createAnalyser();
    const source = context.createMediaElementSource(audio);
    let audioArray;
    source.connect(analyser);
    analyser.connect(context.destination);
    function getAverage(array) {
      return array.reduce((a, b) => a + b) / array.length;
    }
    return {
      getFrequency() {
        audioArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(audioArray);
        return {
          array: audioArray,
          average: getAverage(audioArray),
        };
      },
      getAmplitude() {
        audioArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteTimeDomainData(audioArray);
        return {
          array: audioArray,
          average: getAverage(audioArray),
        };
      },
    };
  }

  function appendChildren(parent, array) {
    array.forEach((elem) => {
      parent.appendChild(elem);
    });
  }

  function styleElems(elems, rule) {
    elems.forEach((elem) => {
      for (let property in rule) {
        elem.style.setProperty(property, rule[property]);
      }
    });
  }

  function showFrameRate() {
    const parent = document.createElement('p');
    const frameRateElem = document.createElement('span');
    const averageFrameRateElem = document.createElement('span');

    let frameRate = 0;
    let averageFrameRate = 0;
    let frameRatesAmount = 0;
    let frameRatesSummation = 0;

    function requestFrame() {
      frameRate += 1;
      requestAnimationFrame(requestFrame);
    }
    requestFrame();

    setInterval(() => {
      frameRatesSummation += frameRate;
      frameRatesAmount += 1;
      averageFrameRate = frameRatesSummation / frameRatesAmount;

      frameRateElem.innerText = `Frame rate: ${frameRate}`;
      averageFrameRateElem.innerText = `Average frame rate: ${averageFrameRate.toFixed(2)}`;
      frameRate = 0;
    }, 1000);

    styleElems([parent], {
      background: '#000',
      color: '#ff0',
      position: 'fixed',
      top: '0',
      right: '0',
      margin: '0',
    });

    styleElems([frameRateElem, averageFrameRateElem], {
      display: 'block',
      'text-align': 'left',
      margin: '5px',
    });

    appendChildren(parent, [frameRateElem, averageFrameRateElem]);
    document.body.appendChild(parent);
  }

  function numberToTime(num) {
    let hours = Math.floor(num / 3600);
    let minutes = Math.floor((num - (hours * 3600)) / 60);
    let seconds = (num - (hours * 3600) - (minutes * 60)).toFixed(0);

    if (hours <= 9) hours = `0${hours}`;
    if (minutes <= 9) minutes = `0${minutes}`;
    if (seconds <= 9) seconds = `0${seconds}`;

    if (!isNaN(num)) return `${parseInt(hours, 10) ? `${hours}:` : ''}${minutes}:${seconds}`;
    return '--:--';
  }

  function manage(tabButtons, tabs) {
    function resetTabs() {
      tabButtons.forEach((tabButton, i) => {
        tabButton.setAttribute('highlight', false);
        tabs[i].style.opacity = '0';
        tabs[i].style.visibility = 'hidden';
      });
    }
    return {
      tabs(defaultIndex) {
        resetTabs();
        tabButtons[defaultIndex || '0'].setAttribute('highlight', true);
        tabs[defaultIndex || '0'].style.opacity = '1';
        tabs[defaultIndex || '0'].style.visibility = 'visible';
        for (let i = 0; i < tabButtons.length; i += 1) {
          tabButtons[i].addEventListener('click', () => {
            resetTabs();
            tabButtons[i].setAttribute('highlight', true);
            tabs[i].style.opacity = '1';
            tabs[i].style.visibility = 'visible';
          });
        }
      },
    };
  }

  function keepArrayToLocalStorage(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
  }

  function createDragDrop(attr, value) {
    let dragged;
    const songsWrappers = document.getElementsByClassName('songs-container__songs-wrapper');

    document.addEventListener(`dragstart`, (event) => {
      dragged = event.target;
    }, false);

    document.addEventListener(`dragover`, (event) => {
      event.preventDefault();
    }, false);

    document.addEventListener(`drop`, (event) => {
      const elem = event.target;

      if (elem.getAttribute(attr) === value) {
        elem.insertBefore(dragged, elem.childNodes[0]);
        composeArray(songsWrappers[0], singletonSongs.availableSongs);
        keepArrayToLocalStorage('songsArray', singletonSongs.availableSongs);
        composeArray(songsWrappers[1], singletonSongs.playlist);
        keepArrayToLocalStorage('playlistArray', singletonSongs.playlist);
      }
    }, false);
  }

  // PRIVATE
  function composeArray(wrapper, array) {
    const children = wrapper.children;
    const composedArray = array;

    composedArray.length = 0;
    // empties the array without changing reference

    for (let i = 0; i < children.length; i += 1) {
      const objComposed = JSON.parse(children[i].getAttribute('data-compose'));
      composedArray.push(objComposed);
    }
  }


  function updateLiSongs(parent, array) {
    parent.innerHTML = '';
    array.forEach((obj) => {
      quicker().createElementsFromArray(parent, [
        {
          name: 'div',
          attr: {
            class: 'play-song',
            draggable: 'true',
            ondragstart: 'event.dataTransfer.setData("text/plain",null)',
            'data-compose': JSON.stringify(obj),
          },
          children: [
            {
              name: 'h4',
              attr: {
                class: 'play-song__title',
              },
              inner: obj.title,
            },
            {
              name: 'button',
              attr: {
                starred: obj.starred,
                class: 'star',
              },
            },
          ],
        },
      ]);
    });
  }

  return {
    updateLiSongs: updateLiSongs,
    createDragDrop: createDragDrop,
    keepArrayToLocalStorage: keepArrayToLocalStorage,
    manage: manage,
    numberToTime: numberToTime,
    showFrameRate: showFrameRate,
    styleElems: styleElems,
    appendChildren: appendChildren,
    analyseAudio: analyseAudio,
    createElementsFromArray: createElementsFromArray,
    fetchJSON: fetchJSON,
  };
}
