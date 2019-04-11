(function () {
  const itemDisplay = document.getElementById('item-display');
  function displayParent() {
    const parent = itemDisplay.parentElement.parentElement.parentElement;
    if (itemDisplay.checked) {
      return parent.removeAttribute('undisplay');
    }
    return parent.setAttribute('undisplay', '');
  }
  itemDisplay.addEventListener('click', displayParent);
}());
