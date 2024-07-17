import { FC } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Vehicle } from '@/types/vehicle';
import { verifyDataExist } from '@/helpers/verifyDataExist';

type VehiclesNodeProps = {
  vehicles: Vehicle[];
};

export const VehiclesNode: FC<VehiclesNodeProps> = ({ vehicles }) => {
  return (
    <div className="text-updater-node" data-testid='vehicleNode'>
      <Handle
        type="source"
        id="vehicles"
        position={Position.Bottom}
        isConnectable
      />

      <div className="relative">
        <h2 className="text-2xl mb-4 text-primary">Vehicles</h2>
        {vehicles.map((vehicle) => (
          <table key={vehicle.id} className="mb-5">
            <tbody>
              <tr>
                <th className="bg-grey_100">Name</th>
                <td className="w-[300px] text-yellow">
                  {verifyDataExist(vehicle.name)}
                </td>
              </tr>

              <tr>
                <th className="bg-grey_100">Model</th>
                <td>{verifyDataExist(vehicle.model)}</td>
              </tr>

              <tr>
                <th className="bg-grey_100">Manufacturer</th>
                <td>{verifyDataExist(vehicle.manufacturer)}</td>
              </tr>

              <tr>
                <th className="bg-grey_100">Cost</th>
                <td>{verifyDataExist(vehicle.cost_in_credits)}</td>
              </tr>

              <tr>
                <th className="bg-grey_100">Vehicle Class</th>
                <td>{verifyDataExist(vehicle.vehicle_class)}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};
