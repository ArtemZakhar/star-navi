import { NoData } from '@/components/noData';
// import { messages } from '@/constants/messages';

// some data is missing. That's why this function is needed
export const verifyDataExist = (data: string) => {
  if (data === 'unknown' || data === 'n/a') {
    return <NoData />;
  }

  return data;
};