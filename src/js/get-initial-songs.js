(function () {
  function getAudioSongs(data) {
    singletonSongs = new SongsArray(data);
    quicker().updateLiSongs(availableSongs, singletonSongs.availableSongs);
    quicker().updateLiSongs(playlist, singletonSongs.playlist);
    quicker().createDragDrop('class', 'songs-container__songs-wrapper');
    init(singletonSongs);
  }

  const path = './data/initialSongs.json';
  quicker().fetchJSON(path, getAudioSongs);
}());
