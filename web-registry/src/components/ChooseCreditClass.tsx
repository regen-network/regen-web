import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import ImageActionCard from 'web-components/lib/components/cards/ImageActionCard';
import Section from 'web-components/lib/components/section';
import { getImgSrc } from '../lib/imgSrc';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    margin: theme.spacing(4),
  },
  main: {
    marginTop: theme.spacing(8),
  },
}));

type CreditClass = {
  title: string;
  description: string;
  image: string;
};
const CREDIT_CLASSES: CreditClass[] = [
  {
    title: 'Grasslands',
    description:
      'This credit class is a built as a holistic credit that includes multiple ecological benefits: Carbon Sequestration and Net GHG reduction, increased animal welfare, ecosystem health, and soil health.',
    image: getImgSrc('credit-class-grasslands.png'),
  },
  {
    title: 'Forestry',
    description:
      'This credit class is a built as a holistic credit that includes multiple ecological benefits: Carbon Sequestration and Net GHG reduction, ecosystem health, and soil health.',
    image: getImgSrc('credit-class-forestry.png'),
  },
];

const ChooseCreditClass: React.FC = () => {
  const classes = useStyles();

  function handleSelection(cc: CreditClass): void {
    console.log('Selected credit class:  :>> ', cc); // eslint-disable-line no-console
  }

  return (
    <Section title="Choose a credit class">
      <Box display="flex" flexWrap="wrap" justifyContent="center" className={classes.main}>
        {CREDIT_CLASSES.map((c, i) => (
          <ImageActionCard
            key={i}
            className={classes.card}
            description={c.description}
            imgSrc={c.image}
            onClick={() => handleSelection(c)}
            title={() => (
              <>
                Carbon<i>Plus</i> {c.title}
              </>
            )}
          />
        ))}
      </Box>
    </Section>
  );
};

export default ChooseCreditClass;
