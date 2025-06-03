import { useParams } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

import WithLoader from 'components/atoms/WithLoader';
import { CreditClassCards } from 'components/organisms';

import { useMergedCreditClasses } from '../hooks/useMergedCreditClasses';

const useStyles = makeStyles()(theme => ({
  truncatedCard: {
    '& .MuiCardContent-root p': {
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
}));

export const CreditClassTab = () => {
  const { classes } = useStyles();
  const { accountAddressOrId } = useParams();
  const { creditClasses, programs, loading } =
    useMergedCreditClasses(accountAddressOrId);

  return (
    <WithLoader isLoading={loading}>
      <CreditClassCards
        creditClassesContent={creditClasses}
        creditClassesProgram={programs}
        btnText="Learn More"
        classes={{
          card: classes.truncatedCard,
        }}
      />
    </WithLoader>
  );
};
