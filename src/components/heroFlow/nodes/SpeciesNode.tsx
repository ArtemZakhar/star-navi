import { FC } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Species } from '@/types/species';
import { nodeData } from '@/constants/nodeData';
import { VerifyDataExist } from '@/components/ui/verifyDataExist';

type SpeciesNodeProps = {
  species: Species[];
};

export const SpeciesNode: FC<SpeciesNodeProps> = ({ species }) => {
  return (
    <div className="text-updater-node ">
      <Handle type="target" position={Position.Bottom} />

      <Handle
        type="source"
        id={`${nodeData.species.id}`}
        position={Position.Bottom}
        isConnectable
      />

      <div className="relative">
        <h2 className="text-2xl mb-4 text-primary">Specie</h2>
        {species.map((specie) => (
          <table key={specie.id} className="mb-5">
            <tbody>
              <tr>
                <th className="bg-grey_100">Name</th>
                <td className="w-[300px] text-yellow">
                  <VerifyDataExist data={specie.name} />
                </td>
              </tr>

              <tr>
                <th className="bg-grey_100">Classification</th>
                <td>
                  <VerifyDataExist data={specie.classification} />
                </td>
              </tr>

              <tr>
                <th className="bg-grey_100">Average lifespan</th>
                <td>
                  <VerifyDataExist data={specie.average_lifespan} />
                </td>
              </tr>

              <tr>
                <th className="bg-grey_100">Language</th>
                <td>
                  <VerifyDataExist data={specie.average_lifespan} />
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};
