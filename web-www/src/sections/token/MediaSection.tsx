import React from 'react';
import { useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { graphql, useStaticQuery } from 'gatsby';

import ArticleCard from '@regen-network/web-components/lib/components/cards/ArticleCard';
import Section from '@regen-network/web-components/lib/components/section';
import ResponsiveSlider from '@regen-network/web-components/lib/components/sliders/ResponsiveSlider';
import { Title } from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';

import { TokenMediaSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(14, 4, 20),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(14, 0, 20),
    },
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  headerWrap: {
    display: 'flex',
    flexFlow: 'row nowrap',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-between',
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  slider: {
    padding: theme.spacing(4),
  },
  card: {
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '10px',
  },
}));

const query = graphql`
  query tokenMediaSection {
    sanityTokenPage {
      mediaCards {
        ...mediaFields
      }
    }
  }
`;

const MediaSection: React.FC = () => {
  const { sanityTokenPage: data } =
    useStaticQuery<TokenMediaSectionQuery>(query);
  const styles = useStyles();
  const theme = useTheme();

  const itemCards: JSX.Element[] = (data?.mediaCards || []).map((item, i) => (
    <ArticleCard
      className={styles.card}
      key={i}
      url={item?.href || ''}
      name={item?.title || ''}
      author={item?.author || ''}
      type={item?.type || ''}
      imgSrc={item?.image?.image?.asset?.url || ''}
      date={item?.date}
      play={item?.type === 'videos'}
    />
  ));
  const slidesToShow = itemCards && itemCards.length < 3 ? itemCards.length : 3;

  return itemCards && itemCards?.length > 0 ? (
    <Section className={styles.root}>
      <div className={styles.main}>
        <ResponsiveSlider
          arrows={itemCards.length > 3}
          classes={{
            root: styles.slider,
            headerWrap: styles.headerWrap,
          }}
          itemWidth="90%"
          padding={theme.spacing(2.5)}
          slidesToShow={slidesToShow}
          items={itemCards}
          renderTitle={() => (
            <Title variant="h2" mobileVariant="h3">
              Media
            </Title>
          )}
        />
      </div>
    </Section>
  ) : (
    <></>
  );
};

export default MediaSection;
