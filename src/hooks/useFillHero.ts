import { useEffect, useState } from 'react';
import { client } from '@/utils/httpClient';
import { PlanetResponse } from '@/types/planet';
import { FilmResponse } from '@/types/film';
import { SpeciesResponse } from '@/types/species';
import { VehicleResponse } from '@/types/vehicle';
import { StarshipResponse } from '@/types/starship';
import { FilledHero, Hero, HeroResponse } from '@/types/hero';

export const useFillHero = (selectedHero: Hero | null) => {
  const [hero, setHero] = useState<FilledHero | null>(null);
  const [error, setError] = useState('');


  // using useEffect to delete error message after the defined time
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (error.length) {
      timer = setTimeout(() => {
        setError('');
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    if (selectedHero) {
      const getAdditionalData = async () => {
        // gather all IDs from all necessary information for request preparation
        const planetID = selectedHero.homeworld;
        const filmsIDs = selectedHero.films.join(',');
        const speciesIDs = selectedHero.species.join(',');
        const vehiclesIDs = selectedHero.vehicles.join(',');
        const starshipsIDs = selectedHero.starships.join(',');

        // preparation request for Promise.all
        const planetFetch = client.get<PlanetResponse>(
          `/planets/?id__in=${planetID}`
        );
        const filmsFetch = client.get<FilmResponse>(
          `/films/?id__in=${filmsIDs}`
        );
        const speciesFetch = client.get<SpeciesResponse>(
          `/species/?id__in=${speciesIDs}`
        );
        const vehiclesFetch = client.get<VehicleResponse>(
          `/vehicles/?id__in=${vehiclesIDs}`
        );
        const starshipsFetch = client.get<StarshipResponse>(
          `/starships/?id__in=${starshipsIDs}`
        );

        return await Promise.all([
          planetFetch,
          filmsFetch,
          speciesFetch,
          vehiclesFetch,
          starshipsFetch,
        ])
          .then(
            ([planetRes, filmsRes, speciesRes, vehiclesRes, starshipsRes]) => {
              // write all missed data
              setHero({
                ...selectedHero,
                species: speciesRes.data.results,
                starships: starshipsRes.data.results,
                homeworld: planetRes.data.results[0].name,
                films: filmsRes.data.results,
                vehicles: vehiclesRes.data.results,
              });
            }
          )
          .catch(() => setError('Failed to fetch data from server.'));
      };
      getAdditionalData();
    }
  }, [selectedHero]);

  return { hero, setHero, error };
};
