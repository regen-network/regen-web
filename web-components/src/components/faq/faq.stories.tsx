import * as React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Question from 'web-components/lib/components/faq/Question';

export default {
  title: 'Components|FAQ',
  component: Question,
  decorators: [withKnobs],
};

export const question = (): JSX.Element => (
  <Question
    question={text('question', 'Am I a test question?')}
    answer={text('answer', '<b>Yes</b>, I am.')}
  />
);
