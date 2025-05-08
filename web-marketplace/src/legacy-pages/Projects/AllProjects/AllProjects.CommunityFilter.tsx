import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box, FormControlLabel, Link, SxProps, Theme } from '@mui/material';
import { useAtom } from 'jotai';

import { Flex } from 'web-components/src/components/box';
import Checkbox from 'web-components/src/components/inputs/new/CheckBox/Checkbox';
import InfoTooltipWithIcon from 'web-components/src/components/tooltip/InfoTooltipWithIcon';

import { UseStateSetter } from 'types/react/use-state';
import { showCommunityProjectsAtom } from 'lib/atoms/projects.atoms';
import { useTracker } from 'lib/tracker/useTracker';

import { COMMUNITY_FILTER } from './AllProjects.constants';
import { FilterCommunityCreditsEvent } from './AllProjects.types';
import { getFilterSelected } from './AllProjects.utils';

type CommunityFilterProps = {
  sx?: SxProps<Theme>;
  tempShowCommunityProjects: boolean | undefined;
  setTempShowCommunityProjects: UseStateSetter<boolean | undefined>;
  mobile?: boolean;
};

export const CommunityFilter = ({
  sx,
  tempShowCommunityProjects,
  setTempShowCommunityProjects,
  mobile,
}: CommunityFilterProps) => {
  const { _ } = useLingui();
  const { track } = useTracker();
  const [showCommunityProjects, setShowCommunityProjects] = useAtom(
    showCommunityProjectsAtom,
  );

  return (
    <Flex sx={sx}>
      <FormControlLabel
        control={
          <Checkbox
            sx={{ p: 0, mr: 3 }}
            checked={mobile ? tempShowCommunityProjects : showCommunityProjects}
            onChange={event => {
              const checked = event.target.checked;
              if (mobile) {
                setTempShowCommunityProjects(checked);
              } else setShowCommunityProjects(checked);
              track<FilterCommunityCreditsEvent>(
                'filterPermissionlessCredits',
                {
                  selected: getFilterSelected(checked),
                },
              );
            }}
          />
        }
        label={_(COMMUNITY_FILTER)}
        sx={{
          whiteSpace: 'nowrap',
          mr: 1,
          ml: 0,
          '& .MuiFormControlLabel-label': { fontSize: '14px' },
        }}
      />
      <InfoTooltipWithIcon
        title={
          <Box sx={{ textAlign: 'start' }}>
            <Trans>
              Community credits are credits that have not been through the{' '}
              <Link
                href="https://registry.regen.network/"
                target="_blank"
                sx={{ color: 'secondary.main', fontWeight: 700, mr: 1 }}
              >
                Regen Registry program
              </Link>
              or are not associated with another known registry. <br />
              <br />
              To create your own credits,{' '}
              <Link
                href="https://docs.regen.network/tutorials/"
                target="_blank"
                sx={{ color: 'secondary.main', fontWeight: 700 }}
              >
                learn more in our docs.
              </Link>
            </Trans>
          </Box>
        }
        outlined
      />
    </Flex>
  );
};
