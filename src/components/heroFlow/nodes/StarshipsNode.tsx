import { FC } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Starship } from '@/types/starship';
import { verifyDataExist } from '@/helpers/verifyDataExist';

type StarshipsNodeProps = {
  starships: Starship[];
};

export const StarshipsNode: FC<StarshipsNodeProps> = ({ starships }) => {
  return (
    <div className="text-updater-node ">
      <Handle
        type="target"
        id="vehicles"
        position={Position.Top}
        isConnectable
      />

      <div className="relative">
        <h2 className="text-2xl mb-4 text-primary">Starships</h2>
        {starships.map((starship) => (
          <table key={starship.id} className="mb-5">
            <tbody>
              <tr>
                <th className="bg-grey_100">Name</th>
                <td className="w-[300px] text-yellow">
                  {verifyDataExist(starship.name)}
                </td>
              </tr>

              <tr>
                <th className="bg-grey_100">Model</th>
                <td>{verifyDataExist(starship.model)}</td>
              </tr>

              <tr>
                <th className="bg-grey_100">Manufacturer</th>
                <td>{verifyDataExist(starship.manufacturer)}</td>
              </tr>

              <tr>
                <th className="bg-grey_100">Cost</th>
                <td>{verifyDataExist(starship.cost_in_credits)}</td>
              </tr>

              <tr>
                <th className="bg-grey_100">Starship Class</th>
                <td>{verifyDataExist(starship.starship_class)}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};
