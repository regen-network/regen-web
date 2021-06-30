import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

import Section from 'web-components/lib/components/section';
import { StepCard, Step } from 'web-components/lib/components/cards/StepCard';
import ImpactCard from 'web-components/lib/components/cards/ImpactCard';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import ResourcesCard from 'web-components/lib/components/cards/ResourcesCard';
import FixedFooter from 'web-components/lib/components/fixed-footer';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Modal from 'web-components/lib/components/modal';

import { HeroTitle, HeroAction } from '../components/molecules';
import { StepCardsWithDescription } from '../components/organisms';
import { outcomes, resources, contentByPage } from '../mocks';

import fernImg from '../assets/fern-in-hands.png';
import writingOnPaperImg from '../assets/writing-on-paper.png';
import topographyImg from '../assets/topography-pattern-full-1.png';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
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
  topSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  topSectionCards: {
    maxWidth: theme.typography.pxToRem(942),
  },
  outcomeSection: {
    paddingTop: 0,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(20),
    },
  },
  resourcesSection: {
    background: theme.palette.grey[50],
    borderTop: `1px solid ${theme.palette.grey[100]}`,
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(22.25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(17.75),
    },
  },
  methodologyTitle: {
    marginBottom: theme.spacing(8.75),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(8),
      fontSize: theme.typography.pxToRem(32),
      lineHeight: theme.typography.pxToRem(41.6),
    },
  },
  bottomSection: {
    maxWidth: theme.typography.pxToRem(946),
    paddingBottom: theme.typography.pxToRem(100),
  },
  resourcesTitle: {
    textTransform: 'none',
    color: theme.palette.text.primary,
    fontWeight: 900,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
  resourcesRoot: {
    paddingTop: 0,
  },
  modal: {
    padding: 0,
    overflow: 'hidden',
  },
}));

type StepCard = {
  icon: JSX.Element;
  step: Step;
};

const openLink = (url: string): void => void window.open(url, '_blank', 'noopener');

const CreateCreditClass: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const {
    stepCardSection,
    bottomBanner,
    creditTypeSection,
    outcomeSection,
    heroSection,
    footerLink,
  } = contentByPage.CreateCreditClass;

  const outcomeCards = outcomes.map(({ imgSrc, title, description }) => (
    <ImpactCard name={title} imgSrc={imgSrc} description={description} largeFontSize />
  ));

  const stepCards: StepCard[] = stepCardSection.stepCards.map(
    ({ icon, title, btnText, href, description, isActive, stepNumber, faqs, tagName }) => ({
      icon: <img src={require(`../assets/${icon}`)} alt={title} />,
      step: {
        stepNumber,
        faqs,
        tagName,
        isActive,
        title,
        description,
        btnText,
        onBtnClick: href ? (href === 'MODAL' ? () => setOpen(true) : () => openLink(href)) : undefined,
      },
    }),
  );

  return (
    <div className={styles.root}>
      <HeroTitle
        isBanner
        img={writingOnPaperImg}
        title={heroSection.title}
        description={heroSection.description}
        classes={{ main: styles.heroMain }}
      />

      <Section
        title={stepCardSection.title}
        classes={{ root: styles.topSection, title: styles.methodologyTitle }}
      >
        <StepCardsWithDescription
          className={styles.topSectionCards}
          stepCards={stepCards}
          description={stepCardSection.mainDescription}
        />
      </Section>

      <Section withSlider className={styles.outcomeSection}>
        <ResponsiveSlider
          itemWidth="90%"
          padding={theme.spacing(2.5)}
          title="Ecological outcomes"
          arrows={outcomes?.length > 3}
          slidesToShow={3}
          items={outcomeCards}
        />
      </Section>

      <CardMedia image={topographyImg} className={styles.resourcesSection}>
        <Section withSlider titleAlign="left">
          <ResponsiveSlider
            itemWidth="90%"
            classes={{ title: styles.resourcesTitle, root: styles.resourcesRoot }}
            padding={theme.spacing(2.5)}
            title="Resources"
            titleVariant="h2"
            arrows={resources?.length > 3}
            slidesToShow={3}
            items={resources.map(({ btnText, description, href, imgSrc, lastUpdated, title }) => (
              <ResourcesCard
                image={{ publicURL: require(`../assets/${imgSrc}`) }}
                title={title}
                updated={lastUpdated}
                description={description}
                buttonText={btnText}
                link={href.startsWith('http') ? href : require(`../assets/${href}`)}
              />
            ))}
          />
        </Section>
      </CardMedia>

      <HeroAction
        classes={{ main: styles.bottomSection }}
        img={fernImg}
        title={bottomBanner.title}
        description={bottomBanner.description}
        actionTxt={bottomBanner.btnText}
        action={() => history.push(bottomBanner.href)}
      />
      <FixedFooter justify="flex-end">
        <ContainedButton onClick={() => setOpen(true)}>Submit a methodology</ContainedButton>
      </FixedFooter>
      <Modal open={open} onClose={() => setOpen(false)} className={styles.modal}>
        <iframe title="airtable-signup-form" src={footerLink} />
      </Modal>
    </div>
  );
};

export { CreateCreditClass };
