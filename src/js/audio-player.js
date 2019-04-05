/**
 * Valuable resources
 * // eslint-disable-line
 */

function init(singleton) { // eslint-disable-line
  console.log(singleton);
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

  let songIndex = 0;
  let playBool = true;

  audio.crossOrigin = 'anonymous';
  audio.addEventListener('ended', () => {
    songIndex += 1;
    if (songIndex > singleton.playlist.length - 1) songIndex = 0;
    audio.src = singleton.playlist[songIndex].sources.mp3;
    audio.play();
  });
  playButton.addEventListener('click', () => {
    if (singleton.playlist.length) {
      audio.src = singleton.playlist[songIndex].sources.mp3;
      if (playBool) {
        quicker().styleElems([playButton], buttons.pauseElemStyle); // eslint-disable-line
        audio.play();
        if (singleton.playButton) {
          singleton.playButton = false;
          singleton.setTimeline(audio);
        }
      } else {
        quicker().styleElems([playButton], buttons.playElemStyle); // eslint-disable-line
        audio.pause();
      }
      playBool = !playBool;
    }
  });
}
