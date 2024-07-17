const { renderHook, act } = require('@testing-library/react');
const { useFillHero } = require('../hooks/useFillHero');
const { client } = require('../utils/httpClient');
const heroData = require('./data/heroes.json').results[0];
const heroFilms = require('./data/films.json').results;
const heroPlanet = require('./data/planets.json').results[0].name;
const heroSpecies = require('./data/species.json').results;
const heroVehicles = require('./data/vehicles.json').results;
const heroStarships = require('./data/starships.json').results;

jest.mock('../utils/httpClient');

const mockClientGet = client.get;

describe('useFillHero hook testing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should filled hero correctly', () => {
    mockClientGet.mockResolvedValueOnce({ heroFilms });
    mockClientGet.mockResolvedValueOnce({ heroPlanet });
    mockClientGet.mockResolvedValueOnce({ heroSpecies });
    mockClientGet.mockResolvedValueOnce({ heroStarships });
    mockClientGet.mockResolvedValueOnce({ heroVehicles });

    const { result, rerender } = renderHook(() =>
      useFillHero(heroData)
    );

    // rerender();

    expect(result.current.hero.name).toBe('Obi-Wan Kenobi')
  });
});
