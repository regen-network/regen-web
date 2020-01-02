import * as React from 'react';
import Credits, { CreditsProps } from 'web-components/lib/components/credits';
import Gauge from 'web-components/lib/components/credits/Gauge';
import GaugeText from 'web-components/lib/components/credits/GaugeText';

const credit: CreditsProps = {
  numberOfHolders: 1021,
  numberOfProjects: 25,
  amount: 70000,
  totalAmount: 93211,
};

export default {
  title: 'Components|Credits',
  component: Credits,
};

export const creditsWithGauge = (): JSX.Element => (
  <Credits
    numberOfHolders={credit.numberOfHolders}
    numberOfProjects={credit.numberOfProjects}
    amount={credit.amount}
    totalAmount={credit.totalAmount}
  />
);

export const gauge = (): JSX.Element => (
  <Gauge
    amount={credit.amount}
    totalAmount={credit.totalAmount}
  />
);

export const formattedText = (): JSX.Element => (
  <GaugeText
    number={credit.totalAmount}
    label="credits issued"
    format
  />
);

export const smallText = (): JSX.Element => (
  <GaugeText
    number={credit.numberOfProjects}
    label="projects"
    variant="body2"
  />
);
