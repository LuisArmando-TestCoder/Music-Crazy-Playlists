/**
 * Valuable resources
 * // eslint-disable-line
 */

function quicker() { // eslint-disable-line

  const fetchJSON = async (url, func) => {
    const r = await fetch(url)
      .then(res => res.json())
      .then(json => json);
    func(r);
  };

  function createElementWithNS(elem) {
    const theElem = document.createElementNS('http://www.w3.org/2000/svg', elem);
    if (elem.toLowerCase() === 'svg') {
      theElem.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    }
    return theElem;
  }

  function canvasManageSize(canvas) {
    const c = canvas;
    function setSize() {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    }
    setSize();
    window.addEventListener('resize', setSize);
  }

  function createElementsFromArray(_parent = document.querySelector('body'), _array) {
    // createElementsFromArray stands for putArrayInElement
    for (const i of _array) {
      const currentElement = document.createElement(i.name);
      _parent.appendChild(currentElement);
      if (i.inner) currentElement.innerHTML += i.inner;
      if (i.attr) {
        for (let a in i.attr) { // eslint-disable-line
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
      for (let property in rule) { // eslint-disable-line
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

    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    if (!isNaN(num)) return `${parseInt(hours, 10) ? `${hours}:` : ''}${minutes}:${seconds}`;
    return '--:--';
  }

  return {
    numberToTime: numberToTime, // eslint-disable-line
    showFrameRate: showFrameRate, // eslint-disable-line
    styleElems: styleElems, // eslint-disable-line
    appendChildren: appendChildren, // eslint-disable-line
    analyseAudio: analyseAudio, // eslint-disable-line
    createElementsFromArray: createElementsFromArray, // eslint-disable-line
    canvasManageSize: canvasManageSize, // eslint-disable-line
    createElementWithNS: createElementWithNS, // eslint-disable-line
    fetchJSON: fetchJSON, // eslint-disable-line
  };
}
