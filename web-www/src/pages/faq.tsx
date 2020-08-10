import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import ReactHtmlParser from 'react-html-parser';

import Section from '../components/Section';

const FAQ = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      text: faqYaml {
        header
        categories {
          name
          questions {
            question
            answer
          }
        }
      }
    }
  `);
  const categories = data.text.categories;

  return (
    <Section title={data.text.header}>
      {categories.map((c, i) => (
        <div key={`${c.name}-${i}`}>
          {c.name}
          {c.questions.map((q, j) => (
            <div key={`${i}-${j}`}>
              <p>{q.question}</p>
              {ReactHtmlParser(q.answer)}
            </div>
          ))}
        </div>
      ))}
    </Section>
  );
};

export default FAQ;
