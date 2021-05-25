import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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

const HomeTemplate: React.FC<Props> = p => {
  const styles = useStyles();
  const theme = useTheme();

  function handleCardSelect(card: BasicCreditClass): void {
    console.log('TODO: handle card click :>> ', card); // eslint-disable-line
  }

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <HeroTitle
        img={p.topImg}
        title={p.topSectionTitle}
        description={p.topSectionDescription}
        classes={{ description: styles.topSectionDescription }}
        maxWidth="lg"
      />

      <CardMedia image={p.projectBackgroundImg}>
        <Section title="Projects" classes={{ root: styles.section }}>
          <ProjectCards projects={p.projects} />
        </Section>
      </CardMedia>

      <Section title="Credit Classes" titleAlign="left" classes={{ root: styles.section }}>
        <CreditClassCards
          justify={isMobile ? 'center' : 'flex-start'}
          creditClasses={p.creditClasses}
          onClickCard={handleCardSelect}
          classes={{ root: styles.creditClasses }}
        />
      </Section>

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
