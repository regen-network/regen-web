import * as React from 'react';
import {
  TitleDescription,
  LabeledNumber,
  LabeledDetail,
} from 'web-components/lib/components/text-layouts';

export default {
  title: 'Text Layouts',
  component: TitleDescription,
};

const titleText: string = 'Measuring Ecological Health';
const descriptionText: string =
  'Regen Network is empowering an open community of scientists to build and deploy cutting edge methodologies to measure ecological health and make scientifically robust claims.<br>Earth observation science, landscape ecology, and our ability to understand complex ecological systems is undergoing a technological revolution. Regen Network in the vanguard of this movement to make climate science available to the people and markets who need it most. Join us in service of better decision-making, better markets, and collective action on climate.';

export const titleDescription = (): JSX.Element => (
  <TitleDescription title={titleText} description={descriptionText} />
);

export const labeledNumber = (): JSX.Element => (
  <LabeledNumber label={'Label'} number={1234} />
);

export const labeledDetail = (): JSX.Element => (
  <LabeledDetail label={'Label'}>
    <div style={{ fontSize: 16, fontWeight: 'bold' }}>
      anything rendered as a child shows underneath
    </div>
  </LabeledDetail>
);
