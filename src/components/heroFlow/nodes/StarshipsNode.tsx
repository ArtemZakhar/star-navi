import { FC } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Starship } from '@/types/starship';
import { nodeData } from '@/constants/nodeData';
import { VerifyDataExist } from '@/components/ui/verifyDataExist';

type StarshipsNodeProps = {
  starships: Starship[];
};

export const StarshipsNode: FC<StarshipsNodeProps> = ({ starships }) => {
  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        id={`${nodeData.starships.id}`}
        position={Position.Top}
        isConnectable
      />

      <div className="relative">
        <h2 className="text-2xl mb-4 text-primary">Starships</h2>
        {starships.map((starship) => (
          <table key={starship.id} className="mb-5" data-testid="starshipNode">
            <tbody>
              <tr>
                <th className="bg-grey_100">Name</th>
                <td className="w-[300px] text-yellow">
                  <VerifyDataExist data={starship.name} />
                </td>
              </tr>

              <tr>
                <th className="bg-grey_100">Model</th>
                <td>
                  <VerifyDataExist data={starship.model} />
                </td>
              </tr>

              <tr>
                <th className="bg-grey_100">Manufacturer</th>
                <td>
                  <VerifyDataExist data={starship.manufacturer} />
                </td>
              </tr>

              <tr>
                <th className="bg-grey_100">Cost</th>
                <td>
                  <VerifyDataExist data={starship.cost_in_credits} />
                </td>
              </tr>

              <tr>
                <th className="bg-grey_100">Starship Class</th>
                <td>
                  <VerifyDataExist data={starship.starship_class} />
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};
