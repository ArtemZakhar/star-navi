import { FC } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Film } from '@/types/film';
import { VerifyDataExist } from '@/components/ui/verifyDataExist';

type FilmsNodeProps = {
  film: Film;
  id: number;
};

export const FilmNode: FC<FilmsNodeProps> = ({ film, id }) => {
  return (
    <div className="text-updater-node" data-testid="filmNode">
      <Handle
        type="source"
        id={`films-${id}`}
        position={Position.Right}
        style={{ top: '50%' }}
        isConnectable
      />

      <div className="relative">
        <h2 className="text-2xl mb-4 text-primary">{`${film.title} Film`}</h2>
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
              <td>
                <VerifyDataExist data={film.director} />
              </td>
            </tr>

            <tr>
              <th className="bg-grey_100">Producer</th>
              <td>
                <VerifyDataExist data={film.producer} />
              </td>
            </tr>

            <tr>
              <th className="bg-grey_100">Release Date</th>
              <td>
                <VerifyDataExist data={film.release_date} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
