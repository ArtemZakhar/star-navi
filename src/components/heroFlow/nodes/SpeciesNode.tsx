import { FC } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Species } from '@/types/species';
import { verifyDataExist } from '@/helpers/verifyDataExist';

type SpeciesNodeProps = {
  species: Species[];
};

export const SpeciesNode: FC<SpeciesNodeProps> = ({ species }) => {
  return (
    <div className="text-updater-node ">
      <Handle
        type="target"
        id="species"
        position={Position.Bottom}
        isConnectable
      />

      <div className="relative">
        <h2 className="text-2xl mb-4 text-primary">Species</h2>
        {species.map((specie) => (
          <table key={specie.id} className="mb-5">
            <tbody>
              <tr>
                <th className="bg-grey_100">Name</th>
                <td className="w-[300px] text-yellow">
                  {verifyDataExist(specie.name)}
                </td>
              </tr>

              <tr>
                <th className="bg-grey_100">Classification</th>
                <td>{verifyDataExist(specie.classification)}</td>
              </tr>

              <tr>
                <th className="bg-grey_100">Average lifespan</th>
                <td>{verifyDataExist(specie.average_lifespan)}</td>
              </tr>

              <tr>
                <th className="bg-grey_100">Language</th>
                <td>{verifyDataExist(specie.language)}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};
