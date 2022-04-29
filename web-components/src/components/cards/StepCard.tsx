import React from 'react';
import { makeStyles, DefaultTheme as Theme, useTheme } from '@mui/styles';
import { Box, CardMedia } from '@mui/material';
import cx from 'clsx';

import Card from '../cards/Card';
import ArrowFilledIcon from '../icons/ArrowFilledIcon';
import StepCircleBadge from '../icons/StepCircleBadge';
import { Body, Label, Title } from '../typography';
import Tag from '../tag';
import StepFAQs from '../faq/StepFAQs';
import { Image } from '../image';
import { QuestionItem } from '../faq/Question';
import ContainedButton from '../buttons/ContainedButton';

export interface StepCardProps {
  className?: string;
  icon?: JSX.Element;
  step?: Step;
  apiServerUrl?: string;
  imageStorageBaseUrl?: string;
}

export interface Step {
  tagName?: string | null;
  title: string;
  description?: string | JSX.Element;
  faqs?: QuestionItem[];
  imageSrc?: string | null;
  videoSrc?: string | null;
  imageAlt?: string;
  isActive?: boolean;
  stepNumber: number | string;
  btnText?: string | null;
  onBtnClick?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    '&:last-child': {
      '& .down-arrow': {
        display: 'none',
        visibility: 'hidden',
      },
    },
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    borderColor: theme.palette.grey[100],
    margin: theme.spacing(3, 0),
    backgroundColor: theme.palette.info.light, // (inactive color by default)
  },
  activeCard: {
    backgroundColor: theme.palette.primary.main,
  },
  cardTop: {
    display: 'flex',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(12),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(4),
    },
  },
  cardTopThird: {
    display: 'flex',
    flex: 1,
  },
  cardTopCenter: {
    justifyContent: 'center',
  },
  cardTopRight: {
    alignItems: 'flex-start',
  },
  tag: {
    marginLeft: 'auto',
    marginTop: theme.spacing(2),
    marginRight: 0,
    borderRadius: 0,
    fontSize: theme.spacing(3),
  },
  media: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(81),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
      height: theme.spacing(55),
    },
  },
  imageWrap: {
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(105.25),
    },
  },
  image: {
    height: '100%',
    width: '100%',
  },
}));

const fallbackStep: Step = {
  stepNumber: 404,
  title: 'Not found',
  tagName: 'Not found',
  isActive: false,
  description: 'Please set up content for this step number',
  faqs: [],
};

function StepCard({
  className,
  icon,
  step = fallbackStep,
  imageStorageBaseUrl,
  apiServerUrl,
}: StepCardProps): JSX.Element {
  const styles = useStyles();
  const theme = useTheme();
  return (
    <div className={styles.root}>
      <Card
        className={cx(
          className,
          styles.card,
          step.isActive && styles.activeCard,
        )}
      >
        {step.videoSrc && (
          <CardMedia
            className={styles.media}
            component="iframe"
            src={step.videoSrc}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        {step.imageSrc && (
          <div className={cx(styles.media, styles.imageWrap)}>
            <Image
              backgroundImage
              className={styles.image}
              src={step.imageSrc}
              alt={step?.imageAlt}
              imageStorageBaseUrl={imageStorageBaseUrl}
              apiServerUrl={apiServerUrl}
            />
          </div>
        )}
        <div className={styles.cardTop}>
          <div className={styles.cardTopThird}></div>
          {icon && (
            <div className={cx(styles.cardTopThird, styles.cardTopCenter)}>
              <StepCircleBadge icon={icon} isActive={step.isActive} />
            </div>
          )}
          <div className={cx(styles.cardTopThird, styles.cardTopRight)}>
            {step.tagName && (
              <Tag
                className={styles.tag}
                name={step.tagName}
                color={theme.palette.secondary.main}
              />
            )}
          </div>
        </div>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            pt: 3.5,
            pb: [3.5, 8],
            px: [4, 6],
            gap: [2, 3],
          }}
        >
          <Label
            size="sm"
            mobileSize="sm"
            color={step.isActive ? 'secondary.main' : 'info.dark'}
          >
            step {step.stepNumber}
          </Label>
          <Title
            variant="h4"
            mobileVariant="h6"
            align="center"
            color={step.isActive ? 'primary.contrastText' : 'info.dark'}
          >
            {step.title}
          </Title>
          <Body size="lg" align="center" color="info.dark">
            {step.description}
          </Body>
          {!!step.btnText && !!step.onBtnClick && (
            <ContainedButton
              size="large"
              onClick={step.onBtnClick}
              sx={{ mt: 3, mb: 5 }}
            >
              {step.btnText}
            </ContainedButton>
          )}
        </Box>
        {step.faqs && step.faqs.length > 0 && (
          <StepFAQs questionItems={step.faqs} isActive={step.isActive} />
        )}
      </Card>
      <ArrowFilledIcon className="down-arrow" color={theme.palette.info.main} />
    </div>
  );
}

export { StepCard };
