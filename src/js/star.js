(function () {
  const songsContainer = document.querySelector('.songs-container');

  function starElement(e) {

    function starObject(obj, t) {
      obj.starred = t.getAttribute('starred');
      console.log(obj.starred);
    }

    if (e.target.className === 'star') {
      const t = e.target;
      const parent = t.parentElement.parentElement;
      const index = Array.from(parent.children).indexOf(t.parentElement);

      if (t.getAttribute('starred') === 'true') {
        t.setAttribute('starred', 'false');
      } else t.setAttribute('starred', 'true');

      if (parent === availableSongs) {
        starObject(singletonSongs.availableSongs[index], t);
      quicker().keepArrayToLocalStorage('songsArray', singletonSongs.availableSongs);
      } else {
        starObject(singletonSongs.playlist[index], t);
      quicker().keepArrayToLocalStorage('playlistArray', singletonSongs.playlist);
      }

      quicker().updateLiSongs(availableSongs, singletonSongs.availableSongs);
      quicker().updateLiSongs(playlist, singletonSongs.playlist);
    }
  }

  songsContainer.addEventListener('click', starElement);
}());
