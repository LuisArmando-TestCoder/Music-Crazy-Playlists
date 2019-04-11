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
    const availableSongsArray = [].concat(singletonSongs.availableSongs);
    const playlistArray = [].concat(singletonSongs.playlist);
    const sortsObj = {
      title(array) {
        sort(array, 'title');
      },
      album(array) {
        sort(array, 'album');
      },
      starred(array) {
        // just filter
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

      console.log(availableSongsArray);
      console.log(playlistArray);

    singletonSongs.updateLiSongs(availableSongs, availableSongsArray);
    singletonSongs.updateLiSongs(playlist, playlistArray);
  }

  itemSort.addEventListener('input', sortContainers);
}());
