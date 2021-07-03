export default class Pokemon {

  constructor(id, name, color, base_experience, height, weight, abilities, moves, types, stats, sprite) {
    this._id = id;
    this._name = name;
    this._color = color;
    this._baseExperience = base_experience;
    this._height = height;
    this._weight = weight;
    this._abilities = abilities;
    this._moves = moves;
    this._types = types;
    this._stats = stats;
    this._sprite = sprite;
  }

  getId() {
    return this._id;
  }

  getName() {
    return this._name;
  }

  getColor() {
    return this._color;
  }

  getBaseExperience() {
    return this._baseExperience;
  }

  getHeight() {
    return this._height;
  }

  getWeight() {
    return this._weight;
  }

  getAbilities() {
    return this._abilities;
  }

  getMoves() {
    return this._moves;
  }

  getTypes() {
    return this._types;
  }

  getStats() {
    return this._stats;
  }

  getSprite() {
    return this._sprite;
  }

  static createFromApi(api_pokemon, api_species) {
    return new Pokemon(
      api_pokemon.id,
      api_pokemon.name,
      api_species.color.name,
      api_pokemon.base_experience,
      api_pokemon.height,
      api_pokemon.weight,
      api_pokemon.abilities.map((ability) => {
        return ability.ability.name;
      }),
      api_pokemon.moves.map((move) => {
        return move.move.name;
      }),
      api_pokemon.types.map((type) => {
        return type.type.name;
      }),
      api_pokemon.stats.map((stat) => {
        return {
          'name': stat.stat.name,
          'base_stat': stat.base_stat
        };
      }),
      api_pokemon.sprites.other.dream_world.front_default || api_pokemon.sprites.other["official-artwork"].front_default
    );
  }

  static createFromCache(data) {
    return new Pokemon(
      data._id,
      data._name,
      data._color,
      data._baseExperience,
      data._height,
      data._weight,
      data._abilities,
      data._moves,
      data._types,
      data._stats,
      data._sprite
    );
  }

}