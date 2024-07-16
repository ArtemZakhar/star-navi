'use client';

import { useEffect, useState } from 'react';
import { getPaginatedHeroes } from '@/api/heroes';
import { HeroList } from '@/components/heroList';
import { Hero, HeroResponse } from '@/types/hero';
import { useFillHero } from '@/hooks/useFillHero';
import { HeroFlow } from '@/components/heroFlow';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Home() {
  // get information about the page number from search
  // parameters and use this data for the initial state.
  const params = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const pageNum = Number(params.get('page') || 0);

  const [page, setPage] = useState(pageNum);
  const [heroes, setHeroes] = useState<HeroResponse | null>(null);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  useEffect(() => {
    // If search params are not empty - clarification of the page for the request
    let searchParam = '';

    if (page !== 0) {
      searchParam = `${page}`;
    }

    getPaginatedHeroes(searchParam).then(setHeroes);
  }, [page]);

  // after a user has selected the hero, with the help of a custom hook,
  // the hero has been filled with user-necessary information
  const { hero, setHero, error } = useFillHero(selectedHero);

  const removeSelectedHero = () => {
    setHero(null);
    setSelectedHero(null);
  };

  // this function writes information about chosen page into search params
  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(params.toString());

    if (page === 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', `${page}`);
    }

    router.push(`${path}/?${newParams}`);

    setPage(page);
  };

  return (
    <main>
      <section className="flex flex-col items-center w-[100%] h-[90vh]">
        <h1 className="opacity-0 pointer-events-none absolute bottom-0 right-0">
          Star Wars heroes list
        </h1>
        
        {!!error.length && <p className="text-2xl text-yellow mb-7">{error}</p>}

        {heroes && !hero && (
          <HeroList
            heroes={heroes}
            onSelectedHero={setSelectedHero}
            onPageChange={handlePageChange}
          />
        )}

        {selectedHero && (
          <HeroFlow hero={hero} removeSelectedHero={removeSelectedHero} />
        )}
      </section>
    </main>
  );
}
