import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useParams, useNavigate, Routes, Route } from 'react-router-dom';
import cx from 'clsx';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import Description from 'web-components/lib/components/description';
import Modal from 'web-components/lib/components/modal';
import Banner from 'web-components/lib/components/banner';
import MoreInfoForm from 'web-components/lib/components/form/MoreInfoForm';
import { SwitchFooter } from 'web-components/lib/components/fixed-footer/SwitchFooter';
import { BlockContent } from 'web-components/lib/components/block-content';

import mock from '../mocks/mock.json';
import { HeroTitle } from '../components/molecules';
import {
  ImpactSection,
  ResourcesSection,
  StepsSection,
  MoreProjectsSection,
  MediaSection,
  // CreditClassConnectSection,
  CreditClassOverviewSection,
} from '../components/organisms';
import hero from '../assets/credit-class-grasslands-hero.png';
import getApiUri from '../lib/apiUri';
import { onBtnClick } from '../lib/button';
import { useMoreProjectsQuery } from '../generated/graphql';
import { useAllCreditClassQuery } from '../generated/sanity-graphql';
import { client } from '../sanity';

interface CreditDetailsProps {
  isLandSteward?: boolean;
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.primary.main,
  },
  heroMain: {
    maxWidth: theme.typography.pxToRem(744),
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(22),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(12),
    },
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
  titleWrap: {
    paddingBottom: theme.spacing(8),
  },
  introSection: {
    paddingBottom: theme.spacing(22.25),
  },
  overviewSection: {
    paddingTop: 0,
  },
  sectionPadding: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(30),
      paddingBottom: theme.spacing(30),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(20),
    },
  },
  sectionDescription: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(22),
      maxWidth: theme.typography.pxToRem(752),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  flex: {
    display: 'flex',
  },
  stepsSection: {
    background: 'transparent',
    [theme.breakpoints.between('xs', 'md')]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
}));

function CreditClassDetails(): JSX.Element {
  return (
    <Routes>
      <Route path="/*" element={<CreditClassDetail isLandSteward={true} />} />
      <Route
        path="buyer"
        element={<CreditClassDetail isLandSteward={false} />}
      />
      <Route
        path="land-steward"
        element={<CreditClassDetail isLandSteward={true} />}
      />
    </Routes>
  );
}

