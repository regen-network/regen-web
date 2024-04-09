import { ReactNode } from 'react';
import { ClassNameMap, styled } from '@mui/material';
import cx from 'clsx';

import { DraftDocumentIcon } from '../../icons/DraftDocumentIcon';
import { Image } from '../../image';
import { Body, Label } from '../../typography';
import { DRAFT } from './MediaCard.constants';

type Props = {
  imageClassName?: string;
  classes: ClassNameMap<'image'>;
  imgSrc: string;
  imageStorageBaseUrl?: string;
  apiServerUrl?: string;
  backgroundGradient: boolean;
  tag?: string;
  children?: ReactNode;
  draft?: boolean;
};

const BackgroundGradient = styled('div')({
  height: '100%',
  zIndex: 0,
  position: 'absolute',
  bottom: 0,
  width: '100%',
  borderRadius: '9px 9px 0px 0px',
  background:
    'linear-gradient(180.28deg, rgba(0, 0, 0, 0) 65.91%, rgba(0, 0, 0, 0.6) 99.59%)',
});

export const MediaCardImage = ({
  apiServerUrl,
  backgroundGradient,
  classes,
  imageClassName,
  imageStorageBaseUrl,
  imgSrc,
  tag,
  children,
  draft,
}: Props): JSX.Element => (
  <Image
    className={cx(imageClassName, classes.image)}
    backgroundImage
    src={imgSrc}
    imageStorageBaseUrl={imageStorageBaseUrl}
    apiServerUrl={apiServerUrl}
  >
    {backgroundGradient && <BackgroundGradient />}
    {tag && (
      <Label
        sx={theme => ({
          position: 'absolute',
          bottom: theme.spacing(5),
          left: theme.spacing(5),
          py: 1.75,
          px: 3.75,
          color: 'primary.main',
          backgroundColor: 'secondary.main',
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.1)',
          borderRadius: '50px',
          textShadow: '0px 0px 2px rgba(0, 0, 0, 0.3)',
        })}
      >
        {tag}
      </Label>
    )}
    {draft && (
      <Body
        size="xs"
        className="flex items-center absolute bottom-20 right-20 bg-grey-0 rounded-[50px] px-10 py-[6px] border border-solid border-grey-300"
      >
        <DraftDocumentIcon />
        &nbsp;
        {DRAFT}
      </Body>
    )}
    {children}
  </Image>
);
