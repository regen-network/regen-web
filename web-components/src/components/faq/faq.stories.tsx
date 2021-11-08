import React from 'react';
import Question, { QuestionItem } from 'web-components/lib/components/faq/Question';
import Category from 'web-components/lib/components/faq/Category';
import Navigation from 'web-components/lib/components/faq/Navigation';
import FAQ from 'web-components/lib/components/faq';

export default {
  title: 'FAQ',
  component: Question,
};

const questions: QuestionItem[] = [
  {
    question: 'Why do you need a OK blockchain?',
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
    first={false}
    last={false}
    question={questions[0].question}
    answer={questions[0].answer}
    isShareable
  />
);

export const category = (): JSX.Element => <Category name={'tech'} questions={questions} />;

export const navigation = (): JSX.Element => (
  <Navigation
    onClick={(c: string) => {}}
    categories={['concept', 'regen registry', 'regen ledger', 'tech']}
  />
);

export const faq = (): JSX.Element => (
  <FAQ
    navigate={() => {}}
    categories={[
      {
        header: 'concept',
        questions,
      },
    ]}
  />
);
