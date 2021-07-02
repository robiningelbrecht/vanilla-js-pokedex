import App from "./App/App.js";
import PokeApi from "./App/PokeApi.js";

let app = new App(
  new PokeApi(),
  new Audio("/assets/audio/theme.mp3")
);
app.init();
app.lazyLoadBackground();

// Event listeners for Flickity.
await app.updatePokeInfo(1);
app.flivkity.on('change', async function (index) {
  await app.updatePokeInfo(index + 1);
});

// Event listeners for previous/next buttons.
document.querySelector('.d-pad a.right').addEventListener('click', function () {
  app.flivkity.next();
});
document.querySelector('.d-pad a.left').addEventListener('click', function () {
  app.flivkity.previous();
});
document.body.onkeyup = function(e) {
  switch(e.which) {
    case 37: app.flivkity.previous(); break;
    case 39: app.flivkity.next(); break;
    //case 38: dir('up'); break;
    //case 40: dir('down'); break;
  }
};

// Event listeners for audio buttons.
app.audio.onended = function() {
  this.classList.add('paused');
};
document.querySelector('.play-button').addEventListener('click', function () {
  this.classList.toggle('paused');
  app.toggleAudio();
});
