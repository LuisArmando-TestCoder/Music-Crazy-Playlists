(function () {
  function getAudioSongs(data) {
    const singletonSongs = new SongsArray(data); // eslint-disable-line
    const availableSongs = document.getElementsByClassName('songs-container__songs-wrapper')[0];
    singletonSongs.updateAvailableSongs(availableSongs);
    singletonSongs.createDragDrop('class', 'songs-container__songs-wrapper');
  }
  const path = './data/initialSongs.json';
  quicker().fetchJSON(path, getAudioSongs); // eslint-disable-line
}());
