import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import cx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Section from 'web-components/lib/components/section';
import { StepCard, Step } from 'web-components/lib/components/cards/StepCard';
import { OverviewCard } from 'web-components/lib/components/cards/OverviewCard';
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
import topographyImg from '../assets/topography-pattern-cutout-1.png';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';

const useStyles = makeStyles(theme => ({
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
  sectionPadBottom: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(20),
    },
  },
  outcomeSection: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  topoSection: {
    background: theme.palette.grey[50],
    borderTop: `1px solid ${theme.palette.grey[100]}`,
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
  sectionTitle: {
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
  cardWrap: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'wrap',
      justifyContent: 'center',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.typography.pxToRem(109),
    },
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'nowrap',
      overflow: 'scroll',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.typography.pxToRem(64),
    },
  },
  overviewCard: {
    margin: theme.spacing(2),
  },
  modal: {
    padding: 0,
    overflow: 'hidden',
  },
  maxW948: {
    maxWidth: theme.typography.pxToRem(948),
    margin: '0 auto',
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(7, 0),
      fontSize: theme.typography.pxToRem(22),
      lineHeight: theme.typography.pxToRem(33),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(5, 0),
      fontSize: theme.typography.pxToRem(18),
      lineHeight: theme.typography.pxToRem(27),
    },
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
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

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
        classes={{ root: cx(styles.topSection, styles.sectionPadBottom), title: styles.sectionTitle }}
      >
        <StepCardsWithDescription
          className={styles.topSectionCards}
          stepCards={stepCards}
          description={stepCardSection.mainDescription}
        />
      </Section>

      <CardMedia image={topographyImg} className={styles.topoSection}>
        <Section
          title={creditTypeSection.title}
          titleAlign={isMobile ? 'left' : 'center'}
          classes={{ title: styles.sectionTitle }}
        >
          <Title align={isMobile ? 'left' : 'center'} variant="h3">
            {creditTypeSection.subtitleTop}
          </Title>
          <Description
            align={isMobile ? 'left' : 'center'}
            className={cx(styles.description, styles.maxW948)}
          >
            {creditTypeSection.descriptionTop}
          </Description>
          <div className={styles.cardWrap}>
            {creditTypeSection.institutionalCards.map((card, i) => (
              <OverviewCard
                key={i}
                className={styles.overviewCard}
                icon={<img src={require(`../assets/${card.icon}`)} alt={card.description} />}
                item={{ title: card.title, description: card.description }}
              />
            ))}
          </div>
          <Title align={isMobile ? 'left' : 'center'} variant="h3">
            {creditTypeSection.subtitleBottom}
          </Title>
          <Description
            align={isMobile ? 'left' : 'center'}
            className={cx(styles.description, styles.maxW948)}
          >
            {creditTypeSection.descriptionBottom}
          </Description>
          <div className={styles.cardWrap}>
            {creditTypeSection.flexCreditCards.map((card, i) => (
              <OverviewCard
                key={i}
                className={styles.overviewCard}
                icon={<img src={require(`../assets/${card.icon}`)} alt={card.description} />}
                item={{ title: card.title, description: card.description }}
              />
            ))}
          </div>
        </Section>
      </CardMedia>

      <Section withSlider className={cx(styles.sectionPadBottom, styles.outcomeSection)}>
        <Title align="center" variant="h3" className={styles.maxW948}>
          {outcomeSection.title}
        </Title>
        <Description align="center" className={cx(styles.description, styles.maxW948)}>
          {outcomeSection.description}
        </Description>
        <ResponsiveSlider
          itemWidth="90%"
          padding={theme.spacing(2.5)}
          title="Ecological outcomes"
          arrows={outcomes?.length > 3}
          slidesToShow={3}
          items={outcomeCards}
        />
      </Section>

      <CardMedia image={topographyImg} className={styles.topoSection}>
        <Section withSlider className={styles.sectionPadBottom}>
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
        <ContainedButton onClick={() => setOpen(true)}>Submit a Credit Class</ContainedButton>
      </FixedFooter>
      <Modal open={open} onClose={() => setOpen(false)} className={styles.modal}>
        <iframe title="airtable-signup-form" src={footerLink} />
      </Modal>
    </div>
  );
};

export { CreateCreditClass };
