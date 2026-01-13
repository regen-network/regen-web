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
  const { id: projectId, imgSrc, name, place, area, areaUnit } = project;

  const cardId = `select-project-card-${projectId}`;

  return (
    <label
      htmlFor={cardId}
      className={`cursor-pointer rounded-[10px] overflow-hidden shadow-lg outline outline-solid relative z-50 ${
        selected
          ? 'rounded-xl outline-brand-400 outline-[3px] opacity-100'
          : 'outline-1 outline-grey-300 opacity-70'
      }`}
    >
      <input
        id={cardId}
        type="checkbox"
        checked={selected}
        onChange={() => onClick?.(projectId)}
        className="sr-only"
        aria-label={name}
      />
      {selected && (
        <div className="absolute z-50 top-[72px] left-1/2 -ml-25">
          <div className="w-50 h-50 rounded-full p-1 bg-brand-100 flex items-center justify-center">
            <SuccessIcon
              className="h-40 w-40 text-brand-400"
              aria-hidden="true"
            />
          </div>
        </div>
      )}
      <ProjectCard
        imgSrc={imgSrc}
        name={name}
        place={place}
        area={area}
        areaUnit={areaUnit}
        hasBottomCard={false}
        draftText=""
        borderWidth={0}
        program={project.program}
      />
    </label>
  );
};
