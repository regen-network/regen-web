import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import MediaCard from './MediaCard';
import ProjectPlaceInfo from '../place/ProjectPlaceInfo';

export interface ProjectInfo {
  name: string;
  imgSrc: string;
  place: string;
  area: number;
  areaUnit: string;
}

interface ProjectCardProps {
  project: ProjectInfo;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps): JSX.Element {
  const theme = useTheme();
  return (
    <MediaCard onClick={onClick} imgSrc={project.imgSrc} name={project.name}>
      <ProjectPlaceInfo
        place={project.place}
        area={project.area}
        areaUnit={project.areaUnit}
        fontSize="0.75rem"
        color={theme.palette.primary.light}
      />
    </MediaCard>
  );
}
