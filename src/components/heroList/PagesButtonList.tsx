import { qtyHeroesOnPage } from '@/constants/qtyHeroesOnPage';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

type PagesButtonListProps = {
  count: number;
  prev: string | null;
  next: string | null;
  onPageChange: (pageNum: number) => void;
};

export const PagesButtonList: FC<PagesButtonListProps> = ({
  count,
  prev,
  next,
  onPageChange,
}) => {
  const params = useSearchParams();
  const currentPage = Number(params.get('page') || 0);

  const qtyPages = Math.ceil(count / qtyHeroesOnPage);

  // filled array with numbers according to outer information
  // count = 83, qtyHeroesOnPage = 10
  const arrOfPageNumbers = new Array(qtyPages)
    .fill(null)
    .map((page, index) => index + 1);

  return (
    <div className="flex justify-center items-center gap-[20px]">
      <button
        className={`text-black rounded-md bg-yellow  px-2.5 py-[5px] ${prev === null && 'cursor-not-allowed'} hover:bg-yellow_hover disabled:bg-yellow_hover`}
        disabled={prev === null}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      <div>
        <ul className=" flex justify-center items-center gap-[20px]">
          {arrOfPageNumbers.map((number) => (
            <li
              key={number}
              className={`border border-yellow rounded-md bg-transparent hover:bg-grey_700 ${(currentPage === number || !currentPage && number === 1) && 'bg-yellow_active'}`}
            >
              <button
                className={`text-yellow w-8 h-9 px-2.5 py-[5px] ${(currentPage === number || !currentPage && number === 1) && 'text-primary font-bold'}`}
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        className={`text-black rounded-[5px] bg-yellow px-2.5 py-[5px] ${next === null && 'cursor-not-allowed'} hover:bg-yellow_hover disabled:bg-yellow_hover`}
        disabled={next === null}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};
