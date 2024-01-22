import React from 'react';
import { Box } from '@mui/material';
import type { Variant } from '@mui/material/styles/createTypography';
import clsx from 'clsx';
import { StaticImageData } from 'next/image';

import { Body, Title } from 'web-components/src/components/typography';

import { BackgroundImage } from '../BackgroundImage/BackgroundImage';
import { useBackgroundSectionStyles } from './BackgroundSection.styles';

interface Props {
  className?: string;
  titleClassName?: string;
  titleVariant?: Variant;
  body?: React.ReactNode;
  header?: React.ReactNode;
  linearGradient?: string;
  linearGradientMobile?: string;
  children?: React.ReactNode;
  imageSrc: string | StaticImageData;
  topSection?: boolean;
}

const BackgroundSection = ({
  className,
  titleClassName,
  titleVariant = 'h1',
  imageSrc,
  linearGradient,
  linearGradientMobile,
  body,
  header,
  children,
  topSection = true,
}: Props): JSX.Element => {
  const { classes } = useBackgroundSectionStyles({
    titleVariant,
    linearGradientMobile,
    linearGradient,
    topSection,
  });
  let headerJSX: JSX.Element | null = null;
  let bodyJSX: JSX.Element | null = null;
  let textJSX: JSX.Element | null = null;
  // Tried to use && operator, but it doesn't seem to play nicely with passing in dynamic props to the object
  if (header) {
    headerJSX = (
      <Title
        as="div"
        color="primary"
        variant={titleVariant}
        className={titleClassName}
      >
        {header}
      </Title>
    );
  }
  if (body) {
    bodyJSX = (
      <Body as="div" size="xl" sx={{ color: 'primary.main', pt: [3, 3.75] }}>
        {body}
      </Body>
    );
  }
  if (body || header) {
    textJSX = (
      <div className={classes.text}>
        {headerJSX}
        {bodyJSX}
      </div>
    );
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <BackgroundImage
        component="section"
        className={clsx(className, classes.root)}
        src={imageSrc}
      >
        <>
          {textJSX}
          <div className={classes.children}>{children}</div>
        </>
      </BackgroundImage>
      {linearGradient !== 'unset' && (
        <div className={classes.backgroundGradient} />
      )}
    </Box>
  );
};

export default BackgroundSection;
