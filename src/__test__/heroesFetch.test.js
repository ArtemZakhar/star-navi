const heroes = require('../__test__/data/heroes.json');
const { getPaginatedHeroes } = require('../api/heroes');

jest.mock('../api/heroes.ts');

describe('getPaginatedHeroes function', () => {
  it('should fetch heroes without a page number', async () => {
    getPaginatedHeroes.mockResolvedValue(heroes);

    const result = await getPaginatedHeroes('/people/');

    expect(result).toEqual(heroes);
    expect(result.previous).toBeNull();
    expect(result.results.length).toBe(10);
    expect(result.results[0].name).toBe('Obi-Wan Kenobi');
  });
});
