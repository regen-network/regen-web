import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

import { ImageItemProps } from 'web-components/lib/components/image-item';
import ImageItems from 'web-components/lib/components/sliders/ImageItems';
import Section from 'web-components/lib/components/section';

import { ImageItemsSection as ImageItemsSectionProps } from '../../generated/sanity-graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(14),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
  },
}));

interface Props {
  content: ImageItemsSectionProps;
}

const ImageItemsSection: React.FC<Props> = ({ content }) => {
  const styles = useStyles();
  const imageItems: ImageItemProps[] =
    content?.imageCards?.map(i => ({
      img: <img src={i?.icon?.asset?.url || ''} alt={`${i?.title}`} />,
      title: i?.title || '',
      description: i?.descriptionRaw[0]?.children[0]?.text,
    })) || [];

  return (
    <Section withSlider className={styles.root} title={content?.title || ''}>
      <ImageItems items={imageItems} />
    </Section>
  );
};

export { ImageItemsSection };
