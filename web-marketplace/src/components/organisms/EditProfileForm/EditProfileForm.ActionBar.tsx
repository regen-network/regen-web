import { useFormState } from 'react-hook-form';
import { Box } from '@mui/material';

import { SaveButton } from 'web-components/src/components/buttons/SaveButton';
import { StickyBar } from 'web-components/src/components/sticky-bar/StickyBar';

import { SAVE } from './EditProfileForm.constants';

export const EditProfileFormActionBar = ({
  saveDisabled,
}: {
  saveDisabled?: boolean;
}) => {
  const { isSubmitting, submitCount, isValid } = useFormState();

  return (
    <StickyBar>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <SaveButton
          isSubmitting={isSubmitting}
          submitCount={submitCount}
          isValid={isValid}
          saveDisabled={saveDisabled}
          buttonText={SAVE}
        />
      </Box>
    </StickyBar>
  );
};
