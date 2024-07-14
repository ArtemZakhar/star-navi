import { FC, useEffect, useRef } from 'react';
import { Node, ReactFlow } from '@xyflow/react';

import { FilledHero } from '@/types/hero';
import { MainNode } from './nodes/MainNode';
import { SpeciesNode } from './nodes/SpeciesNode';
import { VehiclesNode } from './nodes/VehiclesNode';
import { StarshipsNode } from './nodes/StarshipsNode';
import { FilmsNode } from './nodes/FilmsNode';
import { HomeWorldNode } from './nodes/HomeWorld';

import '@xyflow/react/dist/style.css';

type HeroFlowProps = {
  hero: FilledHero | null;
  onSelectedHero: () => void;
};

const nodeWrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  width: '250px',
  height: 'fit-content',
  backgroundColor: '#374151',
};

export const HeroFlow: FC<HeroFlowProps> = ({ hero, onSelectedHero }) => {
  // checking clicks outside the Flow
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeDropDown = (e: any) => {
      if (wrapperRef.current && !wrapperRef.current?.contains(e.target)) {
        onSelectedHero();
      }
    };

    document.addEventListener('click', closeDropDown);

    return () => removeEventListener('click', closeDropDown);
  });

  // just a type guard
  if (!hero) {
    return;
  }

  // if there is a hero than at least one node should be displayed.
  const initialNodes: Node[] = [
    {
      id: 'hero',
      data: { label: <MainNode hero={hero} onSelectedHero={onSelectedHero} /> },
      position: { x: 350, y: 175 },
      type: 'default',
      style: { ...nodeWrapperStyle, width: '450px' },
    },
  ];

  const initialEdges = [];

  // then every property has to be checked on  availableness
  if (!!hero.species.length) {
    initialNodes.push({
      id: 'species',
      data: { label: <SpeciesNode species={hero.species} /> },
      position: { x: 300, y: 800 },
      type: 'default',
      style: nodeWrapperStyle,
    });

    initialEdges.push({
      id: 'main-species',
      source: 'hero',
      target: 'species',
      animated: true,
      type: 'step',
    });
  }

  if (!!hero.vehicles.length) {
    initialNodes.push({
      id: 'vehicles',
      data: { label: <VehiclesNode vehicles={hero.vehicles} /> },
      position: { x: 600, y: 800 },
      type: 'default',
      style: nodeWrapperStyle,
    });

    initialEdges.push({
      id: 'main-vehicles',
      source: 'hero',
      target: 'vehicles',
      animated: true,
      type: 'step',
    });
  }

  if (!!hero.starships.length) {
    initialNodes.push({
      id: 'starships',
      data: { label: <StarshipsNode starships={hero.starships} /> },
      position: { x: -100, y: 0 },
      type: 'default',
      style: nodeWrapperStyle,
    });

    initialEdges.push({
      id: 'main-starships',
      source: 'hero',
      target: 'starships',
      animated: true,
      type: 'step',
    });
  }

  if (!!hero.films.length) {
    initialNodes.push({
      id: 'films',
      data: { label: <FilmsNode films={hero.films} /> },
      position: { x: 1000, y: 0 },
      type: 'default',
      style: nodeWrapperStyle,
    });

    initialEdges.push({
      id: 'film-edge',
      source: 'hero',
      target: 'films',
      animated: true,
      type: 'step',
    });
  }

  if (!!hero.homeworld) {
    initialNodes.push({
      id: 'home-world',
      data: { label: <HomeWorldNode homeWorld={hero.homeworld} /> },
      position: { x: 450, y: -100 },
      type: 'default',
      style: nodeWrapperStyle,
    });

    initialEdges.push({
      id: 'main-home-world',
      source: 'hero',
      target: 'home-world',
      animated: true,
      type: 'step',
    });
  }

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        fitView
      />
    </div>
  );
};
