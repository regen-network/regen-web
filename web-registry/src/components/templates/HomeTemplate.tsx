import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Title from 'web-components/lib/components/title';

import { HeroTitle, HeroAction } from '../molecules';
import { Project, BasicCreditClass } from '../../mocks';
import { CreditClassCards, ProjectCards } from '../organisms';
import Section from 'web-components/lib/components/section';

type Props = {
  creditClasses: BasicCreditClass[];
  topImg: string;
  topSectionTitle: string;
  topSectionDescription: string;
  projectBackgroundImg: string;
  projects: Project[];
  bottomBackgroundImg: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  topSectionDescription: {
    maxWidth: theme.spacing(165),
  },
  projectBackground: {
    backgroundColor: theme.palette.grey[50],
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(22.25, 5.75),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(17.75, 5.75),
    },
  },
  creditClasses: {
    marginTop: theme.spacing(4),
  },
  bottomSection: {
    maxWidth: theme.spacing(175),
  },
}));

const HomeTemplate: React.FC<Props> = p => {
  const styles = useStyles();

  function handleCardSelect(card: BasicCreditClass): void {
    console.log('TODO: handle card click :>> ', card); // eslint-disable-line
  }

  const isMobile = useMediaQuery('xs');

  return (
    <>
      <HeroTitle
        img={p.topImg}
        title={p.topSectionTitle}
        description={p.topSectionDescription}
        classes={{ description: styles.topSectionDescription }}
        maxWidth="lg"
      />

      {/* <CardMedia image={p.projectBackgroundImg} className={styles.projectBackground}>
        <Container maxWidth="lg" className={styles.section}>
          <Title align="center" variant="h2">
            Projects
          </Title>
          <ProjectCards projects={p.projects} />
        </Container>
      </CardMedia> */}

      <CardMedia image={p.projectBackgroundImg} className={styles.projectBackground}>
        <Section title="Projects" titleAlign="left">
          <ProjectCards projects={p.projects} />
        </Section>
      </CardMedia>

      <Container maxWidth="lg" className={styles.section}>
        <Title align="left" variant="h2">
          Credit Classes
        </Title>
        <CreditClassCards
          justify={isMobile ? 'center' : 'flex-start'}
          creditClasses={p.creditClasses}
          onClickCard={handleCardSelect}
          classes={{ root: styles.creditClasses }}
        />
      </Container>

      <HeroAction
        classes={{ main: styles.bottomSection }}
        img={p.bottomBackgroundImg}
        title="Want to get paid for your ecological practices?"
        actionTxt="Register a Project"
        action={() => console.log('TODO: Register a project')}
      />
    </>
  );
};

export { HomeTemplate };