function CreditClassDetail({ isLandSteward }: CreditDetailsProps): JSX.Element {
  const [modalIframeLink, setModalIframeLink] = useState<string>('');
  const [isBuyerModalOpen, setBuyerModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const styles = useStyles();
  const navigate = useNavigate();

  let { creditClassId } = useParams();

  const { data } = useAllCreditClassQuery({ client });
  const content = data?.allCreditClass?.find(
    creditClass => creditClass.path === creditClassId,
  );
  const creditClass = mock?.creditClasses.find(
    creditClass => creditClass.id === creditClassId,
  );
  const { data: projectsData } = useMoreProjectsQuery();

  const getFeaturedProjects = (): JSX.Element => {
    const featuredProjects = projectsData?.allProjects?.nodes?.filter(project =>
      content?.landSteward?.featuredProjectIds?.some(
        projectId => projectId === project?.handle,
      ),
    );

    return featuredProjects && featuredProjects.length > 0 ? (
      <div className="topo-background-alternate">
        <MoreProjectsSection
          classes={{ root: styles.sectionPadding, title: styles.title }}
          title={content?.landSteward?.projectsTitle || 'Featured Projects'}
          projects={featuredProjects}
        />
      </div>
    ) : (
      <></>
    );
  };

  const getAllProjects = (): JSX.Element => {
    const projects = projectsData?.allProjects?.nodes?.filter(
      project =>
        project?.creditClassByCreditClassId?.uri === content?.iri?.current,
    );

    return projects && projects.length > 0 ? (
      <div className="topo-background-alternate">
        <MoreProjectsSection
          classes={{ root: styles.sectionPadding, title: styles.title }}
          title={content?.buyer?.projectsTitle || 'More Projects'}
          projects={projects}
        />
      </div>
    ) : (
      <></>
    );
  };

  const onCtaClick = (): void => {
    if (isLandSteward && content) {
      return onBtnClick(openModalLink, content?.landSteward?.ctaButton);
    } else {
      return setBuyerModalOpen(true);
    }
  };

  const openModalLink = (modalLink: string): void => {
    setModalIframeLink(modalLink);
  };

  const setContent = (): void => {
    navigate(
      `/credit-classes/${creditClassId}/${
        isLandSteward ? 'buyer' : 'land-steward'
      }`,
    );
  };

  if (creditClass) {
    return (
      <div className={styles.root}>
        <HeroTitle
          isBanner
          img={hero}
          title={
            isLandSteward
              ? content?.landSteward?.heroSection?.title
              : content?.buyer?.heroSection?.title
          }
          descriptionRaw={
            isLandSteward
              ? content?.landSteward?.heroSection?.descriptionRaw
              : content?.buyer?.heroSection?.descriptionRaw
          }
          classes={{ main: styles.heroMain }}
        />
        <Section
          title={
            content?.nameRaw ? <BlockContent content={content?.nameRaw} /> : ''
          }
          classes={{
            root: styles.introSection,
            title: styles.title,
            titleWrap: styles.titleWrap,
          }}
        >
          <Description className={styles.sectionDescription}>
            <BlockContent content={content?.descriptionRaw} />
          </Description>
        </Section>
        <div className="topo-background-alternate">
          {content?.ecologicalImpact && (
            <ImpactSection
              title="Ecological Impact"
              impacts={content?.ecologicalImpact}
            />
          )}
          {!isLandSteward && (
            <CreditClassOverviewSection
              className={styles.overviewSection}
              creditClass={creditClass}
              nameRaw={content?.nameRaw}
              overviewCards={content?.overviewCards}
              sdgs={content?.sdgs}
            />
          )}
        </div>
        {isLandSteward && (
          <>
            {getFeaturedProjects()}
            <div className="topo-background-alternate">
              <CreditClassOverviewSection
                creditClass={creditClass}
                nameRaw={content?.nameRaw}
                overviewCards={content?.overviewCards}
                sdgs={content?.sdgs}
              />
            </div>
          </>
        )}
        {!isLandSteward && getAllProjects()}
        {isLandSteward &&
          content?.landSteward?.steps?.map((stepSequence, index) => (
            <div
              className={cx('topo-background-alternate', styles.flex)}
              key={index}
            >
              <StepsSection
                className={styles.stepsSection}
                title={stepSequence?.title}
                preTitle={stepSequence?.preTitle}
                descriptionRaw={stepSequence?.descriptionRaw}
                stepCards={stepSequence?.stepCards}
              />
            </div>
          ))}
        <div className="topo-background-alternate">
          <MediaSection
            header="Videos"
            items={
              isLandSteward
                ? content?.landSteward?.videos
                : content?.buyer?.videos
            }
          />
        </div>
        <div className="topo-background-alternate">
          <ResourcesSection
            resources={
              isLandSteward
                ? content?.landSteward?.resources
                : content?.buyer?.resources
            }
          />
        </div>
        {/* {isLandSteward && <CreditClassConnectSection connectSection={content?.landSteward?.connectSection} />} TODO: hidden until resource is ready */}
        <SwitchFooter
          activeOption={isLandSteward ? 'Land Steward' : 'Buyer'}
          buttonText={
            isLandSteward
              ? content?.landSteward?.ctaButton?.buttonText || 'get started'
              : content?.buyer?.ctaButton?.buttonText || 'buy credits'
          }
          label="I am a:"
          leftOption="Land Steward"
          rightOption="Buyer"
          onCtaClick={onCtaClick}
          onToggleClick={setContent}
        />
        <Modal
          open={!!modalIframeLink}
          onClose={() => setModalIframeLink('')}
          className={styles.modal}
        >
          <iframe title="modal-iframe-link" src={modalIframeLink} />
        </Modal>
        <Modal open={isBuyerModalOpen} onClose={() => setBuyerModalOpen(false)}>
          <MoreInfoForm
            apiUrl={getApiUri()}
            onClose={() => setBuyerModalOpen(false)}
            onSubmit={() => {
              setBuyerModalOpen(false);
              setSubmitted(true);
            }}
          />
        </Modal>
        {submitted && <Banner text="Thanks for submitting your information!" />}
      </div>
    );
  } else {
    return <div>Credit Class not found</div>;
  }
}

export { CreditClassDetails };
