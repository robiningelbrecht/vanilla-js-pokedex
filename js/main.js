import App from "./App/App.js";

let app = new App();
app.init();
app.lazyLoadBackground();

await app.updatePokeInfo(1);

app.flivkity.on('change', async function (index) {
  await app.updatePokeInfo(index + 1);
});