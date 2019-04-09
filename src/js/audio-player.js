function init() {
  const buttons = {
    playElemStyle: {
      '-webkit-clip-path': 'polygon(0% 0%, 0% 100%, 100% 50%)',
      'clip-path': 'polygon(0% 0%, 0% 100%, 100% 50%)',
    },
    pauseElemStyle: {
      '-webkit-clip-path': `polygon(60% 100%, 60% 0, 80% 0, 80%
                            100%, 60% 100%, 40% 100%, 20% 100%,
                            20% 0, 40% 0, 40% 100%)`,
      'clip-path': `polygon(60% 100%, 60% 0, 80% 0, 80% 100%, 60%
                    100%, 40% 100%, 20% 100%, 20% 0, 40% 0, 40% 100%)`,
    },
  };
  const audio = new Audio();
  const playButton = document.querySelector('.play');
  const background = document.querySelector('.audio-player');
  const songTitle = document.querySelector('.song__title');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const tabBtns = document.querySelectorAll('.tabs-buttons button');
  const tabs = document.getElementsByClassName('tabs__tab');

  let songIndex = 0;
  let playBool = true;

  function manage(tabButtons, tabs) {
    function resetTabs() {
      tabButtons.forEach((tabButton, i) => {
        tabButton.setAttribute('highlight', false);
        tabs[i].style.visibility = 'hidden';
      });
    }
    return {
      tabs(defaultIndex) {
        resetTabs();
        tabButtons[defaultIndex || '0'].setAttribute('highlight', true);
        tabs[defaultIndex || '0'].style.visibility = 'visible';
        for (let i = 0; i < tabButtons.length; i += 1) {
          tabButtons[i].addEventListener('click', () => {
            resetTabs();
            tabButtons[i].setAttribute('highlight', true);
            tabs[i].style.visibility = 'visible';
          });
        }
      },
    };
  }

  function reactToAudioPlayer() {
    if (singletonSongs.playlist.length) {
      let indexSource = singletonSongs.playlist[songIndex].sources.mp3;
      if (playBool) {
        quicker().styleElems([playButton], buttons.pauseElemStyle);
        background.style.setProperty(
          'background-image',
          `url(${singletonSongs.playlist[songIndex].image})`,
        );
        songTitle.innerText = singletonSongs.playlist[songIndex].title;
        if (audio.src !== indexSource) audio.src = indexSource;
        audio.play();
      } else {
        quicker().styleElems([playButton], buttons.playElemStyle);
        audio.pause();
      }
      playBool = !playBool;
    }
  }

  function setTimeline(audio) {
    const timelineMark = document.querySelector('.audio-bar__loader');
    const currentTimeMark = document.querySelector('.audio-timeline__current');
    const durationMark = document.querySelector('.audio-timeline__final');

    function mark() {
      let percentage = audio.currentTime / audio.duration * 100;
      timelineMark.style.left = `${percentage}%`;
      currentTimeMark.innerText = quicker().numberToTime(audio.currentTime);
      durationMark.innerText = quicker().numberToTime(audio.duration);
    }

    audio.addEventListener('timeupdate', mark);
  }

  function songEnded() {
    songIndex += 1;
    if (songIndex > singletonSongs.playlist.length - 1) songIndex = 0;
    audio.src = singletonSongs.playlist[songIndex].sources.mp3;
    audio.play();
    background.style.setProperty(
      'background-image',
      `url(${singletonSongs.playlist[songIndex].image})`,
    );
  }

  audio.crossOrigin = 'anonymous';

  setTimeline(audio);

  manage(tabBtns, tabs).tabs(0);

  audio.addEventListener('ended', songEnded);

  playButton.addEventListener('click', reactToAudioPlayer);

  prev.addEventListener('click', () => {
    songIndex -= 1;
    playBool = true;
    if (songIndex < 0) songIndex = singletonSongs.playlist.length - 1;
    reactToAudioPlayer();
  });
  next.addEventListener('click', () => {
    songIndex += 1;
    playBool = true;
    if (songIndex > singletonSongs.playlist.length - 1) songIndex = 0;
    reactToAudioPlayer();
  });
}
