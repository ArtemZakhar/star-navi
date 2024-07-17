require('@testing-library/jest-dom');
const { render, screen } = require('@testing-library/react');
const { mockReactFlow } = require('./ResizeObserver.ts');
const { HeroFlow } = require('../components/heroFlow/HeroFlow.tsx');
const hero = require('./data/heroes.json').results[0];
const heroFilms = require('./data/films.json').results;
const heroPlanet = require('./data/planets.json').results[0].name;
const heroSpecies = require('./data/species.json').results;
const heroVehicles = require('./data/vehicles.json').results;
const heroStarships = require('./data/starships.json').results;

describe('Hero Flow testing', () => {
  const selectedHero = {
    ...hero,
    films: heroFilms,
    species: heroSpecies,
    starships: heroStarships,
    vehicles: heroVehicles,
    homeworld: heroPlanet,
  };

  beforeEach(() => {
    mockReactFlow();
  });

  it('Obi-Wan with all additional information has to be rendered', () => {
    removeSelectedHero = jest.fn();

    render(
      <HeroFlow hero={selectedHero} removeSelectedHero={removeSelectedHero} />
    );

    expect(screen.getByText('Obi-Wan Kenobi')).toBeInTheDocument();
    expect(screen.getByText('The Empire Strikes Back Film')).toBeInTheDocument();
    expect(screen.getByText('Specie')).toBeInTheDocument();
    expect(screen.getByText('Hero Home World')).toBeInTheDocument();
    expect(screen.getAllByTestId('filmNode').length).toBe(6);
    expect(screen.getAllByTestId('starshipNode').length).toBe(5);
    expect(screen.getAllByTestId('vehicleNode').length).toBe(1);
    expect(screen.getByText('Vehicles')).toBeInTheDocument();
  });
});
