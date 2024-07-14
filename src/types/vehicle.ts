export type Vehicle = {
  id: number;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: number[];
  films: number[];
  created: string;
  edited: string;
  url: string;
};

export type VehicleResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Vehicle[];
};
