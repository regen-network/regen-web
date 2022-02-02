import React, { useState } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import CardMedia from '@mui/material/CardMedia';
import useMediaQuery from '@mui/material/useMediaQuery';

import Section from 'web-components/lib/components/section';
import Modal from 'web-components/lib/components/modal';
import { HeroTitle, HeroAction } from '../components/molecules';
import {
  ProjectCards,
  CreditClassCards,
  CreditBatches,
} from '../components/organisms';
import { creditClasses } from '../mocks';

import cowsImg from '../assets/cows-by-barn.png';
import topographyImg from '../assets/background.jpg';
import horsesImg from '../assets/horses-grazing.png';

import { useMoreProjectsQuery } from '../generated/graphql';
import {
  useAllHomePageQuery,
  useAllCreditClassQuery,
} from '../generated/sanity-graphql';
import { client } from '../sanity';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  topSectionDescription: {
    maxWidth: theme.spacing(165),
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(22.25),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(17.75),
    },
  },
  title: {
    marginBottom: theme.spacing(8.75),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(8),
    },
  },
  projectCards: {
    [theme.breakpoints.down('md')]: {
      width: '100vw',
      marginLeft: theme.spacing(-8),
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(-4),
    },
  },
  bottomSectionWidth: {
    maxWidth: theme.spacing(175),
  },
  bottomSection: {
    display: 'flex',
    justifyContent: 'center',
  },
  modal: {
    padding: 0,
    overflow: 'hidden',
  },
}));

const Home: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [modalLink, setModalLink] = useState<string>('');

  const styles = useStyles();
  const theme = useTheme();

  const { data } = useAllHomePageQuery({ client });
  const { data: creditClassData } = useAllCreditClassQuery({ client });
  const content = data?.allHomePage?.[0];
  const creditClassesContent = creditClassData?.allCreditClass;
  const { data: projectsData } = useMoreProjectsQuery();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className={styles.root}>
      <HeroTitle
        isBanner
        img={cowsImg}
        title={content?.heroSection?.title}
        descriptionRaw={content?.heroSection?.descriptionRaw}
        classes={{ description: styles.topSectionDescription }}
      />

      {projectsData?.allProjects?.nodes && (
        <Section
          title="Projects"
          titleAlign="left"
          classes={{ root: styles.section, title: styles.title }}
        >
          <ProjectCards
            projects={projectsData?.allProjects?.nodes}
            classes={{ root: styles.projectCards }}
          />
        </Section>
      )}

      <CardMedia image={topographyImg}>
        <CreditBatches />
      </CardMedia>

      <Section
        title="Credit Classes"
        titleAlign="left"
        classes={{ root: styles.section, title: styles.title }}
      >
        <CreditClassCards
          btnText="Learn More"
          justifyContent={isMobile ? 'center' : 'flex-start'}
          creditClasses={creditClasses} // mock/db data
          creditClassesContent={creditClassesContent} // CMS data
        />
      </Section>

      <HeroAction
        isBanner
        classes={{
          main: styles.bottomSectionWidth,
          section: styles.bottomSection,
        }}
        img={horsesImg}
        openModal={(href: string): void => {
          setModalLink(href);
          setOpen(true);
        }}
        bottomBanner={content?.bottomBanner}
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={styles.modal}
      >
        <iframe title="airtable-signup-form" src={modalLink} />
      </Modal>
    </div>
  );
};

export { Home };
