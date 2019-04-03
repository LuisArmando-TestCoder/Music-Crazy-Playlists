const SongsArray = (function() {
  // eslint-disable-line
  let instance = null;
  return class Singleton {
    constructor(data) {
      const localSongs = localStorage.getItem(`songsArray`);

      if (data.length) this.data = data;
      else this.data = [];

      if (localSongs) this.data = this.data.concat(JSON.parse(localSongs));

      init(this.data); // eslint-disable-line

      return instance ? instance : (instance = this); // eslint-disable-line
    }

    updateList(parent) {
      this.data.forEach((obj) => {
        quicker().createElementsFromArray(parent, [
          {
            name: `div`,
            attr: {
              class: `play-song`,
              draggable: `true`,
              ondragstart: `event.dataTransfer.setData('text/plain',null)`
            },
            children: [
              {
                name: `h4`,
                attr: {
                  class: `play-song__title`
                },
                inner: obj.title
              },
              {
                name: `button`,
                attr: {
                  class: `star`
                }
              }
            ]
          }
        ]);
      });
    }

    createDragDrop(attr, value) {
      let dragged;

      document.addEventListener(`dragstart`, (event) => {
        dragged = event.target;
        console.log(dragged)
      }, false);

      document.addEventListener(`dragover`, (event) => {
        event.preventDefault();
      }, false);

      document.addEventListener(`drop`, (event) => {
        const elem = event.target;
        console.log(elem.getAttribute(attr));
        if (elem.getAttribute(attr) === value) {
          elem.insertBefore(dragged, elem.childNodes[0]);
        }
      }, false);
    }
  };
}());
