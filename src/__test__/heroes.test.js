// const mockAxios = require('jest-mock-axios').default;
// const { getPaginatedHeroes } = require('../api/heroes');
// const heroesData = require('./data/heroes.json'); // adjust the path as necessary

// afterEach(() => {
//   mockAxios.reset();
// });

// describe('getPaginatedHeroes', () => {
//   it('should fetch paginated heroes', async () => {
//     mockAxios.get.mockResolvedValue({ data: heroesData });

//     const pageNum = '1';
//     const result = await getPaginatedHeroes(pageNum);

//     expect(mockAxios.get).toHaveBeenCalledWith('/people/?page=1');
//     expect(result).toEqual(heroesData);
//   });
// });

// __test__/heroes.test.js
const axios = require('axios');
const { getPaginatedHeroes } = require('../api/heroes');
const heroesData = require('./data/heroes.json'); 

jest.mock('axios');

axios.get = jest.fn();

// afterEach(() => {
//   jest.resetAllMocks();
// });

describe('getPaginatedHeroes', () => {
  it('should fetch paginated heroes', async () => {
    axios.get.mockResolvedValue({ data: heroesData });

    const pageNum = '1';
    const result = await getPaginatedHeroes(pageNum);

    expect(axios.get).toHaveBeenCalledWith('https://sw-api.starnavi.io/people/?page=1');
    expect(result).toEqual(heroesData);
  });

  it('should fetch heroes without page number', async () => {
    axios.get.mockResolvedValue({ data: heroesData });

    const result = await getPaginatedHeroes();

    expect(axios.get).toHaveBeenCalledWith('https://sw-api.starnavi.io/people/');
    expect(result).toEqual(heroesData);
  });
});
