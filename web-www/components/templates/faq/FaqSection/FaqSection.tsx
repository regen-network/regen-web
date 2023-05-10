import { useEffect, useState } from 'react';

import FAQ, { FAQProps } from 'web-components/lib/components/faq';
import Section from 'web-components/lib/components/section';

import { useFaqStyles } from './FaqSection.styles';

interface Props extends FAQProps {
  navigate: (path: string) => void;
}

export const FaqSection = ({ categories, header, navigate }: Props) => {
  const { classes } = useFaqStyles();

  const [questionId, setQuestionId] = useState<string | undefined>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.substr(1);
      if (hash) {
        setQuestionId(hash);
      }
    }
  }, []);

  return (
    <div className={classes.root}>
      <Section
        title="FAQ"
        titleVariant="h1"
        classes={{ title: classes.title }}
        className={classes.section}
      >
        <FAQ
          header={header}
          questionId={questionId}
          categories={categories}
          navigate={navigate}
        />
      </Section>
    </div>
  );
};
