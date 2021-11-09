import * as React from 'react';
import TitleDescription from 'web-components/lib/components/description';

export default {
  title: 'TitleDescription',
  component: TitleDescription,
};

const titleText: string = 'Measuring Ecological Health';
const descriptionText: string =
  'Regen Network is empowering an open community of scientists to build and deploy cutting edge methodologies to measure ecological health and make scientifically robust claims.<br>Earth observation science, landscape ecology, and our ability to understand complex ecological systems is undergoing a technological revolution. Regen Network in the vanguard of this movement to make climate science available to the people and markets who need it most. Join us in service of better decision-making, better markets, and collective action on climate.';

export const description = (): JSX.Element => (
  <TitleDescription
    title={titleText}
    description={descriptionText}
  ></TitleDescription>
);
