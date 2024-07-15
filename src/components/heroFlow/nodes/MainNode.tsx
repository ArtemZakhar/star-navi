import { FC, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import { FilledHero } from '@/types/hero';
import { Species } from '@/types/species';
import { Vehicle } from '@/types/vehicle';
import { Starship } from '@/types/starship';
import { nodeData } from '@/constants/nodeData';
import { NoData } from '@/components/noData';

type MainNodeProps = {
  hero: FilledHero;
  onSelectedHero: () => void;
};

type TableData = Species[] | Vehicle[] | Starship[];

export const MainNode: FC<MainNodeProps> = ({ hero, onSelectedHero }) => {
  // data verification function
  const tableData = (arr: TableData) => {
    if (!arr.length) {
      return <NoData />;
    }

    return arr.map((item) => {
      return (
        <dl key={item.id}>
          <dt>{item.name}</dt>
        </dl>
      );
    });
  };

  // adding possibility to close the window on Escape
  const removeSelectedHero = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onSelectedHero();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', removeSelectedHero);

    () => removeEventListener('keydown', removeSelectedHero);
  }, []);

  return (
    <div>
      <Handle type="target" position={Position.Top} isConnectable />

      <Handle
        type="source"
        id={nodeData.mainNode.sources.homeWorld}
        position={Position.Top}
        isConnectable
      />

      <div className="relative">
        <h2 className="text-3xl mb-4 text-yellow">{hero.name}</h2>
        <button
          onClick={() => onSelectedHero()}
          className="absolute top-[-7px] right-0 text-4xl text-primary"
        >
          &times;
        </button>
        <table>
          <tbody>
            <tr>
              <th className="bg-grey_100">Planet</th>
              <td className="w-[300px]">{hero.homeworld}</td>
            </tr>

            <tr>
              <th className="bg-grey_100">Films</th>
              <td>
                {hero.films.map((film) => {
                  if (typeof film === 'string') {
                    return film;
                  }

                  return (
                    <dl key={film.id}>
                      <dt>{film.title}</dt>
                    </dl>
                  );
                })}
              </td>
            </tr>

            <tr>
              <th className="bg-grey_100">Species</th>
              <td>{tableData(hero.species)}</td>
            </tr>

            <tr>
              <th className="bg-grey_100">Vehicle</th>
              <td>{tableData(hero.vehicles)}</td>
            </tr>

            <tr>
              <th className="bg-grey_100">Starships</th>
              <td>{tableData(hero.starships)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {!!hero.starships.length && (
        <Handle
          type="source"
          position={Position.Left}
          id={nodeData.mainNode.sources.starships}
          isConnectable
        />
      )}

      {!!hero.films.length && (
        <Handle
          type="source"
          position={Position.Right}
          id={nodeData.mainNode.sources.films}
          style={{ top: '50%' }}
          isConnectable
        />
      )}

      {!!hero.species.length && (
        <Handle
          type="source"
          position={Position.Bottom}
          id={nodeData.mainNode.sources.species}
          isConnectable
        />
      )}
    </div>
  );
};
