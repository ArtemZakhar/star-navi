import { client } from '../utils/httpClient';
import { HeroResponse } from '../types/hero';

type GetPaginatedHeroes = (pageNum?: string) => Promise<HeroResponse>;

export const getPaginatedHeroes: GetPaginatedHeroes = async (pageNum) => {
  const link = '/people/';

  const heroes = (
    await client.get<HeroResponse>(link, {
      params: { page: pageNum || undefined },
    })
  ).data;

  return heroes;
};
