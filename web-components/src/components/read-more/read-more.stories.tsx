import * as React from 'react';
import ReadMore from 'web-components/lib/components/read-more';
import { withKnobs, text, number } from '@storybook/addon-knobs';

export default {
  title: 'Components|ReadMore',
  component: ReadMore,
  decorators: [withKnobs],
  
};

const readMoreText: string =
  'This property is a rare pocket of wetlands and woodlands located near ' +
  'the township of Menindee South Australia, nestled in between the Coorong ' +
  'national park and Lake Albert.\n\nAs one of the few remaining sections of ' +
  'privately owned remnant vegetation in the area, this represents a unique ' +
  'opportunity for long term preservation. The Coorong, Lake Alexandrina and ' +
  'Lake Albert Wetland is an international significant RAMSAR wetland ' +
  'ecosystems at the intersection of the Murray River and Southern Ocean.\n\n' +
  'This vital habitat comprises a unique mix of both freshwater and saltwater ' +
  'wetlands and coastal woodlands. The Coorong is the heart of the traditional ' +
  'lands of Ngarrindjeri people, who have hunted and camped on the Mt Sandy ' +
  'property for thousands of years.\n\n' +
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
  'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
  'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ' +
  'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse ' +
  'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat ' +
  'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export const readMore = (): JSX.Element => (
  <ReadMore maxLength={number('maxLength', 700)} restMinLength={number('restMinLength', 300)}>
    {text('Text', readMoreText)}
  </ReadMore>
);
