import { useState } from 'react';
import { useLingui } from '@lingui/react';
import { SxProps, Theme } from '@mui/material';
import { sxToArray } from 'utils/mui/sxToArray';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import FilterIcon from 'web-components/src/components/icons/FilterIcon';
import Modal from 'web-components/src/components/modal';

import { FILTERS_MODAL_BUTTON } from './AllProjects.constants';
import ProjectFilterBody from './AllProjects.ProjectFilterBody';

type Props = {
  sx?: SxProps<Theme>;
  activeFilters: string[];
  setActiveFilters: (filters: string[]) => void;
  resetFilters: () => void;
};

const ProjectFilter = ({
  activeFilters,
  setActiveFilters,
  resetFilters,
  sx = [],
}: Props) => {
  const { _ } = useLingui();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <OutlinedButton
        size="small"
        onClick={() => setIsOpen(true)}
        startIcon={
          <FilterIcon
            sx={{
              with: 25,
              height: 24,
            }}
          />
        }
        sx={[
          {
            mr: 4,
          },
          ...sxToArray(sx),
        ]}
      >
        {_(FILTERS_MODAL_BUTTON)}
      </OutlinedButton>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} className="h-full">
        <ProjectFilterBody
          className="h-full"
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          resetFilters={resetFilters}
        />
      </Modal>
    </>
  );
};

export default ProjectFilter;
