import PokeApi from "./PokeApi.js";

export default class App {
  constructor() {
    this.body = document.querySelector('body');
    this.flickity_el = document.querySelector('div.js-flickity');
    this.pokeApi = new PokeApi();
  }

  init() {
    for (let i = 1; i <= 151; i++) {
      let slide = document.createElement('div');
      slide.classList.add(...['slide']);
      this.flickity_el.appendChild(slide);
    }

    this.flivkity = new Flickity(this.flickity_el, {
      pageDots: false,
      prevNextButtons: true,
      percentPosition: false,
      draggable: true,
      cellAlign: 'left',
      contain: true
    });
  }

  lazyLoadBackground() {
    let thisBody = this.body;
    // Lazy load high def version of background.
    window.onload = function loadStuff() {
      let img = new Image();

      // Assign an onLoad handler to the dummy image *before* assigning the src
      img.onload = function () {
        thisBody.style.backgroundImage = 'url(' + thisBody.dataset.background + ')';
      };
      // Finally, trigger the whole preloading chain by giving the dummy
      // image its source.
      img.src = thisBody.dataset.background;
    };
  }

  async updatePokeInfo(id) {
    let index = id - 1;

    let species = await this.pokeApi.getSpecies(id);
    let pokemon = await this.pokeApi.getPokemon(id);

    //@TODO: add cache.

    this.flivkity.cells[index].element.style.backgroundImage = 'url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' + id + '.svg)';
    this.flivkity.cells[index].element.classList.add('cached');
    this.flivkity.cells[index].element.style.backgroundColor = this.getPokedexHexColor(species.color.name);
  }

  getPokedexHexColor(color) {
    let colors = new Map([
      ['black', '#111111'],
      ['blue', '#2196F3'],
      ['brown', '#A1887F'],
      ['gray', '#BBBBBB'],
      ['green', '#4CAF50'],
      ['pink', '#E91E63'],
      ['purple', '#9C27B0'],
      ['red', '#F44336'],
      ['white', '#FFFFFF'],
      ['yellow', '#FFC107'],
    ]);

    return colors.get(color);
  }
}