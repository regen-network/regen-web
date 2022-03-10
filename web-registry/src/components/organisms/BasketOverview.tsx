import React from 'react';
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
import { formatNumber } from 'web-components/lib/components/table';
import { formatDate } from 'web-components/lib/utils/format';

import { OptimizedImage } from '../atoms/OptimizedImage';
import topoImg from '../../assets/background-contour-2.svg';
import forestImg from '../../assets/forest-token.png';

const useStyles = makeStyles((theme: Theme) => ({
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

export interface BasketOverviewProps {
  name: string;
  basketDenom: string;
  description: string;
  totalAmount: number;
  curator: string;
  allowedCreditClasses: string[];
  minStartDate?: string;
  startDateWindow?: string;
}

const BasketOverview: React.FC<BasketOverviewProps> = ({
  name,
  basketDenom,
  description,
  totalAmount,
  curator,
  allowedCreditClasses,
  minStartDate,
  startDateWindow,
}) => {
  const styles = useStyles();

  return (
    <Box
      sx={theme => ({
        display: 'flex',
        justifyContent: 'center',
        borderBottom: `1px solid ${theme.palette.grey[100]}`,
        backgroundColor: theme.palette.grey[50],
        backgroundImage: `url(${topoImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      })}
    >
      <Section className={styles.content}>
        <Grid container>
          <Grid item xs={12} sm={5} className={styles.imageContainer}>
            <OptimizedImage
              className={styles.image}
              src={forestImg}
              alt={name}
            />
          </Grid>
          <Grid item xs={12} sm={7} className={styles.textContainer}>
            <Title variant="h1" className={styles.title}>
              {name}
            </Title>
            <Description className={styles.basketDenom}>
              {basketDenom}
            </Description>
            <Description className={styles.basketDescription}>
              {description}
            </Description>
            <OnBoardingCard className={styles.card}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12} sm={6}>
                  <Item label="total amount" data={formatNumber(totalAmount)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Item
                    label="curator"
                    data={curator}
                    // TODO: harcoded url for curator
                    link={'https://www.regen.network/'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Item
                    label="allowed credit classes"
                    data={allowedCreditClasses}
                    // TODO: url for credit class
                    link={'/credit-classes/'}
                  />
                </Grid>
                {minStartDate && (
                  <Grid item xs={12} sm={6}>
                    <Item
                      label="min start date"
                      data={formatDate(minStartDate)}
                    />
                  </Grid>
                )}
                {startDateWindow && (
                  <Grid item xs={12} sm={6}>
                    <Item
                      label="start date window"
                      data={formatDate(startDateWindow)}
                    />
                  </Grid>
                )}
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
 * Basket summary item
 */

const useStylesItem = makeStyles(theme => ({
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
  data: string | string[];
  link?: string;
}

const Item = ({ label, data, link }: ItemProps): JSX.Element => {
  const styles = useStylesItem();

  return (
    <Box sx={{ mt: 4 }}>
      <Label className={styles.label}>{label}</Label>
      {Array.isArray(data) ? (
        data.map(item => (
          <Description key={`basket-${item}`} className={styles.data}>
            {link ? (
              <Link href={link + item} target="_blank" rel="noreferrer">
                {parseText(item)}
                <SmallArrowIcon className={styles.arrowIcon} />
              </Link>
            ) : (
              parseText(item)
            )}
          </Description>
        ))
      ) : (
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
      )}
    </Box>
  );
};
