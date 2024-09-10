import FAQ from './';
import Category from './Category';
import Navigation from './Navigation';
import Question, { QuestionItem } from './Question';

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
    copyText="copy question link"
    copySuccessText="Link copied to your clipboard"
  />
);

export const category = (): JSX.Element => (
  <Category
    name={'tech'}
    questions={questions}
    copyText="copy question link"
    copySuccessText="Link copied to your clipboard"
  />
);

export const navigation = (): JSX.Element => (
  <Navigation
    onClick={(c: string) => {}}
    categories={['concept', 'regen registry', 'regen ledger', 'tech']}
  />
);

export const faq = (): JSX.Element => (
  <FAQ
    navigate={() => {}}
    backText="back"
    categories={[
      {
        header: 'concept',
        questions,
      },
    ]}
    copyText="copy question link"
    copySuccessText="Link copied to your clipboard"
  />
);
