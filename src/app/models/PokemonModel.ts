export interface Pokemon {
  id: number;
  name: string;
  height: number;
  types: PokemonType[];
  weight: number;
  sprites: Sprites;
  base_experience: number;
}

export interface Form {
  name: string;
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface Sprites {
  other: {
    home: {
      front_default: string;
    }
  }
}
