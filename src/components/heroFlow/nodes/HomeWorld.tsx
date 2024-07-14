import { FC } from 'react';
import { Handle, Position } from '@xyflow/react';
import { verifyDataExist } from '@/helpers/verifyDataExist';

type HomeWorldNodeProps = {
  homeWorld: string;
};

export const HomeWorldNode: FC<HomeWorldNodeProps> = ({ homeWorld }) => {
  return (
    <div className="text-updater-node ">
      <Handle
        type="target"
        id="home-world"
        position={Position.Bottom}
        isConnectable
      />

      <div className="relative">
        <h2 className="text-2xl mb-4 text-primary">Hero Home World</h2>

        <h3 className="text-xl underline text-yellow">
          {verifyDataExist(homeWorld)}
        </h3>
      </div>
    </div>
  );
};
