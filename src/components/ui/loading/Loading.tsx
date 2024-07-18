import { Spinner } from './Spinner';

export const Loading = () => {
  return (
    <div className="flex justify-center items-center fixed  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <Spinner width="100" height="100" />
    </div>
  );
};
