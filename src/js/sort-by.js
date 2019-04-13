(function () {
  const itemSort = document.getElementById('item-sort');

  function sortContainers(e) {
    function getStrCharValues(str) {
      let num = 0;

      str += '';

      for (let i = 0; i < str.length - 1; i += 1) {
        const char = str[i];
        num += char.charCodeAt() / (i * 10 + 1);
      }
      return num;
    }

    function sort(array, propName) {
      array.sort((a, b) =>
        getStrCharValues(a[propName]) - getStrCharValues(b[propName]));
    }

    const value = e.target.value;
    let availableSongsArray = [].concat(singletonSongs.availableSongs);
    let playlistArray = [].concat(singletonSongs.playlist);
    const sortsObj = {
      title(array) {
        sort(array, 'title');
      },
      album(array) {
        sort(array, 'album');
      },
      starred(array) {
        if (array === availableSongsArray) {
          availableSongsArray = array.filter((a) => a.starred === 'true');
        } else {
          playlistArray = array.filter((a) => a.starred === 'true');
        }
      },
      artist(array) {
        sort(array, 'artist');
      },
      year(array) {
        sort(array, 'year');
      },
    };

    if (availableSongs.children.length)
      sortsObj[value](availableSongsArray);
    if (playlist.children.length)
      sortsObj[value](playlistArray);

    quicker().updateLiSongs(availableSongs, availableSongsArray);
    quicker().updateLiSongs(playlist, playlistArray);
  }

  itemSort.addEventListener('input', sortContainers);
}());
