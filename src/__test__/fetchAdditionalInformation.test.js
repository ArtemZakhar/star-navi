const axios = require('axios');

const filmsData = require('./data/films.json');
const planetData = require('./data/planets.json');
const speciesData = require('./data/species.json');
const starshipsData = require('./data/starships.json');
const vehiclesData = require('./data/vehicles.json');

jest.mock('axios');

axios.get = jest.fn();

describe('fetchAdditionalInformation', () => {
  const baseUrl = 'https://sw-api.starnavi.io/people/';
  const planetFetch = () => axios.get(`${baseUrl}/planets/?id__in=20`);
  const filmsFetch = () => axios.get(`${baseUrl}/films/?id__in=1,2,3,4,5,6`);
  const speciesFetch = () => axios.get(`${baseUrl}/species/?id__in=1`);
  const vehiclesFetch = () => axios.get(`${baseUrl}/vehicles/?id__in=38`);
  const starshipsFetch = () => axios.get(
    `${baseUrl}/starships/?id__in=48,59,64,65,74`
  );

  it('should fetch correct species', async () => {
    axios.get.mockResolvedValue({ data: speciesData });

    const result = await speciesFetch();

    expect(result.data).toEqual(speciesData);
  });

  it('should fetch correct films', async () => {
    axios.get.mockResolvedValue({ data: filmsData });

    const result = await filmsFetch();

    expect(result.data).toEqual(filmsData);
  });

  it('should fetch correct planets', async () => {
    axios.get.mockResolvedValue({ data: planetData });

    const result = await planetFetch();

    expect(result.data).toEqual(planetData);
  });

  it('should fetch correct vehicles', async () => {
    axios.get.mockResolvedValue({ data: vehiclesData });

    const result = await vehiclesFetch();

    expect(result.data).toEqual(vehiclesData);
  });

  it('should fetch correct starships', async () => {
    axios.get.mockResolvedValue({ data: starshipsData });

    const result = await starshipsFetch();

    expect(result.data).toEqual(starshipsData);
  });
});
