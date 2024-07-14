import { Film } from './film';
import { Species } from './species';
import { Starship } from './starship';
import { Vehicle } from './vehicle';

export type Hero = {
  id: number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: number;
  films: number[];
  species: number[];
  vehicles: number[];
  starships: number[];
  created: string;
  edited: string;
  url: string;
};

export type HeroResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Hero[];
};

export type FilledHero = {
  id: number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: Film[];
  species: Species[];
  vehicles: Vehicle[];
  starships: Starship[];
  created: string;
  edited: string;
  url: string;
};
