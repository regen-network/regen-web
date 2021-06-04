import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Section from 'web-components/lib/components/section';
import { HeroTitle, HeroAction } from '../components/molecules';
import { ProjectCards, CreditClassCards } from '../components/organisms';
import { projects, creditClasses, BasicCreditClass } from '../mocks';

import cowsImg from '../assets/cows-by-barn.png';
import topographyImg from '../assets/background.jpg';
import horsesImg from '../assets/horses-grazing.png';

const useStyles = makeStyles((theme: Theme) => ({
  topSectionDescription: {
    maxWidth: theme.spacing(165),
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(22.25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(17.75),
    },
  },
  creditClasses: {
    margin: theme.spacing(4.75, 0),
  },
  bottomSection: {
    maxWidth: theme.spacing(175),
  },
}));

const Home: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme();

  function handleCardSelect(card: BasicCreditClass): void {
    console.log('TODO: handle card click :>> ', card); // eslint-disable-line
  }

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <HeroTitle
        img={cowsImg}
        title="Welcome to Regen Registry"
        description="Regen Registry is lrem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn."
        classes={{ description: styles.topSectionDescription }}
      />

      <CardMedia image={topographyImg}>
        <Section title="Projects" classes={{ root: styles.section }}>
          <ProjectCards projects={projects} />
        </Section>
      </CardMedia>

      <Section title="Credit Classes" titleAlign="left" classes={{ root: styles.section }}>
        <CreditClassCards
          btnText="Learn More"
          justify={isMobile ? 'center' : 'flex-start'}
          creditClasses={creditClasses}
          onClickCard={handleCardSelect}
          classes={{ root: styles.creditClasses }}
        />
      </Section>

      <HeroAction
        classes={{ main: styles.bottomSection }}
        img={horsesImg}
        title="Want to get paid for your ecological practices?"
        actionTxt="Register a Project"
        action={() => console.log('TODO: Register a project')}
      />
    </>
  );
};

export { Home };
