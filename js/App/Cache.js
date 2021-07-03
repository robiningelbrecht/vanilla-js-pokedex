import Pokemon from "./Pokemon.js";

export default class Cache {

  constructor() {
    this.CACHE_KEY = 'pokemons';
    this.localStorage = window.localStorage;
  }

  getPokemon(id) {
    let cache = this.__get();

    if (cache.hasOwnProperty(id)) {
      return Pokemon.createFromCache(cache[id]);
    }

    return null;
  }

  addPokemon(id, data) {
    let cache = this.__get();
    cache[id] = data;
    this.localStorage.setItem(this.CACHE_KEY, JSON.stringify(cache));
  }

  clear() {
    this.localStorage.clear();
  }

  __get() {
    return JSON.parse(window.localStorage.getItem(this.CACHE_KEY)) || {};
  }


}