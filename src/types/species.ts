export type Species = {
  id: number;
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: number;
  language: string;
  people: number[];
  films: number[];
  created: string;
  edited: string;
  url: string;
};

export type SpeciesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Species[];
};
