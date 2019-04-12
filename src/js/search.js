(function () {
  const itemSearch = document.getElementById('item-search');

  function searchContainers(e) {

    const value = e.target.value;
    let availableSongsArray = [].concat(singletonSongs.availableSongs);
    let playlistArray = [].concat(singletonSongs.playlist);

    function search(array, value) {
      if (array == availableSongsArray) {
        availableSongsArray = array.filter((obj) => obj.title.toLowerCase().indexOf(value.toLowerCase()) > -1);
      } else {
        playlistArray = array.filter((obj) => obj.title.toLowerCase().indexOf(value.toLowerCase()) > -1);
      }
    }

    if (availableSongs.children.length)
      search(availableSongsArray, value);
    if (playlist.children.length)
      search(playlistArray, value);

    quicker().updateLiSongs(availableSongs, availableSongsArray);
    quicker().updateLiSongs(playlist, playlistArray);
  }

  itemSearch.addEventListener('input', searchContainers);
}());
