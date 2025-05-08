import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { makeStyles } from 'tss-react/mui';

import Banner from 'web-components/src/components/banner';
import { BlockContent } from 'web-components/src/components/block-content';
import { SwitchFooter } from 'web-components/src/components/fixed-footer/SwitchFooter';
import MoreInfoForm from 'web-components/src/components/form/MoreInfoForm';
import Modal from 'web-components/src/components/modal';
import Section from 'web-components/src/components/section';
import { Body } from 'web-components/src/components/typography';
import { Theme } from 'web-components/src/theme/muiTheme';

import { CreditClassByUriQuery } from 'generated/graphql';
import { CreditClass } from 'generated/sanity-graphql';
import { apiUri } from 'lib/apiUri';
import { onBtnClick } from 'lib/button';
import {
  INSUFFICIENT_CREDITS,
  INVALID_AMOUNT,
  INVALID_DECIMAL_COUNT,
  INVALID_EMAIL_MESSAGE,
  INVALID_MEMO_LENGTH,
  REQUIRED_MESSAGE,
} from 'lib/constants/shared.constants';
import { getMoreProjectsQuery } from 'lib/queries/react-query/registry-server/graphql/getMoreProjectsQuery/getMoreProjectsQuery';
import { useWallet } from 'lib/wallet/wallet';

import { HeroTitle } from 'components/molecules';
import {
  // CreditClassConnectSection,
  CreditClassOverviewSection,
  ImpactSection,
  MediaSection,
  MoreProjectsSection,
  ResourcesSection,
  StepsSection,
} from 'components/organisms';

import {
  CREDIT_CLASS_BUDGET_LABEL,
  CREDIT_CLASS_EMAIL_LABEL,
  CREDIT_CLASS_NAME_LABEL,
  CREDIT_CLASS_ON_BEHALF_OF_LABEL,
  CREDIT_CLASS_ON_BEHALF_OF_OPTIONS,
  CREDIT_CLASS_ORG_NAME_LABEL,
  CREDIT_CLASS_PROJECT_TYPES_LABEL,
  CREDIT_CLASS_PROTEC_TYPES_OPTIONS,
  CREDIT_CLASS_SUBMIT_ERROR_TEXT,
  CREDIT_CLASS_SUBMIT_LABEL,
  CREDIT_CLASS_TITLE,
  CREDIT_CLASS_USD_TEXT,
} from './CreditClassDetailsWithContent.constants';

import hero from 'assets/credit-class-grasslands-hero.png';

interface CreditDetailsProps {
  dbClass: CreditClassByUriQuery['creditClassByUri'];
  content: CreditClass;
  isLandSteward?: boolean;
}

const useStyles = makeStyles()((theme: Theme) => ({
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
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(12),
    },
  },
  title: {
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(20),
    },
  },
  flex: {
    display: 'flex',
  },
  stepsSection: {
    background: 'transparent',
    [theme.breakpoints.between('xs', 'lg')]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
}));

const CreditClassDetailsWithContent: React.FC<
  React.PropsWithChildren<CreditDetailsProps>
