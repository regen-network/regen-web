import React, { useEffect, useState } from 'react';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { makeStyles } from 'tss-react/mui';

import { Step, StepCard } from 'web-components/src/components/cards/StepCard';
import { QuestionItem } from 'web-components/src/components/faq/Question';
import AccountabilityIcon from 'web-components/src/components/icons/AccountabilityIcon';
import FarmerIcon from 'web-components/src/components/icons/FarmerIcon';
import InterfaceIcon from 'web-components/src/components/icons/InterfaceIcon';
import RegistrationIcon from 'web-components/src/components/icons/RegistrationIcon';
import ReviewIcon from 'web-components/src/components/icons/ReviewIcon';
import ShadedCreditsIcon from 'web-components/src/components/icons/ShadedCreditsIcon';
import TrustDocumentIcon from 'web-components/src/components/icons/TrustDocumentIcon';
import TrustIcon from 'web-components/src/components/icons/TrustIcon';
import OnBoardingSection from 'web-components/src/components/section/OnBoardingSection';
import { Theme } from 'web-components/src/theme/muiTheme';

import { TranslatorType } from 'lib/i18n/i18n.types';

const useStyles = makeStyles()((theme: Theme) => ({
  content: {
    paddingTop: theme.spacing(12),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(7),
    },
  },
  interfaceIcon: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
  reviewIcon: {
    width: theme.spacing(23.285),
    height: theme.spacing(23.675),
    marginTop: theme.spacing(3.5),
    marginLeft: theme.spacing(3.5),
  },
  trustDocumentIcon: {
    width: theme.spacing(14.855),
    height: theme.spacing(18.75),
  },
  registrationIcon: {
    width: theme.spacing(25),
    height: theme.spacing(18.5175),
  },
  accountabilityIcon: {
    width: theme.spacing(26.5),
    height: theme.spacing(26.5),
    marginTop: theme.spacing(1),
  },
  farmerIcon: {
    width: theme.spacing(17.5),
    height: theme.spacing(15.75),
  },
  trustIcon: {
    width: theme.spacing(20.4975),
    height: theme.spacing(23.3225),
  },
  creditsIcon: {
    width: theme.spacing(22.475),
    height: theme.spacing(24.64),
    marginTop: theme.spacing(1.75),
    marginRight: theme.spacing(1.75),
  },
}));

// TODO: move copy to mocks.json and query.  See issue #538
const getQuestionItems = (_: TranslatorType): QuestionItem[] => [
  {
    question: _(msg`How do I implement the land management practices?`),
    answer: _(
      msg`you just do. you just do. you just do. ok okok okok okookok ABC123 okokokok ok. you just do. you just do. you just do.`,
    ),
  },
  {
    question: _(msg`Lorem ipsum dolor sit apsicing sit amut?`),
    answer: _(
      msg`you just do. you just do. you just do. ok okok okok okookok ABC123 okokokok ok. you just do. you just do. you just do.`,
    ),
  },
  {
    question: _(msg`How do i so and so?`),
    answer: _(
      msg`you just do. you just do. you just do. ok okok okok okookok ABC123 okokokok ok. you just do. you just do. you just do. you just do. you just do. you just do. ok okok okok okookok ABC123 okokokok ok. you just do. you just do. you just do. you just do. you just do. you just do. ok okok okok okookok ABC123 okokokok ok. you just do. you just do. you just do.`,
    ),
  },
  {
    question: _(msg`How do i so and so again?`),
    answer: _(
      msg`you just do. you just do. you just do. ok okok okok okookok ABC123 okokokok ok. you just do. you just do. you just do.`,
    ),
  },
];

