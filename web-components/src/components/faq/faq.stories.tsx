import * as React from 'react';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';
import Question, { QuestionProps } from 'web-components/lib/components/faq/Question';
import Category from 'web-components/lib/components/faq/Category';
import Navigation from 'web-components/lib/components/faq/Navigation';

export default {
  title: 'Components|FAQ',
  component: Question,
  decorators: [withKnobs],
};

const questions: QuestionProps[] = [
  {
    question: 'Why do you need a blockchain?',
    answer:
      'The Regen Ledger provides the project three key elements, without which Regen Network’s promise to create a network dedicated to monitoring, verifying and contracting or paying for ecological',
  },
  {
    question: 'Why do you need a token?',
    answer:
      'The XRN token serves two key functions; to program the rules that make an ecological data commons and marketplace possible and to bring together a community of shared interest in service to strengthening and regenerating the living systems that we need to support life on earth.',
  },
];

export const question = (): JSX.Element => (
  <Question
    first={boolean('first', false)}
    last={boolean('last', false)}
    question={text('question', questions[0].question)}
    answer={text('answer', questions[0].answer)}
  />
);

export const category = (): JSX.Element => (
  <Category name={text('name', 'tech')} questions={object('questions', questions)} />
);

export const navigation = (): JSX.Element => (
  <Navigation
    selected={0}
    onClick={(c: number) => {}}
    categories={['concept', 'regen registry', 'regen ledger', 'tech']}
  />
);
