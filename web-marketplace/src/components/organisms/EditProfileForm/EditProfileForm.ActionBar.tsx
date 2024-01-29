import { useFormState } from 'react-hook-form';
import { Box } from '@mui/material';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { StickyBar } from 'web-components/src/components/sticky-bar/StickyBar';

import { SAVE } from './EditProfileForm.constants';

export const EditProfileFormActionBar = () => {
  const { isSubmitting, submitCount, isValid } = useFormState();
  return (
    <StickyBar>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <ContainedButton
          type="submit"
          disabled={(submitCount > 0 && !isValid) || isSubmitting}
        >
          {SAVE}
        </ContainedButton>
      </Box>
    </StickyBar>
  );
};
