import { useFormState } from 'react-hook-form';
import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';

import { SaveButton } from 'web-components/src/components/buttons/SaveButton';
import { StickyBar } from 'web-components/src/components/sticky-bar/StickyBar';

import { useNavigation } from '../DashboardNavigation/contexts/NavigationContext';
import { SAVE } from './EditProfileForm.constants';

export const EditProfileFormActionBar = () => {
  const { _ } = useLingui();
  const { collapsed } = useNavigation();
  const { isSubmitting, submitCount, isValid, dirtyFields } = useFormState();
  const isFormDirty = !Object.keys(dirtyFields).length;
  const isSaveButtonDisabled =
    (submitCount > 0 && !isValid) || isSubmitting || isFormDirty || !isValid;

  const navWidth = collapsed ? '100px' : '263px';

  return (
    <StickyBar
      sx={{
        left: { xs: 0, md: navWidth },
        width: { xs: '100%', md: `calc(100% - ${navWidth})` },
        transition: 'left 0.15s ease-in-out, width 0.15s ease-in-out',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <SaveButton buttonText={_(SAVE)} disabled={isSaveButtonDisabled} />
      </Box>
    </StickyBar>
  );
};
