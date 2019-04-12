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
  const audioBar = document.querySelector('.audio-bar');

  let songIndex = 0;
  let playBool = true;

  function setDefaultImage() {
    let coverImage = singletonSongs.playlist[songIndex].image;
    if (coverImage) {
      background.style.setProperty('background-image', `url(${coverImage})`);
    } else {
      background.style.setProperty('background-image', 'url("https://cdna.artstation.com/p/assets/images/images/015/875/250/large/ismail-inceoglu-base-17.jpg?1550004256")');
    }
  }

  function changeTime(e) {
    const x = e.clientX; // mouse pos when clicked
    const width = audioBar.clientWidth + 135; // width of audioBar
    const newTime = audio.duration / (width / x);
    audio.currentTime = newTime;
  }

  function reactToAudioPlayer() {
    audio.pause();
    if (singletonSongs.playlist.length) {
      let indexSource = singletonSongs.playlist[songIndex].sources.mp3;
      if (playBool) {
        quicker().styleElems([playButton], buttons.pauseElemStyle);
        songTitle.innerText = singletonSongs.playlist[songIndex].title;
        if (audio.src !== indexSource) audio.src = indexSource;
        audio.play(); // ----------------------------------------------- seek 4 bug
        setDefaultImage();
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
    playBool = true;
    if (songIndex > singletonSongs.playlist.length - 1) songIndex = 0;
    reactToAudioPlayer();
  }

  audio.crossOrigin = 'anonymous';

  setTimeline(audio);

  quicker().manage(tabBtns, tabs).tabs(0);

  audioBar.addEventListener('click', changeTime);

  audio.addEventListener('ended', songEnded);

  playButton.addEventListener('click', reactToAudioPlayer);

  prev.addEventListener('click', () => {
    songIndex -= 1;
    playBool = true;
    if (songIndex < 0) songIndex = singletonSongs.playlist.length - 1;
    reactToAudioPlayer();
  });
  next.addEventListener('click', songEnded);
}
