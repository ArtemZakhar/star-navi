'use client';

import { Dispatch, FC, SetStateAction } from 'react';
import { PagesButtonList } from './PagesButtonList';

import { Hero, HeroResponse } from '@/types/hero';
import { VerifyDataExist } from '../ui/verifyDataExist';
import { Male } from './Male';
import { Female } from './Female';

type HeroListProps = {
  heroes: HeroResponse;
  onSelectedHero: Dispatch<SetStateAction<Hero | null>>;
  onPageChange: (pageNum: number) => void;
};

export const HeroList: FC<HeroListProps> = ({
  heroes,
  onSelectedHero,
  onPageChange,
}) => {
  const selectHero = (hero: Hero) => {
    onSelectedHero(hero);
  };

  return (
    <div className="flex flex-col gap-12">
      <table className="border-spacing-0 border-separate overflow-hidden rounded-[20px] shadow-xl">
        <thead className="bg-grey_100 ">
          <tr>
            <th className="w-[180px]">Name</th>
            <th className="w-[80px]">Gender</th>
            <th className="w-[150px] hidden lg:table-cell">Birth year</th>
            <th className="w-[150px] hidden lg:table-cell">Height</th>
            <th className="w-[150px] hidden lg:table-cell">Weight</th>
            <th className="w-[150px] hidden lg:table-cell">Eye color</th>
          </tr>
        </thead>

        <tbody className="bg-cyan-50">
          {heroes.results.map((hero) => (
            <tr
              className="cursor-pointer hover:bg-grey_700 text-left"
              key={hero.id}
              data-testid="heroLine"
              onClick={() => selectHero(hero)}
            >
              <td>{hero.name}</td>

              <td>
                <div className="relative block m-auto w-fit">
                  {hero.gender === 'male' ? <Male /> : <Female />}
                </div>
              </td>

              <td className="hidden lg:table-cell">
                <VerifyDataExist data={hero.birth_year} />
              </td>
              <td className="hidden lg:table-cell">
                <VerifyDataExist data={hero.height} />
              </td>
              <td className="hidden lg:table-cell">
                <VerifyDataExist data={hero.mass} />
              </td>
              <td className="hidden lg:table-cell">
                <VerifyDataExist data={hero.eye_color} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PagesButtonList
        count={heroes.count}
        prev={heroes.previous}
        next={heroes.next}
        onPageChange={onPageChange}
      />
    </div>
  );
};
