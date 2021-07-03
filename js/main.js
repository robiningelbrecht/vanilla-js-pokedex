import App from "./App/App.js";
import PokeApi from "./App/PokeApi.js";
import Cache from "./App/Cache.js";

let slide_up_down_el = document.querySelector('.slide-up-down');

// Init app.
let app = new App(
  new PokeApi(),
  new Cache(),
  new Audio("/assets/audio/theme.mp3")
);
app.init();
app.lazyLoadBackground();
app.populatePokeList(slide_up_down_el);

// Event listeners for Flickity.
await app.updatePokeInfo(1);
app.flickity.on('change', async (index) => {
  await app.updatePokeInfo(index + 1);
});

// Event listeners for d-pad buttons.
document.querySelector('.d-pad a.right').addEventListener('click', () => {
  app.flickity.next();
});
document.querySelector('.d-pad a.left').addEventListener('click', () => {
  app.flickity.previous();
});
document.querySelector('.d-pad a.up').addEventListener('click', () => {
  slide_up_down_el.classList.add('up');
});
document.querySelector('.d-pad a.down').addEventListener('click', () => {
  slide_up_down_el.classList.remove('up');
});
// Event listener for pokelist.
slide_up_down_el.addEventListener('click', async (event) => {
  if (event.target.dataset.pokeIndex) {
    let index = event.target.dataset.pokeIndex;
    app.flickity.select(index - 1);
    await app.updatePokeInfo(index);
    slide_up_down_el.classList.remove('up');
  }
});

// Event listener for arrow keys.
document.body.onkeyup = (e) => {
  switch (e.which) {
    case 37:
      app.flickity.previous();
      break;
    case 39:
      app.flickity.next();
      break;
    case 38:
      slide_up_down_el.classList.add('up');
      break;
    case 40:
      slide_up_down_el.classList.remove('up');
      break;
  }
};
// Event listeners for audio buttons.
let play_button_el = document.querySelector('.play-button');
play_button_el.addEventListener('click', () => {
  app.toggleAudio();
  play_button_el.classList.toggle('paused');
});
