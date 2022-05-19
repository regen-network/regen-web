import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import { Box, styled, SxProps } from '@mui/material';
import clsx from 'clsx';
import { Variant } from '@mui/material/styles/createTypography';

import { Title } from '../typography';
import { parseText } from '../../utils/textParser';

export interface SectionProps {
  children?: any;
  className?: string;
  classes?: {
    root?: string;
    title?: string;
    titleWrap?: string;
  };
  sx?: {
    root?: SxProps<Theme>;
    title?: SxProps<Theme>;
  };
  title?: string | JSX.Element;
  titleVariant?: Variant;
  withSlider?: boolean;
  titleLineHeight?: string;
  titleColor?: string;
  titleAlign?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
  topRight?: JSX.Element;
}

interface StyleProps {
  withSlider: boolean;
  topRight: boolean;
  titleLineHeight?: string;
  titleColor?: string;
  titleAlign?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
}

const Root = styled(Box, {
  name: 'RegenSection',
  shouldForwardProp: prop => prop !== 'sx' && prop !== 'withSlider',
})<{ withSlider: boolean }>(({ theme, withSlider }) => ({
  maxWidth: theme.breakpoints.values.lg,
  margin: '0 auto',
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(22.25),
  },
  [theme.breakpoints.up('md')]: {
    paddingRight: theme.spacing(37.5),
    paddingLeft: theme.spacing(37.5),
  },
  [theme.breakpoints.down('md')]: {
    paddingRight: theme.spacing(10),
    paddingLeft: theme.spacing(10),
  },
  [theme.breakpoints.down('sm')]: {
    paddingRight: withSlider ? 0 : theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingTop: theme.spacing(17.75),
  },
  [theme.breakpoints.up('xl')]: {
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
  },
}));

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  title: props => ({
    color: props.titleColor || 'inherit',
    lineHeight: props.titleLineHeight || '140%',
    textAlign: props.titleAlign || (props.topRight ? 'left' : 'center'),
    [theme.breakpoints.down('sm')]: {
      paddingRight: props.withSlider ? theme.spacing(4) : 0,
    },
  }),
  titleText: {
    flex: 2,
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
}));

const Section = ({
  children,
  classes,
  className,
  sx,
  titleLineHeight,
  titleColor,
  titleVariant = 'h2',
  titleAlign = 'center',
  title,
  topRight,
  withSlider = false,
}: SectionProps): JSX.Element => {
  const styles = useStyles({
    withSlider,
    titleLineHeight,
    titleAlign,
    titleColor,
    topRight: !!topRight,
  });
  return (
    <Root
      sx={sx?.root}
      component="section"
      withSlider={withSlider}
      className={className || (classes && classes.root)}
    >
      {title && (
        <div
          className={clsx(
            classes && classes.titleWrap,
            topRight && styles.spaceBetween,
          )}
        >
          <Title
            as="div"
            sx={sx?.title}
            className={clsx(styles.title, classes && classes.title)}
            variant={titleVariant}
            align={titleAlign}
          >
            {parseText(title)}
          </Title>
          {titleAlign === 'left' && topRight}
        </div>
      )}
      {children}
    </Root>
  );
};

export default Section;
