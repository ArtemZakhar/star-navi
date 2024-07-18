import { FC } from 'react';
import { Handle, Position } from '@xyflow/react';
import { nodeData } from '@/constants/nodeData';
import { VerifyDataExist } from '@/components/ui/verifyDataExist';

type HomeWorldNodeProps = {
  homeWorld: string;
};

export const HomeWorldNode: FC<HomeWorldNodeProps> = ({ homeWorld }) => {
  return (
    <div className="text-updater-node ">
      <Handle
        type="source"
        id={`${nodeData.homeWorld.id}`}
        position={Position.Bottom}
        isConnectable
      />

      <div className="relative">
        <h2 className="text-2xl mb-4 text-primary">Hero Home World</h2>

        <h3 className="text-xl underline text-yellow">
          <VerifyDataExist data={homeWorld} />
        </h3>
      </div>
    </div>
  );
};
