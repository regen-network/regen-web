import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Box, Link } from '@mui/material';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import Description from 'web-components/lib/components/description';
import SmallArrowIcon from 'web-components/lib/components/icons/SmallArrowIcon';
import { Label } from 'web-components/lib/components/label';
import { parseText } from 'web-components/lib/utils/textParser';

import { OptimizedImage } from '../atoms/OptimizedImage';
import topoImg from '../../assets/background-contour-2.svg';
import forestImg from '../../assets/forest-token.png';
import { ledgerRestUri } from '../../ledger';
import type { Basket } from '../../types/ledger/ecocredit';

const useStyles = makeStyles((theme: Theme) => ({
  top: {
    display: 'flex',
    justifyContent: 'center',
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    backgroundColor: theme.palette.grey[50],
    backgroundImage: `url(${topoImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  content: {
    display: 'flex',
    width: '100%',
    padding: theme.spacing(0, 5),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(30, 5),
      maxWidth: theme.breakpoints.values.lg,
    },
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
    },
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(57.5),
      overflowY: 'clip',
    },
  },
  image: {
    width: '100%',
    maxWidth: theme.spacing(103),
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(76.4),
      minWidth: theme.spacing(103),
      overflow: 'hidden',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
  textContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    [theme.breakpoints.down('lg')]: {
      paddingLeft: theme.spacing(8),
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: theme.spacing(8, 0),
      '&:last-child': {
        paddingBottom: theme.spacing(15),
      },
    },
  },
  title: {
    lineHeight: theme.spacing(9),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(0),
    },
  },
  basketDenom: {
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    color: theme.palette.info.main,
  },
  basketDescription: {
    fontSize: theme.typography.pxToRem(22),
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  card: {
    margin: theme.spacing(8, 0, 0),
    padding: theme.spacing(3, 5, 7),
  },
}));

interface BasketOverviewProps {
  basketDenom: string;
}

// TODO: Mocked function: Basket Query (ledger api)
async function getBasket(basketDenom: string): Promise<Basket> {
  return Promise.resolve({
    id: '1',
    basket_denom: 'eco.uC.rNCT',
    display_denom: 'eco.C.rNCT',
    name: 'rNCT',
    disable_auto_retire: false,
    credit_type_abbrev: 'C',
    date_criteria: {
      start_date_window: '1000',
    },
    exponent: '6',
    balance: {
      denom: 'eco.uC.rNCT',
      amount: '10000000',
    },
  });
}

// TODO: Hardcoded basket values
const basketSummary = [
  { id: 'balance.amount', displayName: 'total amount', value: '14,000' },
  {
    id: 'curator',
    displayName: 'curator',
    value: 'Regen Network Development, Inc',
    link: 'https://www.regen.network/',
  },
  {
    id: 'allowedCreditClasses',
    displayName: 'allowed credit classes',
    value: 'VCU (CO2)',
    link: 'https://www.regen.network/',
  },
  {
    id: 'minStartDate',
    displayName: 'min start date',
    value: '10-year rolling acceptance window',
  },
];

// TODO: Hardcoded description
const BASKET_DESCRIPTION =
  'The Regen Nature Carbon Ton groups together carbon sequestration ecocredits into one tradeable asset. Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const BasketOverview: React.FC<BasketOverviewProps> = ({ basketDenom }) => {
  const styles = useStyles();
  const [basket, setBasket] = useState<Basket>();
  // TODO: Basket description (see comment in Figma)
  // https://www.figma.com/file/x5vjWsddiUBzP2N13AFOPw?node-id=32:10028#155844414
  const [basketDescription, setBasketDescription] = useState<string>('');

  useEffect(() => {
    if (!basketDenom || !ledgerRestUri) return;

    const fetchData = async (): Promise<void> => {
      const _basket = await getBasket(basketDenom);
      setBasket(_basket);
      // TODO: fetch Basket description
      setBasketDescription(BASKET_DESCRIPTION);
    };

    fetchData();
  }, [basketDenom]);

  return (
    <Box className={styles.top}>
      <Section className={styles.content}>
        <Grid container>
          <Grid item xs={12} sm={5} className={styles.imageContainer}>
            <OptimizedImage
              className={styles.image}
              src={forestImg}
              alt={basket?.name}
            />
          </Grid>
          <Grid item xs={12} sm={7} className={styles.textContainer}>
            <Title variant="h1" className={styles.title}>
              {basket?.name}
            </Title>
            <Description className={styles.basketDenom}>
              {basket?.basket_denom}
            </Description>
            <Description className={styles.basketDescription}>
              {basketDescription}
            </Description>
            <OnBoardingCard className={styles.card}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {basketSummary.map(item => (
                  <Grid item key={item.id} xs={12} sm={6}>
                    <Item
                      label={item.displayName}
                      data={item.value}
                      link={item.link}
                    />
                  </Grid>
                ))}
              </Grid>
            </OnBoardingCard>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
};

export { BasketOverview };

/**
 * Basket summary item (subcomponent)
 */

const useStylesItem = makeStyles(theme => ({
  gridItem: {
    marginTop: theme.spacing(4),
  },
  label: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.primary.contrastText,
    letterSpacing: '1px',
    lineHeight: '15px',
    marginBottom: theme.spacing(2),
  },
  data: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 400,
    '& a': {
      color: theme.palette.text.secondary,
      fontSize: theme.typography.pxToRem(16),
      fontWeight: 400,
    },
  },
  arrowIcon: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(0.3),
    height: 9,
    width: 13,
  },
}));

interface ItemProps {
  label: string;
  data: string | JSX.Element;
  link?: string;
}

const Item = ({ label, data, link }: ItemProps): JSX.Element => {
  const styles = useStylesItem();

  return (
    <div className={styles.gridItem}>
      <Label className={styles.label}>{label}</Label>
      <Description className={styles.data}>
        {link ? (
          <Link href={link} target="_blank" rel="noreferrer">
            {parseText(data)}
            <SmallArrowIcon className={styles.arrowIcon} />
          </Link>
        ) : (
          parseText(data)
        )}
      </Description>
    </div>
  );
};
