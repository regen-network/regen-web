import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';
import { BlockContent } from 'web-components/lib/components/block-content';
import { BackgroundImgSection } from './BackgroundImgSection';
import { Maybe, Scalars } from '../../generated/sanity-graphql';
import { Body, Title } from 'web-components/lib/components/typography';
import { SxProps } from '@mui/material';

type Props = {
  img: string;
  title?: string | null;
  descriptionRaw?: Maybe<Scalars['JSON']> | string;
  linearGradient?: string;
  tooltipText?: Maybe<string>;
  isBanner?: boolean;
  classes?: {
    title?: string;
    main?: string;
    section?: string;
  };
  sxs?: {
    title?: SxProps<Theme>;
    main?: SxProps<Theme>;
    section?: SxProps<Theme>;
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    justifyContent: 'flex-end',
  },
}));

/**
 * Hero section with title, description and background image justified to the lower left with our section component.
 * Optional tooltip when using underlined text in description.
 */
const HeroTitle: React.FC<Props> = ({ classes, ...props }) => {
  const styles = useStyles();

  return (
    <BackgroundImgSection
      isBanner={props.isBanner}
      img={props.img}
      linearGradient={props?.linearGradient}
      classes={{
        main: cx(styles.main, classes?.main),
        section: classes?.section,
      }}
    >
      {props.title && (
        <Title variant="h1" sx={{ color: 'primary.main' }}>
          {props.title}
        </Title>
      )}
      {props.descriptionRaw && (
        <Body
          as="div"
          size="xl"
          sx={{
            color: 'primary.main',
            mt: 4.5,
            '& a': {
              color: 'info.contrastText',
            },
          }}
        >
          <BlockContent
            content={props.descriptionRaw}
            tooltipText={props?.tooltipText || ''}
          />
        </Body>
      )}
    </BackgroundImgSection>
  );
};

export { HeroTitle };
