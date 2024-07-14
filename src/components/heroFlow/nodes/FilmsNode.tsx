import { FC } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Film } from '@/types/film';
import { verifyDataExist } from '@/helpers/verifyDataExist';

type FilmsNodeProps = {
  films: Film[];
};

export const FilmsNode: FC<FilmsNodeProps> = ({ films }) => {
  return (
    <div className="text-updater-node ">
      <Handle
        type="target"
        id="films"
        position={Position.Left}
        style={{ top: '50%' }}
        isConnectable
      />

      <div className="relative">
        <h2 className="text-2xl mb-4 text-primary">Films</h2>
        {films.map((film) => (
          <table key={film.id} className="mb-5">
            <tbody>
              <tr>
                <th className="bg-grey_100">Name</th>
                <td className="w-[300px] text-yellow">{film.title}</td>
              </tr>

              <tr>
                <th className="bg-grey_100">Episode</th>
                <td>{film.episode_id}</td>
              </tr>

              <tr>
                <th className="bg-grey_100">Director</th>
                <td>{verifyDataExist(film.director)}</td>
              </tr>

              <tr>
                <th className="bg-grey_100">Producer</th>
                <td>{verifyDataExist(film.producer)}</td>
              </tr>

              <tr>
                <th className="bg-grey_100">Release Date</th>
                <td>{verifyDataExist(film.release_date)}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};
