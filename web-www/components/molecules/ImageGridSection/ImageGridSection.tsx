import React from 'react';
import { Box, CardMedia, SxProps } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { BlockContent } from 'web-components/src/components/block-content';
import Card from 'web-components/src/components/cards/Card';
import { Image } from 'web-components/src/components/image';
import ImageGrid from 'web-components/src/components/image-grid';
import { Theme } from 'web-components/src/theme/muiTheme';

import { LinkComponent } from '@/components/atoms/LinkComponent/LinkComponent';
import { ImageGridSection as ImageGridSectionProps } from '@/generated/sanity-graphql';

const useStyles = makeStyles()(theme => ({
  card: {
    border: 0,
    borderRadius: 0,
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(70.75),
    },
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(158.5),
    },
  },
  cardMedia: {
    height: '100%',
    width: '100%',
  },
}));

interface Props {
  content: ImageGridSectionProps;
  sx?: SxProps<Theme>;
}

const ImageGridSection: React.FC<React.PropsWithChildren<Props>> = ({
  content,
  sx,
}) => {
  const { classes: styles } = useStyles();
  const backgroundImage = content.backgroundImage?.image?.asset?.url;

  return (
    <Box sx={sx}>
      {content?.items?.map((item, index: number) => (
        <Image
          backgroundImage
          src={backgroundImage || ''}
          key={item?.header || index}
          alt=""
        >
          <ImageGrid
            img={
              <Card className={styles.card}>
                <CardMedia
                  className={styles.cardMedia}
                  image={item?.image?.image?.asset?.url || ''}
                />
              </Card>
            }
            title={item?.header || ''}
            description={<BlockContent content={item?.descriptionRaw} />}
            even={index % 2 === 0}
            button={{
              text: item?.button?.buttonText ?? '',
              href: item?.button?.buttonLink?.buttonHref ?? '',
            }}
            linkComponent={LinkComponent}
          />
        </Image>
      ))}
    </Box>
  );
};

export { ImageGridSection };
