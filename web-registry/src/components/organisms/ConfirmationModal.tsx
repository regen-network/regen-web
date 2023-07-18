import React from 'react';
import { Avatar, Box, Link } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import Card from 'web-components/lib/components/cards/Card';
import Modal, { RegenModalProps } from 'web-components/lib/components/modal';
import { Body, Label, Title } from 'web-components/lib/components/typography';

import CowIllustration from '../../assets/cow-illustration.png';
import CarbonCreditFruit from '../../assets/svgs/carbon-credit-fruit.svg';

interface Props extends RegenModalProps {
  transactionHash?: string;
}

const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'space-between',
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
      paddingBottom: theme.spacing(20),
      height: theme.spacing(139),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(8, 4),
    },
  },
  cows: {
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(20),
    },
  },
  card: {
    display: 'flex',
    padding: theme.spacing(7.25, 5.25),
    width: '100%',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(44.25),
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(57.5),
    },
  },
  iconContainer: {
    background: theme.palette.secondary.contrastText,
    width: theme.typography.pxToRem(54),
    height: theme.typography.pxToRem(54),
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  creditDetails: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 4),
  },
  verticalSpacing: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(6),
    },
  },
}));

const ConfirmationModal: React.FC<React.PropsWithChildren<Props>> = ({
  open,
  onClose,
  transactionHash,
}) => {
  const { classes: styles, cx } = useStyles();

  return (
    <Modal className={styles.root} open={open} onClose={onClose}>
      <img
        className={cx(styles.cows, styles.verticalSpacing)}
        src={CowIllustration}
        alt="cows celebrating"
      />
      <Title align="center" variant="h3" sx={{ pb: [6, 0] }}>
        Congrats! Your purchase was successful.
      </Title>
      <Card className={cx(styles.card, styles.verticalSpacing)}>
        <Avatar className={styles.iconContainer}>
          <img
            className={styles.icon}
            src={CarbonCreditFruit}
            alt="eco-credit"
          />
        </Avatar>
        <div className={styles.creditDetails}>
          <Title
            variant="h3"
            mobileVariant="h3"
            sx={{
              display: ['flex', 'none'],
              alignItems: 'center',
              height: 54,
            }}
          >
            500
          </Title>
          <Title variant="h6">Regen - Ecocredits</Title>
          <Label size="xs" color="info.main">
            C01-20190101-20201010-02
          </Label>
          <Body size="sm" mobileSize="sm">
            Wilmot, Carbon<i>Plus</i> Grasslands Credits
          </Body>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              mt: 2,
            }}
          >
            <Label size="xs" mr={4}>
              hash:{' '}
            </Label>
            <Link
              color="secondary.main"
              fontWeight={700}
              href={`${
                import.meta.env.VITE_BLOCK_EXPLORER
              }/txs/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {transactionHash?.substring(0, 13).toLowerCase()}...
            </Link>
          </Box>
        </div>
        <Title
          variant="h3"
          sx={{ textAlign: 'center', display: ['none', 'flex'] }}
        >
          500
        </Title>
      </Card>
    </Modal>
  );
};

export { ConfirmationModal };
