(function () {
  function getAudioSongs(data) {
    singletonSongs = new SongsArray(data);
    singletonSongs.updateLiSongs(availableSongs, singletonSongs.availableSongs);
    singletonSongs.createDragDrop('class', 'songs-container__songs-wrapper');
  }

  const path = './data/initialSongs.json';
  quicker().fetchJSON(path, getAudioSongs);
}());
