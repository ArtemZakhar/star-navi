import { NoData } from '@/components/ui/noData';
import { FC } from 'react';

type VerifyDataExistProps = {
  data: string;
};

// some data is missing. That's why this function is needed
export const VerifyDataExist: FC<VerifyDataExistProps> = ({ data }) => {
  if (data === 'unknown' || data === 'n/a') {
    return <NoData />;
  }

  return data;
};
