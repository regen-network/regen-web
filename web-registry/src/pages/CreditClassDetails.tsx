import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useParams, useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';
import cx from 'clsx';
import ReactHtmlParser from 'react-html-parser';

import Section from 'web-components/lib/components/section';
import Description from 'web-components/lib/components/description';
import Modal from 'web-components/lib/components/modal';
import Banner from 'web-components/lib/components/banner';
import MoreInfoForm from 'web-components/lib/components/form/MoreInfoForm';
import { SwitchFooter } from 'web-components/lib/components/fixed-footer/SwitchFooter';
import { StepSequence } from 'web-components/lib/components/cards/StepCard';

import mock from '../mocks/mock.json';
import { Project, creditClasses } from '../mocks';
import { HeroTitle } from '../components/molecules';
import {
  ImpactSection,
  ResourcesSection,
  StepsSection,
  MoreProjectsSection,
  MediaSection,
  CreditClassConnectSection,
  CreditClassOverviewSection,
} from '../components/organisms';
import hero from '../assets/credit-class-grasslands-hero.png';
import getApiUri from '../lib/apiUri';

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
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <CreditClassDetail isLandSteward={true} />
      </Route>
      <Route path={`${path}/buyer`}>
        <CreditClassDetail isLandSteward={false} />
      </Route>
      <Route path={`${path}/land-steward`}>
        <CreditClassDetail isLandSteward={true} />
      </Route>
    </Switch>
  );
}

function CreditClassDetail({ isLandSteward }: CreditDetailsProps): JSX.Element {
  const [modalIframeLink, setModalIframeLink] = useState<string>('');
  const [isBuyerModalOpen, setBuyerModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const styles = useStyles();
  const history = useHistory();

  let { creditClassId } = useParams<{ creditClassId: string }>();

  const creditClass = creditClasses.find(creditClass => creditClass.id === creditClassId);

  const getFeaturedProjects = (): JSX.Element => {
    const featuredProjects = mock?.projects.filter(project =>
      creditClass?.landSteward.featuredProjectIds.some((projectId: string) => projectId === project.id),
    );

    return featuredProjects?.length > 0 ? (
      <div className="topo-background-alternate">
        <MoreProjectsSection
          classes={{ root: styles.sectionPadding, title: styles.title }}
          title="Featured Projects"
          projects={featuredProjects}
        />
      </div>
    ) : (
      <></>
    );
  };

  const getAllProjects = (): JSX.Element => {
    const projects: Project[] = mock?.projects.filter(project => project?.creditClass?.id === creditClassId);

    return projects?.length > 0 ? (
      <div className="topo-background-alternate">
        <MoreProjectsSection
          classes={{ root: styles.sectionPadding, title: styles.title }}
          title={creditClass?.buyer?.projectsTitle}
          projects={projects}
        />
      </div>
    ) : (
      <></>
    );
  };

  const onCtaClick = (): void => {
    if (isLandSteward && creditClass) {
      return handleLink(creditClass.landSteward.ctaHref);
    } else {
      return setBuyerModalOpen(true);
    }
  };

  const handleLink = (link?: string): void => {
    if (!!link) return link.includes('MODAL') ? openModalLink(link) : openLink(link);
    return alert('Call to action not set!');
  };

  const openLink = (url: string): void => void window.open(url, '_blank', 'noopener');

  const openModalLink = (modalLink: string): void => {
    const iframeLink = modalLink.replace('MODAL:', '');
    setModalIframeLink(iframeLink);
  };

  const setContent = (): void => {
    history.push(`/credit-classes/${creditClassId}/${isLandSteward ? 'buyer' : 'land-steward'}`);
  };

  if (creditClass) {
    return (
      <div className={styles.root}>
        <HeroTitle
          isBanner
          img={hero}
          title={
            isLandSteward ? creditClass.landSteward.heroSection.title : creditClass.buyer.heroSection.title
          }
          description={
            isLandSteward
              ? creditClass.landSteward.heroSection.description
              : creditClass.buyer.heroSection.description
          }
          classes={{ main: styles.heroMain }}
        />
        <Section
          title={creditClass.name}
          classes={{ root: styles.introSection, title: styles.title, titleWrap: styles.titleWrap }}
        >
          <Description className={styles.sectionDescription}>
            {ReactHtmlParser(creditClass.description)}
          </Description>
        </Section>
        <div className="topo-background-alternate">
          {creditClass.impact && <ImpactSection title="Ecological Impact" impacts={creditClass.impact} />}
          {!isLandSteward && (
            <CreditClassOverviewSection className={styles.overviewSection} creditClass={creditClass} />
          )}
        </div>
        {isLandSteward && (
          <>
            {getFeaturedProjects()}
            <div className="topo-background-alternate">
              <CreditClassOverviewSection creditClass={creditClass} />
            </div>
          </>
        )}
        {!isLandSteward && getAllProjects()}
        {isLandSteward &&
          creditClass.landSteward?.steps?.map((stepSequence: StepSequence, index) => (
            <div className={cx('topo-background-alternate', styles.flex)} key={index}>
              <StepsSection
                className={styles.stepsSection}
                title={stepSequence?.title}
                preTitle={stepSequence?.preTitle}
                description={stepSequence?.description}
                steps={stepSequence.steps}
              />
            </div>
          ))}
        <div className="topo-background-alternate">
          <MediaSection
            header="Videos"
            items={isLandSteward ? creditClass.landSteward?.videos : creditClass.buyer?.videos}
          />
        </div>
        <div className="topo-background-alternate">
          <ResourcesSection
            resources={isLandSteward ? creditClass.landSteward.resources : creditClass.buyer.resources}
          />
        </div>
        {isLandSteward && <CreditClassConnectSection creditClass={creditClass} />}
        <SwitchFooter
          activeOption={isLandSteward ? 'Land Steward' : 'Buyer'}
          buttonText={isLandSteward ? 'get started' : 'buy credits'}
          label="I am a:"
          leftOption="Land Steward"
          rightOption="Buyer"
          onCtaClick={onCtaClick}
          onToggleClick={setContent}
        />
        <Modal open={!!modalIframeLink} onClose={() => setModalIframeLink('')} className={styles.modal}>
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
