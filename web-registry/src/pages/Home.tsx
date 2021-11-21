import React, { useState } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Section from 'web-components/lib/components/section';
import Modal from 'web-components/lib/components/modal';
import { HeroTitle, HeroAction } from '../components/molecules';
import { ProjectCards, CreditClassCards } from '../components/organisms';
import { creditClasses } from '../mocks';

import cowsImg from '../assets/cows-by-barn.png';
import topographyImg from '../assets/background.jpg';
import horsesImg from '../assets/horses-grazing.png';

import { useMoreProjectsQuery } from '../generated/graphql';
import { useAllHomePageQuery, useAllCreditClassQuery } from '../generated/sanity-graphql';
import { client } from '../sanity';

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
  projectCards: {
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      marginLeft: theme.spacing(-8),
    },
    [theme.breakpoints.down('xs')]: {
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

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <HeroTitle
        isBanner
        img={cowsImg}
        title={content?.heroSection?.title}
        descriptionRaw={content?.heroSection?.descriptionRaw}
        classes={{ description: styles.topSectionDescription }}
      />

      {projectsData?.allProjects?.nodes && (
        <CardMedia image={topographyImg}>
          <Section title="Projects" classes={{ root: styles.section, title: styles.title }}>
            <ProjectCards
              projects={projectsData?.allProjects?.nodes}
              classes={{ root: styles.projectCards }}
            />
          </Section>
        </CardMedia>
      )}

      <Section
        title="Credit Classes"
        titleAlign="left"
        classes={{ root: styles.section, title: styles.title }}
      >
        <CreditClassCards
          btnText="Learn More"
          justify={isMobile ? 'center' : 'flex-start'}
          creditClasses={creditClasses} // mock/db data
          creditClassesContent={creditClassesContent} // CMS data
        />
      </Section>

      <HeroAction
        isBanner
        classes={{ main: styles.bottomSectionWidth, section: styles.bottomSection }}
        img={horsesImg}
        openModal={(href: string): void => {
          setModalLink(href);
          setOpen(true);
        }}
        bottomBanner={content?.bottomBanner}
      />

      <Modal open={open} onClose={() => setOpen(false)} className={styles.modal}>
        <iframe title="airtable-signup-form" src={modalLink} />
      </Modal>
    </>
  );
};

export { Home };
