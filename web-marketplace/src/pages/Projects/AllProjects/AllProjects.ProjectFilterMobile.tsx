import { useState } from 'react';
import { useLingui } from '@lingui/react';
import { SxProps, Theme } from '@mui/material';
import { sxToArray } from 'utils/mui/sxToArray';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import FilterIcon from 'web-components/src/components/icons/FilterIcon';
import Modal from 'web-components/src/components/modal';
import type { FilterOption } from 'web-components/src/components/organisms/ProjectFilters/ProjectFilters';

import {
  ADD_FILTERS_MODAL_BUTTON,
  MODIFY_FILTERS_MODAL_BUTTON,
} from './AllProjects.constants';
import ProjectFilterBody from './AllProjects.ProjectFilterBody';
import { CreditClassFilter, ProjectWithOrderData } from './AllProjects.types';

type Props = {
  allProjects: ProjectWithOrderData[];
  sx?: SxProps<Theme>;
  resetFilters: () => void;
  className?: string;
  showResetButton?: boolean;
  hasCommunityProjects: boolean;
  creditClassFilterOptions?: CreditClassFilter[];
  buyingOptionsFilterOptions: FilterOption[];
  numberOfSelectedFilters: number;
};

const ProjectFilterMobile = ({
  allProjects,
  resetFilters,
  sx = [],
  className = '',
  showResetButton = true,
  hasCommunityProjects,
  creditClassFilterOptions = [],
  buyingOptionsFilterOptions,
  numberOfSelectedFilters,
}: Props) => {
  const { _ } = useLingui();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

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
        className={className}
      >
        {numberOfSelectedFilters
          ? _(MODIFY_FILTERS_MODAL_BUTTON)
          : _(ADD_FILTERS_MODAL_BUTTON)}
        {numberOfSelectedFilters ? ` (${numberOfSelectedFilters})` : ''}
      </OutlinedButton>
      <Modal open={isOpen} onClose={onClose} className="h-full">
        <ProjectFilterBody
          allProjects={allProjects}
          creditClassFilterOptions={creditClassFilterOptions}
          resetFilters={resetFilters}
          showResetButton={showResetButton}
          hasCommunityProjects={hasCommunityProjects}
          buyingOptionsFilterOptions={buyingOptionsFilterOptions}
          onCloseFilterModal={onClose}
          mobile
        />
      </Modal>
    </>
  );
};

export default ProjectFilterMobile;