> = ({ dbClass, content, isLandSteward }) => {
  const { _ } = useLingui();
  const [modalIframeLink, setModalIframeLink] = useState<string>('');
  const [isBuyerModalOpen, setBuyerModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { classes: styles, cx } = useStyles();
  const navigate = useNavigate();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { isKeplrMobileWeb } = useWallet();

  const { creditClassId } = useParams();
  const { data: projectsData } = useQuery(
    getMoreProjectsQuery({
      client: graphqlClient,
    }),
  );

  const projectTypesOptions = useMemo(
    () =>
      CREDIT_CLASS_PROTEC_TYPES_OPTIONS.map(option => ({
        label: _(option.label),
        value: option.value,
      })),
    [_],
  );

  const onBehalfOfOptions = useMemo(
    () =>
      CREDIT_CLASS_ON_BEHALF_OF_OPTIONS.map(option => ({
        label: _(option.label),
        value: option.value,
      })),
    [_],
  );

  const getFeaturedProjects = (): JSX.Element => {
    const featuredProjects = projectsData?.allProjects?.nodes?.filter(project =>
      content.landSteward?.featuredProjectIds?.some(
        projectId => projectId === project?.slug,
      ),
    );

    return featuredProjects && featuredProjects?.length > 0 ? (
      <div
        className={cx('topo-background-alternate', isKeplrMobileWeb && 'dark')}
      >
        <MoreProjectsSection
          classes={{
            root: styles.sectionPadding,
            title: styles.title,
          }}
          title={
            content.landSteward?.projectsTitle || _(msg`Featured Projects`)
          }
          projects={featuredProjects}
        />
      </div>
    ) : (
      <></>
    );
  };

  const getAllProjects = (): JSX.Element => {
    const allProjects = projectsData?.allProjects?.nodes?.filter(
      project =>
        project?.creditClassByCreditClassId?.uri === content.iri?.current,
    );

    return allProjects && allProjects.length > 0 ? (
      <div
        className={cx('topo-background-alternate', isKeplrMobileWeb && 'dark')}
      >
        <MoreProjectsSection
          classes={{ root: styles.sectionPadding, title: styles.title }}
          title={content.buyer?.projectsTitle || _(msg`More Projects`)}
          projects={allProjects}
        />
      </div>
    ) : (
      <></>
    );
  };

  const onCtaClick = (): void => {
    if (isLandSteward && content) {
      return onBtnClick(openModalLink, content.landSteward?.ctaButton);
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

  return (
    <div className={styles.root}>
      <HeroTitle
        isBanner
        img={hero}
        title={
          isLandSteward
            ? content.landSteward?.heroSection?.title
            : content.buyer?.heroSection?.title
        }
        descriptionRaw={
          isLandSteward
            ? content.landSteward?.heroSection?.descriptionRaw
            : content.buyer?.heroSection?.descriptionRaw
        }
        classes={{ main: styles.heroMain }}
      />
      <Section
        title={
          content.nameRaw ? <BlockContent content={content.nameRaw} /> : ''
        }
        classes={{
          root: styles.introSection,
          title: styles.title,
          titleWrap: styles.titleWrap,
        }}
      >
        <Body as="div" size="xl" sx={{ maxWidth: { sm: 752 } }}>
          <BlockContent content={content.descriptionRaw} />
        </Body>
      </Section>
      <div
        className={cx('topo-background-alternate', isKeplrMobileWeb && 'dark')}
      >
        {content.ecologicalImpact && (
          <ImpactSection
            title={_(msg`Ecological Impact`)}
            impacts={content.ecologicalImpact}
          />
        )}
        {!isLandSteward && (
          <CreditClassOverviewSection
            className={styles.overviewSection}
            dbClass={dbClass}
            nameRaw={content.nameRaw}
            overviewCards={content.overviewCards}
            sdgs={content.sdgs}
          />
        )}
      </div>
      {isLandSteward && (
        <>
          {getFeaturedProjects()}
          <div
            className={cx(
              'topo-background-alternate',
              isKeplrMobileWeb && 'dark',
            )}
          >
            <CreditClassOverviewSection
              dbClass={dbClass}
              nameRaw={content.nameRaw}
              overviewCards={content.overviewCards}
              sdgs={content.sdgs}
            />
          </div>
        </>
      )}
      {!isLandSteward && getAllProjects()}
      {isLandSteward &&
        content.landSteward?.steps?.map(
          (stepSequence, index: React.Key | null | undefined) => (
            <div
              className={cx(
                'topo-background-alternate',
                isKeplrMobileWeb && 'dark',
                styles.flex,
              )}
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
          ),
        )}
      <div
        className={cx('topo-background-alternate', isKeplrMobileWeb && 'dark')}
      >
        <MediaSection
          header={_(msg`Videos`)}
          items={
            isLandSteward ? content.landSteward?.videos : content.buyer?.videos
          }
        />
      </div>
      <div
        className={cx('topo-background-alternate', isKeplrMobileWeb && 'dark')}
      >
        <ResourcesSection
          resources={
            isLandSteward
              ? content.landSteward?.resources
              : content.buyer?.resources
          }
        />
      </div>
      {/* {isLandSteward && <CreditClassConnectSection connectSection={content.landSteward?.connectSection} />} TODO: hidden until resource is ready */}
      <SwitchFooter
        activeOption={isLandSteward ? _(msg`Land Steward`) : _(msg`Buyer`)}
        buttonText={
          isLandSteward
            ? content.landSteward?.ctaButton?.buttonText || _(msg`get started`)
            : content.buyer?.ctaButton?.buttonText || _(msg`buy credits`)
        }
        label={_(msg`I am a:`)}
        leftOption={_(msg`Land Steward`)}
        rightOption={_(msg`Buyer`)}
        onCtaClick={onCtaClick}
        onToggleClick={setContent}
      />
      <Modal
        open={!!modalIframeLink}
        onClose={() => setModalIframeLink('')}
        isIFrame
      >
        <iframe title="modal-iframe-link" src={modalIframeLink} />
      </Modal>
      <Modal open={isBuyerModalOpen} onClose={() => setBuyerModalOpen(false)}>
        <MoreInfoForm
          title={_(CREDIT_CLASS_TITLE)}
          nameLabel={_(CREDIT_CLASS_NAME_LABEL)}
          emailLabel={_(CREDIT_CLASS_EMAIL_LABEL)}
          orgNameLabel={_(CREDIT_CLASS_ORG_NAME_LABEL)}
          budgetLabel={_(CREDIT_CLASS_BUDGET_LABEL)}
          projectTypesLabel={_(CREDIT_CLASS_PROJECT_TYPES_LABEL)}
          onBehalfOfLabel={_(CREDIT_CLASS_ON_BEHALF_OF_LABEL)}
          usdText={_(CREDIT_CLASS_USD_TEXT)}
          protecTypesOptions={projectTypesOptions}
          onBehalfOfOptions={onBehalfOfOptions}
          submitErrorText={_(CREDIT_CLASS_SUBMIT_ERROR_TEXT)}
          submitLabel={_(CREDIT_CLASS_SUBMIT_LABEL)}
          requiredMessage={_(REQUIRED_MESSAGE)}
          invalidEmailMessage={_(INVALID_EMAIL_MESSAGE)}
          invalidAmount={_(INVALID_AMOUNT)}
          insufficientCredits={_(INSUFFICIENT_CREDITS)}
          invalidDecimalCount={_(INVALID_DECIMAL_COUNT)}
          invalidMemoLength={_(INVALID_MEMO_LENGTH)}
          apiUrl={apiUri}
          onClose={() => setBuyerModalOpen(false)}
          onSubmit={() => {
            setBuyerModalOpen(false);
            setSubmitted(true);
          }}
        />
      </Modal>
      {submitted && (
        <Banner text={_(msg`Thanks for submitting your information!`)} />
      )}
    </div>
  );
};

export { CreditClassDetailsWithContent };
