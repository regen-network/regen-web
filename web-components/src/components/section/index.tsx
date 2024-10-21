import { ReactNode } from 'react';
import { Box, styled, SxProps } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import ReactHtmlParser from 'html-react-parser';
import { makeStyles } from 'tss-react/mui';

import { Theme } from '../../theme/muiTheme';
import { parseText } from '../../utils/textParser';
import { BlockContent } from '../block-content';
import { Body, Title } from '../typography';

export interface SectionProps {
  children?: any;
  headerChildren?: ReactNode;
  className?: string;
  id?: string;
  classes?: {
    root?: string;
    title?: string;
    titleWrap?: string;
    description?: string;
  };
  sx?: {
    root?: SxProps<Theme>;
    title?: SxProps<Theme>;
    description?: SxProps<Theme>;
  };
  title?: string | JSX.Element;
  titleVariant?: Variant;
  description?: string | JSX.Element;
  withSlider?: boolean;
  isPaddingTopMobile?: boolean;
  titleLineHeight?: string;
  titleColor?: string;
  titleAlign?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
  topRight?: JSX.Element;
  visibleOverflow?: boolean;
}

interface StyleProps {
  withSlider?: boolean;
  topRight: boolean;
  titleLineHeight?: string;
  titleColor?: string;
  titleAlign?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
}

export const Root = styled(Box, {
  name: 'RegenSection',
  shouldForwardProp: prop =>
    prop !== 'withSlider' &&
    prop !== 'visibleOverflow' &&
    prop !== 'isPaddingTopMobile',
})<{
  withSlider?: boolean;
  visibleOverflow?: boolean;
  isPaddingTopMobile?: boolean;
}>(
  ({
    theme,
    withSlider = false,
    visibleOverflow = false,
    isPaddingTopMobile = true,
  }) => ({
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    [theme.breakpoints.up('lg')]: {
      overflow: visibleOverflow ? 'visible' : 'hidden',
    },
    [theme.breakpoints.down('lg')]: {
      overflow: 'hidden',
    },
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
      paddingTop: isPaddingTopMobile ? theme.spacing(17.75) : 0,
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
  }),
);

const useStyles = makeStyles<StyleProps>()(
  (
    theme,
    { topRight, withSlider, titleAlign, titleColor, titleLineHeight },
  ) => ({
    title: {
      color: titleColor || 'inherit',
      lineHeight: titleLineHeight || '140%',
      textAlign: titleAlign || (topRight ? 'left' : 'center'),
      [theme.breakpoints.down('sm')]: {
        paddingRight: withSlider ? theme.spacing(4) : 0,
      },
    },
    titleText: {
      flex: 2,
    },
    spaceBetween: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
  }),
);

const Section = ({
  children,
  headerChildren,
  classes,
  className,
  id,
  sx,
  titleLineHeight,
  titleColor,
  titleVariant = 'h2',
  titleAlign = 'center',
  title,
  description,
  topRight,
  withSlider = false,
  visibleOverflow = false,
  isPaddingTopMobile = true,
}: SectionProps): JSX.Element => {
  const { classes: styles, cx } = useStyles({
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
      visibleOverflow={visibleOverflow}
      isPaddingTopMobile={isPaddingTopMobile}
      className={className || (classes && classes.root)}
      id={id}
    >
      {title && (
        <div
          className={cx(
            classes && classes.titleWrap,
            topRight && styles.spaceBetween,
          )}
        >
          <Title
            as="div"
            sx={sx?.title}
            className={cx(styles.title, classes && classes.title)}
            variant={titleVariant}
            align={titleAlign}
          >
            {parseText(title)}
          </Title>
          {titleAlign === 'left' && topRight}
          {description && (
            <Body
              size="xl"
              mobileSize="lg"
              as="p"
              pt={[3.25, 7.75]}
              textAlign="center"
              sx={sx?.description}
              className={classes?.description}
            >
              {typeof description === 'string' ? (
                ReactHtmlParser(description)
              ) : (
                <BlockContent content={description} />
              )}
            </Body>
          )}
          {headerChildren && headerChildren}
        </div>
      )}
      {children}
    </Root>
  );
};

export default Section;
