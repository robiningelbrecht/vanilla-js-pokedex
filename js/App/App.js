import Pokemon from "./Pokemon.js";

export default class App {
  constructor(max_pokemons, poke_api, cache, audio, flickity_el) {
    this.maxPokemons = max_pokemons;
    this.body = document.querySelector('body');
    this.flickityEl = flickity_el;
    this.pokeApi = poke_api;
    this.cache = cache;
    this.audio = audio;
  }

  init() {
    // Add slides.
    for (let i = 1; i <= this.maxPokemons; i++) {
      let slide = document.createElement('div');
      slide.classList.add(...['slide']);
      this.flickityEl.appendChild(slide);
    }

    // Init flickity.
    this.flickity = new Flickity(this.flickityEl, {
      cellSelector: '.slide',
      pageDots: false,
      prevNextButtons: false,
      percentPosition: false,
      draggable: true,
      accessibility: false,
      cellAlign: 'left',
      contain: true
    });
  }

  toggleAudio() {
    this.audio.paused ? this.audio.play() : this.audio.pause();
  }

  lazyLoadBackground() {
    let thisBody = this.body;
    // Lazy load high def version of background.
    window.onload = () => {
      let img = new Image();

      // Assign an onLoad handler to the dummy image *before* assigning the src
      img.onload = () => {
        thisBody.style.backgroundImage = 'url(' + thisBody.dataset.background + ')';
      };
      // Finally, trigger the whole preloading chain by giving the dummy
      // image its source.
      img.src = thisBody.dataset.background;
    };
  }

  async updatePokeInfo(id) {
    // Fetch pokemon from cache.
    let pokemon = this.cache.getPokemon(id);

    if (!pokemon) {
      // Not cached yet, fetch from API.
      let api_pokemon = await this.pokeApi.getPokemon(id);
      let api_species = await this.pokeApi.getSpecies(id);

      pokemon = Pokemon.createFromApi(api_pokemon, api_species);
      this.cache.addPokemon(id, pokemon);
    }

    this.body.dispatchEvent(new CustomEvent('PokemonUpdated', {
      detail: {
        pokemon
      }
    }));
  }

  async populatePokeList(el) {
    let list = await this.pokeApi.getList(this.maxPokemons);
    list.results.forEach((item, index) => {
      let c = document.createElement('div');
      c.dataset.pokeIndex = (index + 1);
      c.classList.add(...['cursor-pointer']);
      c.innerHTML = '#' + (index + 1) + ' ' + item.name;
      el.appendChild(c);
    });
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