(function () {
  const itemDelete = document.getElementById('item-delete');
  const cancelItem = document.getElementById('cancel-item');
  const eraseItem = document.getElementById('erase-item');
  const modal = document.getElementsByClassName('modals__modal')[1];
  const songsContainer = document.querySelector('.songs-container');

  let target;

  function hideModal() {
    modal.setAttribute('unavailable', '');
  }

  function openDeleteModal() {
    if (target) modal.removeAttribute('unavailable');
  }

  function setTarget(e) {
    if (e.target.className === 'play-song') target = e.target;
  }

  function deleteTarget() {
    const parent = target.parentElement;
    const index = Array.from(parent.children).indexOf(target);
    if (parent == availableSongs) {
      singletonSongs.availableSongs.splice(index, 1);
      quicker().updateLiSongs(availableSongs, singletonSongs.availableSongs);
      quicker().keepArrayToLocalStorage('songsArray', singletonSongs.availableSongs);
    } else {
      singletonSongs.playlist.splice(index, 1);
      quicker().updateLiSongs(playlist, singletonSongs.playlist);
      quicker().keepArrayToLocalStorage('playlistArray', singletonSongs.playlist);
    }
    hideModal();
  }

  cancelItem.addEventListener('click', hideModal);

  eraseItem.addEventListener('click', deleteTarget);

  songsContainer.addEventListener('click', setTarget);

  itemDelete.addEventListener('click', openDeleteModal);
}());
