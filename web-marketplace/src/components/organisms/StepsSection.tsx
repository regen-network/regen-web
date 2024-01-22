import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { BlockContent } from 'web-components/src/components/block-content';
import Modal from 'web-components/src/components/modal';
import OnBoardingSection from 'web-components/src/components/section/OnBoardingSection';
import { Body, Label, Title } from 'web-components/src/components/typography';
import { Theme } from 'web-components/src/theme/muiTheme';

import {
  Maybe,
  Scalars,
  StepCardFieldsFragment,
} from '../../generated/sanity-graphql';
import { WrappedStepCard } from '../atoms';

type Props = {
  className?: string;
  title?: Maybe<string>;
  preTitle?: Maybe<string>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  stepCards?: Maybe<Array<Maybe<StepCardFieldsFragment>>>;
};

const useStyles = makeStyles()((theme: Theme) => ({
  stepSection: {
    paddingTop: 0,
  },
  titleWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(24, 0, 8),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(15, 0, 7.5),
    },
  },
  steps: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(199.75),
    },
  },
}));

function StepsSection({
  className,
  stepCards,
  title,
  preTitle,
  descriptionRaw,
}: Props): JSX.Element {
  const { classes: styles, cx } = useStyles();
  const [modalIframeLink, setModalIframeLink] = useState<string>('');

  return (
    <OnBoardingSection
      title={''}
      classes={{
        root: cx(styles.stepSection, className),
      }}
    >
      <div className={styles.titleWrap}>
        <Label
          size="sm"
          sx={theme => ({
            color: 'secondary.main',
            m: { xs: theme.spacing(0, 0, 4), sm: theme.spacing(8, 0, 6) },
          })}
        >
          {preTitle}
        </Label>
        {title && (
          <Title
            variant="h2"
            mobileVariant="h3"
            sx={{ mb: 2, textAlign: 'center' }}
          >
            {title}
          </Title>
        )}
        {descriptionRaw && (
          <Body as="div" size="lg" sx={{ mb: 0 }}>
            <BlockContent content={descriptionRaw} />
          </Body>
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
        isIFrame
      >
        <iframe title="modal-iframe-link" src={modalIframeLink} />
      </Modal>
    </OnBoardingSection>
  );
}

export { StepsSection };
