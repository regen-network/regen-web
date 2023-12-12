import React from 'react';
import { SxProps } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { BlockContent } from 'web-components/src/components/block-content';
import { Body, Title } from 'web-components/src/components/typography';
import { Theme } from 'web-components/src/theme/muiTheme';

import { Maybe, Scalars } from '../../generated/sanity-graphql';
import { BackgroundImgSection } from './BackgroundImgSection';

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

const useStyles = makeStyles()((theme: Theme) => ({
  main: {
    justifyContent: 'flex-end',
  },
}));

/**
 * Hero section with title, description and background image justified to the lower left with our section component.
 * Optional tooltip when using underlined text in description.
 */
const HeroTitle: React.FC<React.PropsWithChildren<Props>> = ({
  classes,
  ...props
}) => {
  const { classes: styles, cx } = useStyles();

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
