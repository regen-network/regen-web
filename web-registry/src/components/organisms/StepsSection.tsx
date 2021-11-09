import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import cx from 'clsx';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import Modal from 'web-components/lib/components/modal';
import Description from 'web-components/lib/components/description';
import Title from 'web-components/lib/components/title';
import { BlockContent } from 'web-components/lib/components/block-content';

import {
  StepCardFieldsFragment,
  Maybe,
  Scalars,
} from '../../generated/sanity-graphql';
import { WrappedStepCard } from '../atoms';

type Props = {
  className?: string;
  title?: Maybe<string>;
  preTitle?: Maybe<string>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  stepCards?: Maybe<Array<Maybe<StepCardFieldsFragment>>>;
};

const useStyles = makeStyles((theme: Theme) => ({
  stepSection: {
    paddingTop: 0,
    background: theme.palette.primary.main,
  },
  titleWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(24, 0, 8),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(15, 0, 7.5),
    },
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(38),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
  preTitle: {
    color: theme.palette.secondary.main,
    fontWeight: 800,
    textTransform: 'uppercase',
    fontFamily: theme.typography.h1.fontFamily,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(18),
      margin: theme.spacing(8, 0, 6),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(14),
      marginBottom: theme.spacing(4),
    },
  },
  description: {
    marginBottom: 0,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  steps: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(199.75),
    },
  },
  modal: {
    padding: 0,
    overflow: 'hidden',
  },
}));

function StepsSection({
  className,
  stepCards,
  title,
  preTitle,
  descriptionRaw,
}: Props): JSX.Element {
  const styles = useStyles();
  const [modalIframeLink, setModalIframeLink] = useState<string>('');

  return (
    <OnBoardingSection
      title={''}
      classes={{
        root: cx(styles.stepSection, className),
      }}
    >
      <div className={styles.titleWrap}>
        {preTitle && <div className={styles.preTitle}>{preTitle}</div>}
        {title && <Title className={styles.sectionTitle}>{title}</Title>}
        {descriptionRaw && (
          <Description className={styles.description}>
            <BlockContent content={descriptionRaw} />
          </Description>
        )}
      </div>
      <div className={styles.steps}>
        {stepCards?.map((card, i) => (
          <WrappedStepCard
            key={i}
            stepNumber={i}
            stepCard={card}
            openModal={setModalIframeLink}
          />
        ))}
      </div>
      <Modal
        open={!!modalIframeLink}
        onClose={() => setModalIframeLink('')}
        className={styles.modal}
      >
        <iframe title="modal-iframe-link" src={modalIframeLink} />
      </Modal>
    </OnBoardingSection>
  );
}

export { StepsSection };
