import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import cx from 'clsx';

import Card from '../cards/Card';
import ArrowFilledIcon from '../icons/ArrowFilledIcon';
import StepCircleBadge from '../icons/StepCircleBadge';
import Title from '../title';
import Description from '../description';
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
  btn: {
    margin: theme.spacing(3, 0, 5),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(14),
      padding: theme.spacing(2, 8),
    },
  },
  cardTop: {
    display: 'flex',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(12),
    [theme.breakpoints.down('xs')]: {
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
    maxWidth: theme.spacing(22),
  },
  cardBottom: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: theme.spacing(3.5, 8, 6),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3.5, 3.5, 4),
    },
  },
  step: {
    color: theme.palette.info.main,
    fontWeight: 800,
    textTransform: 'uppercase',
    fontSize: theme.spacing(3.5),
  },
  activeColor: {
    color: theme.palette.secondary.main,
  },
  stepTitle: {
    color: theme.palette.info.dark,
    padding: theme.spacing(3.5, 0),
    textAlign: 'center',
    lineHeight: '145%',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4.5),
    },
  },
  activeTitle: {
    color: theme.palette.primary.contrastText,
  },
  stepDescription: {
    textAlign: 'center',
    color: theme.palette.info.dark,
    fontSize: theme.spacing(4.5),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
  },
  media: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(81),
    },
    [theme.breakpoints.down('xs')]: {
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
        <div className={styles.cardBottom}>
          <Title
            variant="h6"
            className={cx(styles.step, step.isActive && styles.activeColor)}
          >
            step {step.stepNumber}
          </Title>
          <Title
            variant="h4"
            className={cx(
              styles.stepTitle,
              step.isActive && styles.activeTitle,
            )}
          >
            {step.title}
          </Title>
          <Description className={styles.stepDescription}>
            {step.description}
          </Description>
          {!!step.btnText && !!step.onBtnClick && (
            <ContainedButton onClick={step.onBtnClick} className={styles.btn}>
              {step.btnText}
            </ContainedButton>
          )}
        </div>
        {step.faqs && step.faqs.length > 0 && (
          <StepFAQs questionItems={step.faqs} isActive={step.isActive} />
        )}
      </Card>
      <ArrowFilledIcon className="down-arrow" color={theme.palette.info.main} />
    </div>
  );
}

export { StepCard };
