import React from 'react';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import { Grid, Box } from '@mui/material';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import {
  Body,
  Label,
  Subtitle,
  Title,
} from 'web-components/lib/components/typography';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import { parseText } from 'web-components/lib/utils/textParser';
import { formatDate, formatNumber } from 'web-components/lib/utils/format';
import { truncate } from 'web-components/lib/utils/truncate';

import { getAccountUrl } from '../../lib/block-explorer';
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

const DataText = styled(Body)(({ theme }) => ({
  color: theme.palette.info.dark,
  '& a': {
    color: theme.palette.text.secondary,
  },
}));
DataText.defaultProps = {
  mobileSize: 'md',
};

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
            <Title variant="h1" sx={{ mb: [0, 2] }}>
              {name}
            </Title>
            <Subtitle mt={2} color="info.main">
              {displayDenom}
            </Subtitle>
            <Body size="xl" mt={2}>
              {description}
            </Body>
            <OnBoardingCard className={styles.card}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Item label="total amount" data={formatNumber(totalAmount)} />
                <Item
                  label="curator"
                  data={truncate(curator)}
                  link={getAccountUrl(curator as string)}
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

interface ItemProps {
  label: string;
  data: string;
  link?: string;
}

const Item = ({ label, data, link }: ItemProps): JSX.Element => {
  return (
    <GridItem label={label}>
      <DataText>
        {link ? <LinkWithArrow href={link} label={data} /> : parseText(data)}
      </DataText>
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
  return (
    <GridItem label={label}>
      {data.map(item => (
        <DataText key={`basket-${item.id}`}>
          <LinkWithArrow
            href={link + item.id}
            label={item.name}
            sx={{ fontWeight: 'normal' }}
          />
        </DataText>
      ))}
    </GridItem>
  );
};

interface GridItemProps {
  label: string;
  children: React.ReactNode;
}

const GridItem = ({ label, children }: GridItemProps): JSX.Element => {
  return (
    <Grid item xs={12} sm={6}>
      <Box sx={{ mt: 4 }}>
        <Label size="xs" sx={{ color: 'primary.contrastText', mb: 2 }}>
          {label}
        </Label>
        {children}
      </Box>
    </Grid>
  );
};
