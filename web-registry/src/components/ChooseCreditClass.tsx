import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import ImageActionCard from 'web-components/lib/components/cards/ImageActionCard';
import Section from 'web-components/lib/components/section';
import { creditClasses, BasicCreditClass } from '../mocks';
import { getImgSrc } from '../lib/imgSrc';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '50vh',
  },
  card: {
    margin: theme.spacing(4),
  },
  main: {
    marginTop: theme.spacing(8),
  },
}));

const ChooseCreditClass: React.FC = () => {
  const classes = useStyles();

  function handleSelection(cc: BasicCreditClass): void {
    console.log('Selected credit class:  :>> ', cc); // eslint-disable-line no-console
  }

  return (
    <Section title="Choose a credit class" className={classes.root}>
      <Box display="flex" flexWrap="wrap" justifyContent="center" className={classes.main}>
        {creditClasses.map((c, i) => (
          <ImageActionCard
            key={i}
            className={classes.card}
            description={c.description}
            imgSrc={getImgSrc(c.imgSrc)}
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
