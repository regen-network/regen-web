import { useMemo } from 'react';
import { useLingui } from '@lingui/react';
import { makeStyles } from 'tss-react/mui';

import { SKIPPED_CLASS_ID } from 'lib/env';

import { useCreditClasses } from 'pages/Home/hooks/useCreditClasses';
import WithLoader from 'components/atoms/WithLoader';
import { CreditClassCards } from 'components/organisms';

const useStyles = makeStyles()(() => ({
  truncatedCard: {
    '& .MuiCardContent-root p': {
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    // Hide any button elements if they still appear
    '& .MuiButton-root': {
      display: 'none !important',
    },
    // Add hover effect to indicate clickability
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      transition: 'all 0.2s ease-in-out',
      cursor: 'pointer',
    },
  },
}));

export const CreditClassTab = () => {
  const { _ } = useLingui();
  const { classes } = useStyles();

  const {
    creditClasses,
    creditClassesPrograms,
    loading: creditClassesLoading,
  } = useCreditClasses({
    skippedClassId: SKIPPED_CLASS_ID,
  });
  console.log('Credit Classes:', creditClasses);

  return (
    <WithLoader
      isLoading={creditClassesLoading}
      sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
    >
      <CreditClassCards
        justifyContent={['center', 'center', 'flex-start']}
        creditClassesContent={creditClasses}
        creditClassesProgram={creditClassesPrograms}
        btnText="" // Empty string should hide the button
        classes={{
          card: classes.truncatedCard,
        }}
      />
    </WithLoader>
  );
};
