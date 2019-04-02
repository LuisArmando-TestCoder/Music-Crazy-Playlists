/**
 * Valuable resources
 * // eslint-disable-line
 */

(function () {
  function getAudioSongs(data) {
    console.log(data);
    init(data); // eslint-disable-line
  }
  const path = './data/initialSongs.json';
  quicker().fetchJSON(path, getAudioSongs); // eslint-disable-line
}());
