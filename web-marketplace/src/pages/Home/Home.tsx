import React, { useEffect, useState } from 'react';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { Registry } from '@cosmjs/proto-signing';
import { AminoTypes } from '@cosmjs/stargate';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';
import {
  cosmosAminoConverters,
  cosmosProtoRegistry,
  ibcAminoConverters,
  ibcProtoRegistry,
  regenAminoConverters,
  regenProtoRegistry,
} from '@regen-network/api';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { gradients } from 'styles/gradients';
import { nanoid } from 'nanoid';
import { toBase64, toUtf8 } from '@cosmjs/encoding';

import { BlockContent } from 'web-components/src/components/block-content';
import { Loading } from 'web-components/src/components/loading';
import Modal from 'web-components/src/components/modal';
import SEO from 'web-components/src/components/seo';
import { Body, Title } from 'web-components/src/components/typography';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { SKIPPED_CLASS_ID } from 'lib/env';
import { getAllHomePageQuery } from 'lib/queries/react-query/sanity/getAllHomePageQuery/getAllHomePageQuery';
import { useWallet } from 'lib/wallet/wallet';

import WithLoader from 'components/atoms/WithLoader';
import BlockContentBody from 'components/molecules/BlockContentBody';
import { instantiate2Address } from '@cosmjs/cosmwasm-stargate';

import horsesImg from '../../assets/horses-grazing.png';
import { SanityButton } from '../../components/atoms';
import {
  BackgroundImgSection,
  GettingStartedResourcesSection,
  HeroAction,
} from '../../components/molecules';
import { CreditClassCards } from '../../components/organisms';
import { client as sanityClient } from '../../lib/clients/sanity';
import { FeaturedProjects } from './Home.FeaturedProjects';
import { useHomeStyles } from './Home.styles';
import { useCreditClasses } from './hooks/useCreditClasses';
import { chainId, ledgerRPCUri } from 'lib/ledger';
import { chainInfo } from 'lib/wallet/chainInfo/chainInfo';

export const encodeJsonToBase64 = (object: any) =>
  toBase64(toUtf8(JSON.stringify(object)));

const proposalModules = [
  {
    admin: { core_module: {} },
    code_id: 13,
    label: `dao-proposal-single_${Date.now()}`,
    msg: encodeJsonToBase64({
      allow_revoting: false,
      close_proposal_on_execution_failure: true,
      max_voting_period: { time: 604800 },
      only_members_execute: true,
      pre_propose_info: {
        module_may_propose: {
          info: {
            admin: { core_module: {} },
            code_id: 11,
            label: `dao-pre-propose-single_${Date.now()}`,
            msg: encodeJsonToBase64({
              deposit_info: null,
              submission_policy: {
                specific: { dao_members: true, allowlist: [], denylist: [] },
              },
              extension: {},
            }),
            funds: [],
          },
        },
      },
      threshold: {
        threshold_quorum: {
          quorum: { percent: '0.20' },
          threshold: { majority: {} },
        },
      },
      veto: null,
    }),
    funds: [],
  },
];
const votingModule = {
  admin: { core_module: {} },
  code_id: 19,
  label: `dao-voting-cw4__${Date.now()}`,
  msg: encodeJsonToBase64({
    group_contract: {
      new: {
        cw4_group_code_id: 2,
        initial_members: [
          {
            addr: 'regen1gtlfmszmhv3jnlqx6smt9n6rcwsfydrhznqyk9',
            weight: 1000,
          },
        ],
      },
    },
  }),
  funds: [],
};

export const getFundsFromDaoInstantiateMsg = ({
  voting_module_instantiate_info,
  proposal_modules_instantiate_info,
}: {
  voting_module_instantiate_info: any;
  proposal_modules_instantiate_info: any;
}) => [
  ...(voting_module_instantiate_info.funds || []),
  ...proposal_modules_instantiate_info.flatMap(({ funds }) => funds || []),
];

