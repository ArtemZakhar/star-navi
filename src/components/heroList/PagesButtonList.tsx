import { quantityHeroesOnPage } from '@/constants/quantityHeroesOnPage';
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

  const qtyPages = Math.ceil(count / quantityHeroesOnPage);

  // filled array with numbers according to outer information
  // count = 83, qtyHeroesOnPage = 10
  const arrOfPageNumbers = new Array(qtyPages)
    .fill(null)
    .map((page, index) => index + 1);

  const activePageWrapperClass = (page: number) => {
    return (
      (currentPage === page || (!currentPage && page === 1)) &&
      'bg-yellow_active'
    );
  };

  const activePageTextClass = (page: number) => {
    return (
      (currentPage === page || (!currentPage && page === 1)) &&
      'font-bold !text-primary'
    );
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-2.5  md:gap-5">
      <button
        className={`text-black rounded-md bg-yellow px-2 py-1 md:px-2.5 md:py-[5px] ${prev === null && 'cursor-not-allowed'} hover:bg-yellow_hover disabled:bg-yellow_hover`}
        disabled={prev === null}
        onClick={() => onPageChange(currentPage - 1)}
        data-testid="prevButton"
      >
        Previous
      </button>

      <div>
        <ul
          className=" flex justify-center items-center gap-[5px] sm:gap-[10px]  md:gap-[20px]"
          data-testid="buttonList"
        >
          {arrOfPageNumbers.map((number) => (
            <li
              key={number}
              className={`border border-yellow rounded-md bg-transparent hover:bg-grey_700 ${activePageWrapperClass(number)}`}
            >
              <button
                className={`text-yellow w-6 h-7 md:w-8 md:h-9 ${activePageTextClass(number)}`}
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <button
        className={`text-black rounded-[5px] bg-yellow px-2 py-1 md:px-2.5 md:py-[5px] ${next === null && 'cursor-not-allowed'} hover:bg-yellow_hover disabled:bg-yellow_hover`}
        disabled={next === null}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};
