const SongsArray = (function() {
  let instance = null;
  return class Singleton {
    constructor(initialSongsData) {
      const localSongs = localStorage.getItem(`songsArray`);

      if (localSongs) this.initialSongsData = JSON.parse(localSongs);
      else if (initialSongsData.length) this.initialSongsData = initialSongsData;
      else this.initialSongsData = [];
      this.playlist = [];
      this.availableSongs = this.initialSongsData;
      this.playButton = true;

      return instance ? instance : (instance = this); // eslint-disable-line
    }

    updateAvailableSongs(parent) {
      this.initialSongsData.forEach((obj) => {
        quicker().createElementsFromArray(parent, [
          {
            name: 'div',
            attr: {
              class: 'play-song',
              draggable: 'true',
              ondragstart: 'event.dataTransfer.setData("text/plain",null)',
              'data-compose': JSON.stringify(obj),
            },
            children: [
              {
                name: 'h4',
                attr: {
                  class: 'play-song__title',
                },
                inner: obj.title,
              },
              {
                name: 'button',
                attr: {
                  class: 'star',
                },
              },
            ],
          },
        ]);
      });

      init(this); // eslint-disable-line
    }

    composeArray(wrapper, array) {
      const children = wrapper.children;
      const composedArray = array;

      composedArray.length = 0;
      // empties the array without changing reference

      for (let i = 0; i < children.length; i += 1) {
        const objComposed = JSON.parse(children[i].getAttribute('data-compose'));
        composedArray.push(objComposed);
      }
    }

    createDragDrop(attr, value) {
      let dragged;
      const songsWrappers = document.getElementsByClassName('songs-container__songs-wrapper');

      document.addEventListener(`dragstart`, (event) => {
        dragged = event.target;
      }, false);

      document.addEventListener(`dragover`, (event) => {
        event.preventDefault();
      }, false);

      document.addEventListener(`drop`, (event) => {
        const elem = event.target;

        if (elem.getAttribute(attr) === value) {
          elem.insertBefore(dragged, elem.childNodes[0]);
          this.composeArray(songsWrappers[0], this.availableSongs);
          this.composeArray(songsWrappers[1], this.playlist);
        }
      }, false);
    }
  };
}());
