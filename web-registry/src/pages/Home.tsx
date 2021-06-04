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
  title: {
    marginBottom: theme.spacing(8.75),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(8),
    },
  },
  // creditClassCards: {
  //   marginTop: theme.spacing(4.75),
  // },
  projectCards: {
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      marginLeft: theme.spacing(-8), // MUI Grid spacing in our `section` component with padding prevents scrolling all the way over. This presents d
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(-4),
    },
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
        <Section title="Projects" classes={{ root: styles.section, title: styles.title }}>
          <ProjectCards projects={projects} classes={{ root: styles.projectCards }} />
        </Section>
      </CardMedia>

      <Section
        title="Credit Classes"
        titleAlign="left"
        classes={{ root: styles.section, title: styles.title }}
      >
        <CreditClassCards
          btnText="Learn More"
          // classes={{ root: styles.creditClassCards }}
          justify={isMobile ? 'center' : 'flex-start'}
          creditClasses={[creditClasses[0]]}
          // creditClasses={creditClasses} // TODO: Right now we are only displaying carbonPlus grasslands, but eventually we should display all classes
          onClickCard={handleCardSelect}
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
