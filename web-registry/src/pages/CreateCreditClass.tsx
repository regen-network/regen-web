import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Section from 'web-components/lib/components/section';

import { StepCard, Step } from 'web-components/lib/components/cards/StepCard';
import ImpactCard from 'web-components/lib/components/cards/ImpactCard';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import ResourcesCard from 'web-components/lib/components/cards/ResourcesCard';
import FixedFooter from 'web-components/lib/components/fixed-footer';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Modal from 'web-components/lib/components/modal';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';

import { HeroTitle, HeroAction, OverviewCards } from '../components/molecules';
import { StepCardsWithDescription } from '../components/organisms';
import { outcomes, resources, contentByPage } from '../mocks';

import fernImg from '../assets/fern-in-hands.png';
import writingOnPaperImg from '../assets/writing-on-paper.png';
import topographyImg from '../assets/topography-pattern-cutout-1.png';

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
  padBottom: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(20),
    },
  },
  topoSection: {
    background: theme.palette.grey[50],
    borderTop: `1px solid ${theme.palette.grey[100]}`,
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
  sectionTitle: {
    [theme.breakpoints.down('xs')]: {
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
  description: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(22),
      lineHeight: theme.typography.pxToRem(33),
    },
    [theme.breakpoints.down('xs')]: {
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
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

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

  const SubtitleAndDescription: React.FC<{
    title: string;
    description: string;
    align?: 'left' | 'center';
  }> = props => {
    const align = props.align || (isMobile ? 'left' : 'center');
    return (
      <Grid container justify="center">
        <Box maxWidth={theme.typography.pxToRem(948)}>
          <Title align={align} variant="h3">
            {props.title}
          </Title>
          <Box pt={[5, 7]}>
            <Description className={styles.description} align={align}>
              {props.description}
            </Description>
          </Box>
        </Box>
      </Grid>
    );
  };

  const OverviewWrap: React.FC = ({ children }) => (
    <Box mt={[8, 12]} mx={[-1.5, 'auto']}>
      {children}
    </Box>
  );

  const resourceCardsShown = isDesktop ? 3 : 2;

  return (
    <div className={styles.root}>
      <HeroTitle
        isBanner
        img={writingOnPaperImg}
        title={heroSection.title}
        description={heroSection.description}
        classes={{ main: styles.heroMain }}
      />

      <Section title={stepCardSection.title} classes={{ root: styles.padBottom, title: styles.sectionTitle }}>
        <Box display={['block', 'flex']} justifyContent="center">
          <Box maxWidth={theme.typography.pxToRem(942)} mt={[6, 8.75]} mx={[-1, 'inherit']}>
            <StepCardsWithDescription stepCards={stepCards} description={stepCardSection.mainDescription} />
          </Box>
        </Box>
      </Section>

      <CardMedia image={topographyImg} className={styles.topoSection}>
        <Section
          title={creditTypeSection.title}
          titleAlign={isMobile ? 'left' : 'center'}
          classes={{ root: styles.padBottom, title: styles.sectionTitle }}
        >
          <Box mt={[8, 16]}>
            <SubtitleAndDescription
              title={creditTypeSection.subtitleTop}
              description={creditTypeSection.descriptionTop}
            />
            <OverviewWrap>
              <OverviewCards cards={creditTypeSection.institutionalCards} />
            </OverviewWrap>
          </Box>
          <Box mt={[15, 22]} pb={[4, 8]}>
            <SubtitleAndDescription
              title={creditTypeSection.subtitleBottom}
              description={creditTypeSection.descriptionBottom}
            />
            <OverviewWrap>
              <OverviewCards cards={creditTypeSection.flexCreditCards} />
            </OverviewWrap>
          </Box>
        </Section>
      </CardMedia>

      <Section className={styles.padBottom}>
        <SubtitleAndDescription
          align="center"
          title={outcomeSection.title}
          description={outcomeSection.description}
        />
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
        <Section withSlider className={styles.padBottom}>
          <ResponsiveSlider
            infinite={false}
            itemWidth="90%"
            classes={{ title: styles.resourcesTitle, root: styles.resourcesRoot }}
            padding={theme.spacing(2.5)}
            title="Resources"
            titleVariant="h2"
            arrows={resources?.length > resourceCardsShown}
            slidesToShow={resourceCardsShown}
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
        isBanner
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
