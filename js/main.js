import App from "./App/App.js";

let app = new App();
app.init();
app.lazyLoadBackground();

await app.updatePokeInfo(1);

app.flivkity.on('change', async function (index) {
  await app.updatePokeInfo(index + 1);
});

document.querySelector('.d-pad a.right').addEventListener('click', function () {
  app.flivkity.next();
})
document.querySelector('.d-pad a.left').addEventListener('click', function () {
  app.flivkity.previous();
})
