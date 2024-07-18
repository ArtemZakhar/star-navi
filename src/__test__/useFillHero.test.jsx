const { renderHook, waitFor } = require('@testing-library/react');
const { useFillHero } = require('../hooks/useFillHero');
const heroData = require('./data/heroes.json').results[0];
const heroFilms = require('./data/films.json').results[0].name;
const heroPlanet = require('./data/planets.json').results;
const heroSpecies = require('./data/species.json').results;
const heroVehicles = require('./data/vehicles.json').results;
const heroStarships = require('./data/starships.json').results;

describe('useFillHero hook testing', () => {
  const selectedHero = {
    ...heroData,
    films: heroFilms,
    species: heroSpecies,
    starships: heroStarships,
    vehicles: heroVehicles,
    homeworld: heroPlanet,
  };

  it('should filled hero correctly', async () => {
    setHero = jest.fn(() => selectedHero);

    const result = renderHook(() => useFillHero(heroData)).result;

    await waitFor(() => {
      expect(result.current.hero.name).toBe('Obi-Wan Kenobi');
      expect(result.current.error).toBe('');
    });
  });
});
