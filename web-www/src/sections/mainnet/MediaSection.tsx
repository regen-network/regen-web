import React from 'react';
import { Box, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArticleCard from '@regen-network/web-components/lib/components/cards/ArticleCard';
import Section from '@regen-network/web-components/lib/components/section';
import ResponsiveSlider from '@regen-network/web-components/lib/components/sliders/ResponsiveSlider';
import { Title } from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';

import type { MainnetMediaSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
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
  query mainnetMediaSection {
    sanityMainnetPage {
      mediaItems {
        ...mediaFields
      }
    }
  }
`;

const MediaSection: React.FC = () => {
  const theme = useTheme();
  const styles = useStyles();
  const { sanityMainnetPage } = useStaticQuery<MainnetMediaSectionQuery>(query);
  const items = sanityMainnetPage?.mediaItems;
  const itemCards: JSX.Element[] = (items || []).map((item, i) => (
    <ArticleCard
      className={styles.card}
      key={i}
      type={item?.type || ''}
      url={item?.href || ''}
      name={item?.title || ''}
      author={item?.author || ''}
      imgSrc={item?.image?.image?.asset?.url || ''}
      date={item?.date}
      play={item?.type === 'video'}
    />
  ));

  return (
    <Section sx={{ root: { pt: 10, pb: 20, px: [0, 4] } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <ResponsiveSlider
          arrows
          itemWidth="90%"
          padding={theme.spacing(2.5)}
          classes={{
            root: styles.slider,
            headerWrap: styles.headerWrap,
          }}
          slidesToShow={3}
          items={itemCards}
          renderTitle={() => <Title variant="h2">Media</Title>}
        />
      </Box>
    </Section>
  );
};

export default MediaSection;
