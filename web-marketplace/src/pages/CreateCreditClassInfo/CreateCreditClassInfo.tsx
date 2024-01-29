import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

import { BlockContent } from 'web-components/src/components/block-content';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import FixedFooter from 'web-components/src/components/fixed-footer';
import Modal from 'web-components/src/components/modal';
import Section from 'web-components/src/components/section';
import ResponsiveSlider from 'web-components/src/components/sliders/ResponsiveSlider';
import { Body, Title } from 'web-components/src/components/typography';

import { useAllCreateCreditClassPageQuery } from 'generated/sanity-graphql';
import { client } from 'lib/clients/sanity';

import { WrappedImpactCard, WrappedResourcesCard } from 'components/atoms';
import { HeroAction, HeroTitle, OverviewCards } from 'components/molecules';
import { StepCardsWithDescription } from 'components/organisms';

import { useCreditClassInfoStyles } from './CreditClassInfo.styles';

import fernImg from 'assets/fern-in-hands.png';
import topographyImg from 'assets/topography-pattern-cutout-1.png';
import writingOnPaperImg from 'assets/writing-on-paper.png';

const CreateCreditClassInfo: React.FC<React.PropsWithChildren<unknown>> =
  () => {
    const { classes } = useCreditClassInfoStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [modalLink, setModalLink] = useState<string | undefined>();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

    const { data } = useAllCreateCreditClassPageQuery({ client });
    const content = data?.allCreateCreditClassPage?.[0];

    const openModal = (href?: string | null): void => {
      setModalLink(href || undefined);
      setOpen(true);
    };

    const outcomeCards = content?.outcomes?.map((outcome, i) => (
      <WrappedImpactCard key={i} outcome={outcome} />
    ));

    const SubtitleAndDescription: React.FC<
      React.PropsWithChildren<{
        title: string;
        descriptionRaw: string;
        align?: 'left' | 'center';
      }>
    > = props => {
      const align = props.align || (isMobile ? 'left' : 'center');
      return (
        <Grid container justifyContent="center">
          <Box maxWidth={theme.typography.pxToRem(948)}>
            <Title align={align} variant="h3">
              {props.title}
            </Title>
            <Box pt={[5, 7]}>
              <Body as="div" size="xl" align={align}>
                <BlockContent content={props.descriptionRaw} />
              </Body>
            </Box>
          </Box>
        </Grid>
      );
    };

    const OverviewWrap: React.FC<React.PropsWithChildren<unknown>> = ({
      children,
    }) => (
      <Box mt={[8, 12]} mx={[-1.5, 'auto']}>
        {children}
      </Box>
    );

    const resourceCardsShown = isDesktop ? 3 : 2;

    return (
      <div className={classes.root}>
        <HeroTitle
          isBanner
          img={writingOnPaperImg}
          title={content?.heroSection?.title}
          descriptionRaw={content?.heroSection?.descriptionRaw}
          classes={{ main: classes.heroMain }}
        />

        <Section
          title={content?.stepCardSection?.title || ''}
          classes={{ root: classes.padBottom, title: classes.sectionTitle }}
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

        <CardMedia image={topographyImg} className={classes.topoSection}>
          <Section
            title={content?.creditTypeSection?.title || ''}
            titleAlign={isMobile ? 'left' : 'center'}
            classes={{ root: classes.padBottom, title: classes.sectionTitle }}
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
                descriptionRaw={
                  content?.creditTypeSection?.descriptionBottomRaw
                }
              />
              <OverviewWrap>
                <OverviewCards
                  cards={content?.creditTypeSection?.flexCreditCards}
                />
              </OverviewWrap>
            </Box>
          </Section>
        </CardMedia>

        <Section className={classes.padBottom}>
          <SubtitleAndDescription
            align="center"
            title={content?.outcomeSection?.title || ''}
            descriptionRaw={content?.outcomeSection?.descriptionRaw}
          />
          <ResponsiveSlider
            mobileItemWidth="90%"
            padding={theme.spacing(2.5)}
            title="Ecological outcomes"
            arrows={content?.outcomes ? content.outcomes.length > 3 : false}
            slidesToShow={3}
            items={outcomeCards}
          />
        </Section>

        <CardMedia image={topographyImg} className={classes.topoSection}>
          <Section withSlider className={classes.padBottom}>
            <ResponsiveSlider
              infinite={false}
              mobileItemWidth="90%"
              classes={{
                title: classes.resourcesTitle,
                root: classes.resourcesRoot,
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
              items={content?.resources?.map((resource, i) => (
                <WrappedResourcesCard key={i} resource={resource} />
              ))}
            />
          </Section>
        </CardMedia>

        <HeroAction
          isBanner
          classes={{ main: classes.bottomSection }}
          img={fernImg}
          bottomBanner={content?.bottomBanner}
          openModal={openModal}
        />
        <FixedFooter justifyContent="flex-end">
          <ContainedButton onClick={() => openModal(content?.footerLink)}>
            Submit a Credit Class
          </ContainedButton>
        </FixedFooter>
        <Modal open={open} onClose={() => setOpen(false)} isIFrame>
          <iframe title="airtable-signup-form" src={modalLink} />
        </Modal>
      </div>
    );
  };

export { CreateCreditClassInfo };
