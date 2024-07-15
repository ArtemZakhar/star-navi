const { client } = require('../../utils/httpClient');
const heroes = require('../../__test__/data/heroes.json');
const { getPaginatedHeroes } = require('../../api/heroes');

jest.mock('../../utils/httpClient', () => ({
  client: {
    get: jest.fn(), 
  },
}));

describe('getPaginatedHeroes', () => {
  it('should fetch heroes without a page number', async () => {
    client.get.mockResolvedValue(heroes);

    const result = await getPaginatedHeroes('/people/');
    expect(result).toEqual(heroes);
  });
});
