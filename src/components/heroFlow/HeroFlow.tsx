import { FC, useEffect, useRef } from 'react';
import { Edge, Node, ReactFlow } from '@xyflow/react';

import { MainNode } from './nodes/MainNode';
import { SpeciesNode } from './nodes/SpeciesNode';
import { VehiclesNode } from './nodes/VehiclesNode';
import { StarshipsNode } from './nodes/StarshipsNode';
import { FilmNode } from './nodes/FilmNode';
import { HomeWorldNode } from './nodes/HomeWorld';
import { nodeWrapperStyle } from '@/constants/nodeWrapperStyle';
import { nodeData } from '@/constants/nodeData';

import { FilledHero } from '@/types/hero';

import '@xyflow/react/dist/style.css';

type HeroFlowProps = {
  hero: FilledHero | null;
  onSelectedHero: () => void;
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
      id: nodeData.mainNode.id,
      data: { label: <MainNode hero={hero} onSelectedHero={onSelectedHero} /> },
      position: nodeData.mainNode.position,
      type: 'default',
      style: { ...nodeWrapperStyle, width: '450px' },
    },
  ];

  const initialEdges: Edge[] = [];

  // filled initial Node with additional information (films and vehicles).
  hero.films.forEach((film, filmIndex) => {
    const filmNodeId = `films-${filmIndex + 1}`;

    initialNodes.push({
      id: filmNodeId,
      data: {
        label: <FilmNode film={film} id={filmIndex + 1} key={filmNodeId} />,
      },
      position: { x: 1000, y: filmIndex * 450 },
      type: 'default',
      style: nodeWrapperStyle,
    });

    initialEdges.push({
      id: `${nodeData.mainNode.id}-${filmNodeId}`,
      source: nodeData.mainNode.id,
      target: filmNodeId,
      animated: true,
      type: 'step',
      sourceHandle: nodeData.mainNode.sources.films,
    });

    if (!!film.vehicles.length) {
      const vehiclesInFilm = hero.vehicles.filter((vehicle) =>
        vehicle.films.includes(film.id)
      );

      if (!!vehiclesInFilm.length) {
        initialNodes.push({
          id: `vehicle-${filmNodeId}`,
          data: { label: <VehiclesNode vehicles={vehiclesInFilm} /> },
          position: { x: 1450, y: filmIndex * 450 },
          type: 'default',
          style: nodeWrapperStyle,
        });

        initialEdges.push({
          id: `${filmNodeId}-vehicle-${filmNodeId}`,
          source: filmNodeId,
          target: `vehicle-${filmNodeId}`,
          animated: true,
          type: 'step',
          sourceHandle: filmNodeId,
        });
      }
    }
  });

  // hero has more properties. They could be displayed as well.
  // but before this  property has to be checked on  availableness
  if (!!hero.species.length) {
    initialNodes.push({
      id: nodeData.species.id,
      data: { label: <SpeciesNode species={hero.species} /> },
      position: nodeData.species.position,
      type: 'default',
      style: nodeWrapperStyle,
    });

    initialEdges.push({
      id: `${nodeData.mainNode.id}${nodeData.species.id}`,
      source: nodeData.mainNode.id,
      target: nodeData.species.id,
      animated: true,
      type: 'step',
      sourceHandle: nodeData.mainNode.sources.species,
    });
  }

  if (!!hero.starships.length) {
    initialNodes.push({
      id: nodeData.starships.id,
      data: { label: <StarshipsNode starships={hero.starships} /> },
      position: nodeData.starships.position,
      type: 'default',
      style: nodeWrapperStyle,
    });

    initialEdges.push({
      id: `${nodeData.mainNode.id}${nodeData.starships.id}`,
      source: nodeData.mainNode.id,
      target: nodeData.starships.id,
      animated: true,
      type: 'step',
      sourceHandle: nodeData.mainNode.sources.starships,
    });
  }

  if (!!hero.homeworld) {
    initialNodes.push({
      id: nodeData.homeWorld.id,
      data: { label: <HomeWorldNode homeWorld={hero.homeworld} /> },
      position: nodeData.homeWorld.position,
      type: 'default',
      style: nodeWrapperStyle,
    });

    initialEdges.push({
      id: `${nodeData.mainNode.id}${nodeData.homeWorld.id}`,
      source: nodeData.mainNode.id,
      target: nodeData.homeWorld.id,
      animated: true,
      type: 'step',
      sourceHandle: nodeData.mainNode.sources.homeWorld,
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
