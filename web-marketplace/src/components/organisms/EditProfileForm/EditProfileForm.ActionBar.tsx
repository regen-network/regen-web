import { useFormState } from 'react-hook-form';
import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';

import { SaveButton } from 'web-components/src/components/buttons/SaveButton';
import { StickyBar } from 'web-components/src/components/sticky-bar/StickyBar';

import { SAVE } from './EditProfileForm.constants';

export const EditProfileFormActionBar = () => {
  const { _ } = useLingui();
  const { isSubmitting, submitCount, isValid, dirtyFields } = useFormState();
  const isFormDirty = !Object.keys(dirtyFields).length;
  const isSaveButtonDisabled =
    (submitCount > 0 && !isValid) || isSubmitting || isFormDirty || !isValid;

  return (
    <StickyBar>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <SaveButton buttonText={_(SAVE)} disabled={isSaveButtonDisabled} />
      </Box>
    </StickyBar>
  );
};