const Home: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { _ } = useLingui();
  const [open, setOpen] = useState(false);
  const [modalLink, setModalLink] = useState<string>('');
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { isKeplrMobileWeb } = useWallet();

  const { classes, cx } = useHomeStyles();

  const { data: allHomePageData, isFetching: isFetchingAllHomePage } = useQuery(
    getAllHomePageQuery({
      sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  const {
    creditClasses,
    creditClassesPrograms,
    loading: creditClassesLoading,
  } = useCreditClasses({
    skippedClassId: SKIPPED_CLASS_ID,
  });

  const content = allHomePageData?.allHomePage?.[0];

  const heroSection = content?.heroSection;
  const projectsSection = content?.projectsSection;
  const creditClassesSection = content?.creditClassesSection;
  const seo = content?.seo;
  const gettingStartedResourcesSection =
    content?.gettingStartedResourcesSection;

  useEffect(() => {
    const anchor = window.location.hash.slice(1);
    if (anchor) {
      const anchorEl = document.getElementById(anchor);
      if (anchorEl) {
        anchorEl.scrollIntoView();
      }
    }
  }, []);
  const { wallet } = useWallet();

  if (isFetchingAllHomePage) return <Loading sx={{ minHeight: '100vh' }} />;

  const createDao = async () => {
    const protoRegistry = [
      ...cosmosProtoRegistry,
      ...ibcProtoRegistry,
      ...regenProtoRegistry,
    ];

    const aminoConverters = {
      ...cosmosAminoConverters,
      ...ibcAminoConverters,
      ...regenAminoConverters,
    };

    const registry = new Registry(protoRegistry);
    const aminoTypes = new AminoTypes(aminoConverters);
    const client = await SigningCosmWasmClient.connectWithSigner(
      ledgerRPCUri,
      wallet?.offlineSigner,
      {
        registry,
        aminoTypes,
      },
    );
    const salt = nanoid();
    const cwAdminFactoryAddr =
      'regen1hrpna9v7vs3stzyd4z3xf00676kf78zpe2u5ksvljswn2vnjp3ysp76v39';
    const daoDaoCoreCodeId = 6;

    const codeDetails = await client.getCodeDetails(daoDaoCoreCodeId);

    const predictedDaoAddress = instantiate2Address(
      toUtf8(codeDetails?.checksum),
      cwAdminFactoryAddr,
      toUtf8(salt),
      chainInfo.bech32Config.bech32PrefixAccAddr,
    );

    await client.execute(
      wallet?.address,
      cwAdminFactoryAddr,
      {
        instantiate2_contract_with_self_admin: {
          code_id: daoDaoCoreCodeId,
          instantiate_msg: encodeJsonToBase64({
            admin: null,
            automatically_add_cw20s: true,
            automatically_add_cw721s: true,
            // dao_uri: config.uri,
            description: 'test dao',
            // Replace empty strings with null.
            image_url: null,
            initial_items: [{ key: 'type', value: 'organization' }],
            initial_actions: [],
            name: 'DAO with rbam test',
            proposal_modules_instantiate_info: proposalModules,
            voting_module_instantiate_info: votingModule,
          }),
          funds: getFundsFromDaoInstantiateMsg({
            voting_module_instantiate_info: votingModule,
            proposal_modules_instantiate_info: proposalModules,
          }),

          label: 'Regen DAO',
          salt,
          expect: predictedDaoAddress,
        },
      },
      {
        amount: [
          {
            denom: 'uregen',
            amount: '5000',
          },
        ],
        gas: '200000',
      },
    );
  };

  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <SEO
        title={seo?.title || ''}
        description={seo?.description || ''}
        imageUrl={seo?.image?.asset?.url || ''} // TODO: specify dimensions here. See: https://www.sanity.io/docs/image-urls
        siteMetadata={{
          title: seo?.title || '',
          description: seo?.description || '',
          // eslint-disable-next-line lingui/no-unlocalized-strings
          author: 'Regen Network Development, PBC',
          siteUrl: window.location.href,
        }}
      />
      <BackgroundImgSection
        img={heroSection?.background?.image?.asset?.url || ''}
        linearGradient="linear-gradient(180deg, rgba(0, 0, 0, 0.30) 20.79%, rgba(0, 0, 0, 0.15) 100%)"
        classes={{ section: classes.section }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: [600, 600, 760],
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            pt: { xs: 8, sm: 15 },
          }}
        >
          <Box sx={{ pr: [0, 4], alignSelf: 'center', maxWidth: '715px' }}>
            <Title
              variant="h1"
              sx={{
                color: 'primary.main',
                lineHeight: { xs: '140%', sm: '130%' },
              }}
            >
              <Box sx={{ display: 'inline-block', maxWidth: '494px' }}>
                <Trans>
                  Connect{' '}
                  <Box sx={{ display: 'inline-block', ...gradients.blueGreen }}>
                    Capital
                  </Box>{' '}
                  to{' '}
                  <Box sx={{ display: 'inline-block', ...gradients.blueGreen }}>
                    Ecological
                  </Box>{' '}
                  Outcomes
                </Trans>
              </Box>
            </Title>
            <Body
              as="div"
              size="xl"
              mobileSize="md"
              sx={{ color: 'primary.main', my: 4 }}
            >
              <BlockContent content={heroSection?.bodyRaw} />
            </Body>
            <SanityButton
              size="large"
              btn={heroSection?.button}
              sx={{ mt: { xs: 4, sm: 4 } }}
            />
          </Box>
          <Box
            sx={{
              alignSelf: 'center',
              maxWidth: ['252px', '560px'],
            }}
          >
            <img
              loading="lazy"
              style={{ width: '100%' }}
              src={heroSection?.icon?.image?.asset?.url || ''}
              alt={heroSection?.icon?.imageAlt || 'icon'}
            />
          </Box>
        </Box>
      </BackgroundImgSection>

      <FeaturedProjects
        title={
          projectsSection?.titleCustomBody?.title || _(msg`Featured Projects`)
        }
        body={projectsSection?.titleCustomBody?.bodyRaw}
        sanityFeaturedProjects={projectsSection?.projects}
      />

      {creditClasses && (
        <BackgroundImgSection
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
          title={creditClassesSection?.title || _(msg`Credit Classes`)}
          classes={{
            root: cx(
              classes.creditClassBackground,
              'topo-background',
              isKeplrMobileWeb && 'dark',
            ),
            title: classes.title,
          }}
          id="credit-classes"
        >
          {creditClassesSection?.bodyRaw && (
            <BlockContentBody body={creditClassesSection?.bodyRaw} />
          )}
          <WithLoader
            isLoading={creditClassesLoading}
            sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <CreditClassCards
              btnText={_(msg`Learn More`)}
              justifyContent={['center', 'center', 'flex-start']}
              creditClassesContent={creditClasses} // CMS data
              creditClassesProgram={creditClassesPrograms}
            />
          </WithLoader>
        </BackgroundImgSection>
      )}

      {gettingStartedResourcesSection && (
        <GettingStartedResourcesSection
          section={gettingStartedResourcesSection}
        />
      )}

      <HeroAction
        isBanner
        classes={{
          main: classes.bottomSectionWidth,
          section: classes.bottomSection,
        }}
        img={horsesImg}
        openModal={(href: string): void => {
          setModalLink(href);
          setOpen(true);
        }}
        bottomBanner={content?.bottomBanner}
      />

      <Modal open={open} onClose={() => setOpen(false)} isIFrame>
        <iframe title="airtable-signup-form" src={modalLink} />
      </Modal>
    </Box>
  );
};

export { Home };
