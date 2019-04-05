let singletonSongs; // eslint-disable-line

(function () {
  function getAudioSongs(data) {
    singletonSongs = new SongsArray(data);
    const availableSongs = document.getElementsByClassName('songs-container__songs-wrapper')[0];
    singletonSongs.updateAvailableSongs(availableSongs);
    singletonSongs.createDragDrop('class', 'songs-container__songs-wrapper');
  }
  const path = './data/initialSongs.json';
  quicker().fetchJSON(path, getAudioSongs); // eslint-disable-line
}());

// const singletonSongs = async (url) => {
//   const r = await fetch(url)
//     .then(res => res.json())
//     .then(json => json);
//   func(r);
// };