const getSteps = (_: TranslatorType): Step[] => [
  {
    stepNumber: 1,
    title: _(msg`Fill out a project plan`),
    tagName: _(msg`immediate`),
    isActive: true,
    description: _(
      msg`This project plan includes all the details about your monitoring, management practices, and more.`,
    ),
    faqs: [],
  },
  {
    stepNumber: 2,
    title: _(msg`Review and Submit`),
    tagName: _(msg`immediate`),
    isActive: true,
    description: _(
      msg`Review your project plan to make sure all entries are correct.`,
    ),
  },
  {
    stepNumber: 3,
    title: _(msg`Sign a contract and project officially starts`),
    tagName: _(msg`immediate`),
    isActive: true,
    description: (
      <Trans>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut.{' '}
          <a
            href="https://regen.network"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read full documentation»
          </a>
        </span>
        '
      </Trans>
    ),
    faqs: getQuestionItems(_),
  },
  {
    stepNumber: 4,
    title: _(msg`Create a project page`),
    tagName: _(msg`immediate`),
    isActive: false,
    description: _(
      msg`This marketing page help advertise your project to potential buyers.`,
    ),
  },
  {
    stepNumber: 5,
    title: _(
      msg`Hire a monitor to establish a baseline measurement and additional monitoring rounds (if applicable)`,
    ),
    tagName: _(msg`within 60 days`),
    isActive: false,
    description: (
      <span>
        <Trans>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut.{' '}
          <a
            href="https://regen.network"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read full documentation»
          </a>
        </Trans>
      </span>
    ),
    faqs: getQuestionItems(_),
  },
  {
    stepNumber: 6,
    title: _(msg`Implement land management`),
    tagName: _(msg`within 3 months`),
    isActive: false,
    description: (
      <span>
        <Trans>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut.{' '}
          <a
            href="https://regen.network"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read full documentation»
          </a>
        </Trans>
      </span>
    ),
    faqs: getQuestionItems(_),
    videoSrc: 'https://www.youtube.com/embed/Eh19aQ1dd7c',
  },
  {
    stepNumber: 7,
    title: _(msg`Hire a verifier as needed given the verification schedule`),
    tagName: _(msg`within 6 months`),
    isActive: false,
    description: (
      <span>
        <Trans>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut.{' '}
          <a
            href="https://regen.network"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read full documentation»
          </a>
        </Trans>
      </span>
    ),
    faqs: getQuestionItems(_),
  },
  {
    stepNumber: 8,
    title: _(msg`Hire a broker or sell through Regen Network`),
    tagName: 'variable',
    description: (
      <span>
        <Trans>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut.{' '}
          <a
            href="https://regen.network"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read full documentation»
          </a>
        </Trans>
      </span>
    ),
    faqs: getQuestionItems(_),
  },
];

const GettingStarted: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { classes } = useStyles();
  const [stepsMap, setStepsMap] = useState<any>({});
  const { _ } = useLingui();

  useEffect(() => {
    const indexedSteps = Object.assign(
      {},
      ...getSteps(_).map(x => ({ [x.stepNumber]: x })),
    );
    setStepsMap(indexedSteps);
  }, [_]);

  return (
    <OnBoardingSection formContainer title={_(msg`Getting Started`)}>
      <div className={classes.content}>
        <StepCard
          step={stepsMap['1']}
          icon={<InterfaceIcon className={classes.interfaceIcon} />}
        />
        <StepCard
          step={stepsMap['2']}
          icon={<ReviewIcon className={classes.reviewIcon} />}
        />
        <StepCard
          step={stepsMap['3']}
          icon={<TrustDocumentIcon className={classes.trustDocumentIcon} />}
        />
        <StepCard
          step={stepsMap['4']}
          icon={<RegistrationIcon className={classes.registrationIcon} />}
        />
        <StepCard
          step={stepsMap['5']}
          icon={<AccountabilityIcon className={classes.accountabilityIcon} />}
        />
        <StepCard
          step={stepsMap['6']}
          icon={<FarmerIcon className={classes.farmerIcon} />}
        />
        <StepCard
          step={stepsMap['7']}
          icon={<TrustIcon className={classes.trustIcon} />}
        />
        <StepCard
          step={stepsMap['8']}
          icon={<ShadedCreditsIcon className={classes.creditsIcon} />}
        />
      </div>
    </OnBoardingSection>
  );
};

export { GettingStarted };
