// import { client } from '@/utils/httpClient';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PlanetResponse } from '../types/planet';
import { FilmResponse } from '../types/film';
import { SpeciesResponse } from '../types/species';
import { VehicleResponse } from '../types/vehicle';
import { StarshipResponse } from '../types/starship';
import { FilledHero, Hero} from '../types/hero';

// export const useFillHero = (selectedHero: Hero | null) => {
//   const [hero, setHero] = useState<FilledHero | null>(null);
//   const [error, setError] = useState('');


//   // using useEffect to delete error message after the defined time
//   useEffect(() => {
//     let timer: ReturnType<typeof setTimeout>;

//     if (error.length) {
//       timer = setTimeout(() => {
//         setError('');
//       }, 3000);
//     }

//     return () => clearTimeout(timer);
//   }, [error]);

//   useEffect(() => {
//     if (selectedHero) {
//       const getAdditionalData = async () => {
//         // gather all IDs from all necessary information for request preparation
//         const planetID = selectedHero.homeworld;
//         const filmsIDs = selectedHero.films.join(',');
//         const speciesIDs = selectedHero.species.join(',');
//         const vehiclesIDs = selectedHero.vehicles.join(',');
//         const starshipsIDs = selectedHero.starships.join(',');

//         // preparation request for Promise.all
//         const planetFetch = client.get<PlanetResponse>(
//           `/planets/?id__in=${planetID}`
//         );
//         const filmsFetch = client.get<FilmResponse>(
//           `/films/?id__in=${filmsIDs}`
//         );
//         const speciesFetch = client.get<SpeciesResponse>(
//           `/species/?id__in=${speciesIDs}`
//         );
//         const vehiclesFetch = client.get<VehicleResponse>(
//           `/vehicles/?id__in=${vehiclesIDs}`
//         );
//         const starshipsFetch = client.get<StarshipResponse>(
//           `/starships/?id__in=${starshipsIDs}`
//         );

//         return await Promise.all([
//           planetFetch,
//           filmsFetch,
//           speciesFetch,
//           vehiclesFetch,
//           starshipsFetch,
//         ])
//           .then(
//             ([planetRes, filmsRes, speciesRes, vehiclesRes, starshipsRes]) => {
//               // write all missed data
//               setHero({
//                 ...selectedHero,
//                 species: speciesRes.data.results,
//                 starships: starshipsRes.data.results,
//                 homeworld: planetRes.data.results[0].name,
//                 films: filmsRes.data.results,
//                 vehicles: vehiclesRes.data.results,
//               });
//             }
//           )
//           .catch(() => setError('Failed to fetch data from server.'));
//       };
//       getAdditionalData();
//     }
//   }, [selectedHero]);

//   return { hero, setHero, error };
// };

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
        const baseUrl = 'https://sw-api.starnavi.io/people/';
        const planetFetch = axios.get<PlanetResponse>(
          `${baseUrl}/planets/?id__in=${planetID}`
        );
        const filmsFetch = axios.get<FilmResponse>(
          `${baseUrl}/films/?id__in=${filmsIDs}`
        );
        const speciesFetch = axios.get<SpeciesResponse>(
          `${baseUrl}/species/?id__in=${speciesIDs}`
        );
        const vehiclesFetch = axios.get<VehicleResponse>(
          `${baseUrl}/vehicles/?id__in=${vehiclesIDs}`
        );
        const starshipsFetch = axios.get<StarshipResponse>(
          `${baseUrl}/starships/?id__in=${starshipsIDs}`
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
