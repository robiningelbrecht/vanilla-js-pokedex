export default class PokeApi {
  constructor() {
    this.base = 'https://pokeapi.co/api/v2';
  }

  async request(path) {
    let response = await fetch(this.base + path);
    return await response.json();
  }

  async getPokemon(identifier) {
    return await this.request('/pokemon/' + identifier);
  }

  async getList(limit) {
    return await this.request('/pokemon?limit=' + limit);
  }

  async getSpecies(identifier) {
    return await this.request('/pokemon-species/' + identifier);
  }

}