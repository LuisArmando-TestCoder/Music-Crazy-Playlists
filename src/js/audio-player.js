/**
 * Valuable resources
 * // eslint-disable-line
 */

function init(data) { // eslint-disable-line
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
  let songIndex = 0;
  audio.crossOrigin = 'anonymous';
  audio.src = data[songIndex].sources.mp3;
  const playButton = document.querySelector('.play');
  let playBool = true;
  audio.addEventListener('ended', () => {
    songIndex += 1;
    if (songIndex > data.length - 1) songIndex = 0;
    audio.src = data[songIndex].sources.mp3;
    audio.play();
  });
  playButton.addEventListener('click', () => {
    if (playBool) {
      quicker().styleElems([playButton], buttons.pauseElemStyle); // eslint-disable-line
      audio.play();
    } else {
      quicker().styleElems([playButton], buttons.playElemStyle); // eslint-disable-line
      audio.pause();
    }
    playBool = !playBool;
  });
}
