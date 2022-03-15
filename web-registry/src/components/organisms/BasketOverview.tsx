import React from 'react';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import { Grid, Box } from '@mui/material';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import Description from 'web-components/lib/components/description';
import { Label } from 'web-components/lib/components/label';
import { parseText } from 'web-components/lib/utils/textParser';
import { formatNumber } from 'web-components/lib/components/table';
import { formatDate } from 'web-components/lib/utils/format';

import { LinkWithArrow } from '../atoms/LinkWithArrow';
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

const SectionContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  borderBottom: `1px solid ${theme.palette.grey[100]}`,
  backgroundColor: theme.palette.grey[50],
  backgroundImage: `url(${topoImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const ImageContainer = styled(Grid)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    height: theme.spacing(57.5),
    overflowY: 'clip',
  },
}));

const TextContainer = styled(Grid)(({ theme }) => ({
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
}));

export interface CreditClass {
  id: string;
  name: string;
}

export interface BasketOverviewProps {
  name: string;
  displayDenom: string;
  description: string;
  totalAmount: number;
  curator: string;
  allowedCreditClasses: CreditClass[];
  minStartDate?: string;
  startDateWindow?: string;
}

export const BasketOverview: React.FC<BasketOverviewProps> = ({
  name,
  displayDenom,
  description,
  totalAmount,
  curator,
  allowedCreditClasses,
  minStartDate,
  startDateWindow,
}) => {
  const styles = useStyles();

  return (
    <SectionContainer>
      <Section className={styles.content}>
        <Grid container>
          <ImageContainer item xs={12} sm={5}>
            <OptimizedImage
              className={styles.image}
              src={forestImg}
              alt={name}
            />
          </ImageContainer>
          <TextContainer item xs={12} sm={7}>
            <Title variant="h1" className={styles.title}>
              {name}
            </Title>
            <Description className={styles.basketDenom}>
              {displayDenom}
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
                <Item label="total amount" data={formatNumber(totalAmount)} />
                <Item
                  label="curator"
                  data={curator}
                  // TODO: harcoded url for curator
                  link={'https://www.regen.network/'}
                />
                <ItemWithLinkList
                  label="allowed credit classes"
                  data={allowedCreditClasses}
                  link={'/credit-classes/'}
                />
                {minStartDate && (
                  <Item
                    label="min start date"
                    data={formatDate(minStartDate)}
                  />
                )}
                {startDateWindow && (
                  <Item
                    label="start date window"
                    data={formatDate(startDateWindow)}
                  />
                )}
              </Grid>
            </OnBoardingCard>
          </TextContainer>
        </Grid>
      </Section>
    </SectionContainer>
  );
};

/**
 * Basket summary item (subcomponents)
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
}));

interface ItemProps {
  label: string;
  data: string;
  link?: string;
}

const Item = ({ label, data, link }: ItemProps): JSX.Element => {
  const styles = useStylesItem();

  return (
    <GridItem label={label}>
      <Description className={styles.data}>
        {link ? <LinkWithArrow link={link} label={data} /> : parseText(data)}
      </Description>
    </GridItem>
  );
};

interface ItemWithListProps {
  label: string;
  data: CreditClass[];
  link: string;
}

const ItemWithLinkList = ({
  label,
  data,
  link,
}: ItemWithListProps): JSX.Element => {
  const styles = useStylesItem();

  return (
    <GridItem label={label}>
      {data.map(item => (
        <Description key={`basket-${item.id}`} className={styles.data}>
          <LinkWithArrow link={link + item.id} label={item.name} />
        </Description>
      ))}
    </GridItem>
  );
};

interface GridItemProps {
  label: string;
  children: React.ReactNode;
}

const GridItem = ({ label, children }: GridItemProps): JSX.Element => {
  const styles = useStylesItem();

  return (
    <Grid item xs={12} sm={6}>
      <Box sx={{ mt: 4 }}>
        <Label className={styles.label}>{label}</Label>
        {children}
      </Box>
    </Grid>
  );
};
