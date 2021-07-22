import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import cx from 'clsx';
import ReactHtmlParser from 'react-html-parser';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import { Step, StepCardProps } from 'web-components/lib/components/cards/StepCard';
import Modal from 'web-components/lib/components/modal';

import { ProcessStepCard } from '../atoms/ProcessStepCard';
import Description from 'web-components/lib/components/description';
import Title from 'web-components/lib/components/title';

type Props = {
  className?: string;
  title?: string;
  preTitle?: string;
  description?: string;
  steps: Step[];
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

function StepsSection({ className, steps, title, preTitle, description }: Props): JSX.Element {
  const styles = useStyles();
  const [modalIframeLink, setModalIframeLink] = useState<string>('');

  const openLink = (url: string): void => void window.open(url, '_blank', 'noopener');

  const openModalLink = (modalLink: string): void => {
    const iframeLink = modalLink.replace('MODAL:', '');
    setModalIframeLink(iframeLink);
  };

  const stepCards: StepCardProps[] = steps.map(({ href, icon, ...props }) => ({
    icon: icon ? <img src={require(`../../assets/${icon}`)} alt={title} /> : <div />,
    step: {
      ...props,
      onBtnClick: href
        ? href.includes('MODAL')
          ? () => openModalLink(href)
          : () => openLink(href)
        : undefined,
    },
  }));

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
        {description && (
          <Description className={styles.description}>{ReactHtmlParser(description)}</Description>
        )}
      </div>
      <div className={styles.steps}>
        {stepCards.map(card => (
          <ProcessStepCard icon={card.icon} step={card.step} key={card.step?.stepNumber} />
        ))}
      </div>
      <Modal open={!!modalIframeLink} onClose={() => setModalIframeLink('')} className={styles.modal}>
        <iframe title="modal-iframe-link" src={modalIframeLink} />
      </Modal>
    </OnBoardingSection>
  );
}

export { StepsSection };
