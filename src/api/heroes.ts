import { client } from '../utils/httpClient';
import { HeroResponse } from '../types/hero';

type GetPaginatedHeroes = (pageNum?: string) => Promise<HeroResponse>;

export const getPaginatedHeroes: GetPaginatedHeroes = async (pageNum) => {
  let link = '/people/';

  if (pageNum) {
    link += `?page=${pageNum}`;
  }

  const heroes = (await client.get<HeroResponse>(link)).data;

  return heroes;
};
