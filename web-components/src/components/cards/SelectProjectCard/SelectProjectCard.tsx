import { useMemo } from 'react';

import SuccessIcon from '../../icons/SuccessIcon';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import { SelectProjectCardProps } from './SelectProjectCard.types';

/**
 * A selectable project card component used for migrating projects.
 * It visually represents a project and allows the user to select it via a checkbox.
 * The selection state is controlled by the parent component.
 */
export const SelectProjectCard = ({
  project,
  selected,
  onClick,
}: SelectProjectCardProps) => {
  const { id: projectId, imageSrc, title, location, area } = project;

  const { areaNumber, areaUnit } = useMemo(() => {
    if (typeof area !== 'string' || !area.includes(' ')) {
      return { areaNumber: undefined, areaUnit: undefined };
    }
    const parts = area.split(' ');
    const number = parseFloat(parts[0]);

    return {
      areaNumber: isNaN(number) ? undefined : number,
      areaUnit: parts[1],
    };
  }, [area]);

  const cardId = `select-project-card-${projectId}`;

  return (
    <label
      htmlFor={cardId}
      className={`cursor-pointer rounded-[10px] overflow-hidden shadow-sm outline outline-solid relative z-50 ${
        selected
          ? 'rounded-xl outline-brand-400 outline-[3px]'
          : 'outline-1 outline-grey-300 focus-within:shadow-xs focus-within:shadow-brand-400/50'
      }`}
    >
      <input
        id={cardId}
        type="checkbox"
        checked={selected}
        onChange={() => onClick?.(projectId)}
        className="sr-only"
        aria-label={title}
      />
      {selected && (
        <div className="absolute flex justify-center z-50 items-center w-full h-full">
          <div className="absolute w-50 h-50 rounded-full p-1 bg-brand-100 flex items-center justify-center mb-[75px]">
            <SuccessIcon
              className="h-40 w-40 text-brand-400"
              aria-hidden="true"
            />
          </div>
        </div>
      )}
      <ProjectCard
        imgSrc={imageSrc}
        name={title}
        place={location}
        area={areaNumber}
        areaUnit={areaUnit}
        hasBottomCard={false}
        draftText=""
        borderWidth={0}
        program={project.program}
      />
    </label>
  );
};
