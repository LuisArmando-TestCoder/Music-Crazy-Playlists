const SongsArray = (function() {
  let instance = null;
  return class Singleton {
    constructor(availableSongs) {
      const localSongs = localStorage.getItem('songsArray');
      const localPlaylist = localStorage.getItem('playlistArray');

      if (localSongs) this.availableSongs = JSON.parse(localSongs);
      else if (availableSongs.length) this.availableSongs = availableSongs;
      else this.availableSongs = [];

      if (localPlaylist) this.playlist = JSON.parse(localPlaylist);
      else this.playlist = [];

      this.playButton = true;

      return instance ? instance : instance = this;
    }
  };
}());
