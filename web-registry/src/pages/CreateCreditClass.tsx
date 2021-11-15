import React, { useState } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Section from 'web-components/lib/components/section';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import FixedFooter from 'web-components/lib/components/fixed-footer';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Modal from 'web-components/lib/components/modal';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import { BlockContent } from 'web-components/lib/components/block-content';

import { HeroTitle, HeroAction, OverviewCards } from '../components/molecules';
import { StepCardsWithDescription } from '../components/organisms';
import { WrappedImpactCard } from '../components/atoms';
import { WrappedResourcesCard } from '../components/atoms';

import fernImg from '../assets/fern-in-hands.png';
import writingOnPaperImg from '../assets/writing-on-paper.png';
import topographyImg from '../assets/topography-pattern-cutout-1.png';

import { useAllCreateCreditClassPageQuery } from '../generated/sanity-graphql';
import { client } from '../sanity';

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

const CreateCreditClass: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [modalLink, setModalLink] = useState<string | undefined>();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const { data } = useAllCreateCreditClassPageQuery({ client });
  const content = data?.allCreateCreditClassPage?.[0];

  const openModal = (href?: string | null): void => {
    setModalLink(href || undefined);
    setOpen(true);
  };

  const outcomeCards = content?.outcomes?.map(outcome => (
    <WrappedImpactCard outcome={outcome} />
  ));

  const SubtitleAndDescription: React.FC<{
    title: string;
    descriptionRaw: string;
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
              <BlockContent content={props.descriptionRaw} />
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
        title={content?.heroSection?.title}
        descriptionRaw={content?.heroSection?.descriptionRaw}
        classes={{ main: styles.heroMain }}
      />

      <Section
        title={content?.stepCardSection?.title || ''}
        classes={{ root: styles.padBottom, title: styles.sectionTitle }}
      >
        <Box display={['block', 'flex']} justifyContent="center">
          <Box
            maxWidth={theme.typography.pxToRem(942)}
            mt={[6, 8.75]}
            mx={[-1, 'inherit']}
          >
            <StepCardsWithDescription
              openModal={openModal}
              stepCards={content?.stepCardSection?.stepCards}
              descriptionRaw={content?.stepCardSection?.descriptionRaw}
            />
          </Box>
        </Box>
      </Section>

      <CardMedia image={topographyImg} className={styles.topoSection}>
        <Section
          title={content?.creditTypeSection?.title || ''}
          titleAlign={isMobile ? 'left' : 'center'}
          classes={{ root: styles.padBottom, title: styles.sectionTitle }}
        >
          <Box mt={[8, 16]}>
            <SubtitleAndDescription
              title={content?.creditTypeSection?.subtitleTop || ''}
              descriptionRaw={content?.creditTypeSection?.descriptionTopRaw}
            />
            <OverviewWrap>
              <OverviewCards
                cards={content?.creditTypeSection?.institutionalCards}
              />
            </OverviewWrap>
          </Box>
          <Box mt={[15, 22]} pb={[4, 8]}>
            <SubtitleAndDescription
              title={content?.creditTypeSection?.subtitleBottom || ''}
              descriptionRaw={content?.creditTypeSection?.descriptionBottomRaw}
            />
            <OverviewWrap>
              <OverviewCards
                cards={content?.creditTypeSection?.flexCreditCards}
              />
            </OverviewWrap>
          </Box>
        </Section>
      </CardMedia>

      <Section className={styles.padBottom}>
        <SubtitleAndDescription
          align="center"
          title={content?.outcomeSection?.title || ''}
          descriptionRaw={content?.outcomeSection?.descriptionRaw}
        />
        <ResponsiveSlider
          itemWidth="90%"
          padding={theme.spacing(2.5)}
          title="Ecological outcomes"
          arrows={content?.outcomes ? content.outcomes.length > 3 : false}
          slidesToShow={3}
          items={outcomeCards}
        />
      </Section>

      <CardMedia image={topographyImg} className={styles.topoSection}>
        <Section withSlider className={styles.padBottom}>
          <ResponsiveSlider
            infinite={false}
            itemWidth="90%"
            classes={{
              title: styles.resourcesTitle,
              root: styles.resourcesRoot,
            }}
            padding={theme.spacing(2.5)}
            title="Resources"
            titleVariant="h2"
            arrows={
              content?.resources
                ? content.resources.length > resourceCardsShown
                : false
            }
            slidesToShow={resourceCardsShown}
            items={content?.resources?.map(resource => (
              <WrappedResourcesCard resource={resource} />
            ))}
          />
        </Section>
      </CardMedia>

      <HeroAction
        isBanner
        classes={{ main: styles.bottomSection }}
        img={fernImg}
        bottomBanner={content?.bottomBanner}
        openModal={openModal}
      />
      <FixedFooter justify="flex-end">
        <ContainedButton onClick={() => openModal(content?.footerLink)}>
          Submit a Credit Class
        </ContainedButton>
      </FixedFooter>
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

export { CreateCreditClass };
