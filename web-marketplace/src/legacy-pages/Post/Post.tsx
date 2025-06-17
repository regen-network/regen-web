import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { MAPBOX_TOKEN } from 'config/globals';
import { Point } from 'geojson';
import { useAtom } from 'jotai';
import NotFoundPage from 'legacy-pages/NotFound';
import Linkify from 'linkify-react';
import { parse } from 'wellknown';

import { PostFiles } from 'web-components/src/components/organisms/PostFiles/PostFiles';
import Section from 'web-components/src/components/section';
import { Body } from 'web-components/src/components/typography';
import { formatDate } from 'web-components/src/utils/format';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { useAuth } from 'lib/auth/auth';
import { LESS, MORE, PHOTO_CREDIT, READ } from 'lib/constants/shared.constants';
import { getPostQuery } from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery';
import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';
import { getProjectByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery';

import bgShadow from '../../../public/png/bg-shadow.png';
import {
  ADMIN_PRIVATE_FILES_LABEL,
  ADMIN_PRIVATE_LOCATIONS_LABEL,
  PRIVATE_FILES_LABEL,
  PRIVATE_LOCATIONS_LABEL,
  UNTITLED,
} from './Post.constants';
import { PostFooter } from './Post.Footer';
import { PostHeader } from './Post.Header';
import { PostPrivate } from './Post.Private';
import { PostTimeline } from './Post.Timeline';

function Post(): JSX.Element {
  const { iri } = useParams();
  const { _ } = useLingui();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { activeAccountId } = useAuth();
  const { data, isFetching } = useQuery(
    getPostQuery({
      iri,
      token,
      enabled: !!iri,
      languageCode: selectedLanguage,
    }),
  );
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const projectId = data?.projectId;
  const {
    data: offchainProjectByIdData,
    isFetching: loadingOffchainProjectById,
  } = useQuery(
    getProjectByIdQuery({
      client: graphqlClient,
      languageCode: selectedLanguage,
      enabled: !!projectId,
      id: projectId,
    }),
  );

  const offchainProject = offchainProjectByIdData?.data?.projectById;
  const adminAccountId = offchainProject?.adminAccountId;
  const isAdmin =
    !!adminAccountId && !!activeAccountId && adminAccountId === activeAccountId;
  const privacyType = data?.privacy;
  const privatePostError = data?.error === 'private post';
  const privatePost = data?.privacy === 'private';
  const privateFiles = data?.privacy === 'private_files';
  const privateLocations = data?.privacy === 'private_locations';
  const publicPost = data?.privacy === 'public';

  const hasToken =
    (privatePost && !!data?.filesUrls) ||
    (privateFiles && !!data?.filesUrls) ||
    (privateLocations && data?.contents?.files?.some(file => file.location));

  const files = useMemo(
    () =>
      data?.contents?.files?.map((file, i) => {
        return {
          iri: file.iri,
          url: data?.filesUrls?.[file.iri],
          mimeType: data?.filesMimeTypes?.[file.iri],
          name: file.name,
          description: file.description,
          credit: file.credit,
          locationType: file.locationType,
          location: file.location?.wkt
            ? (parse(file.location?.wkt) as Point)
            : undefined,
        };
      }),
    [data?.contents?.files, data?.filesMimeTypes, data?.filesUrls],
  );

  const { data: creatorAccountData } = useQuery(
    getAccountByIdQuery({
      client: graphqlClient,
      languageCode: selectedLanguage,
      id: data?.creatorAccountId ?? '',
      enabled: !!data?.creatorAccountId && !!graphqlClient,
    }),
  );
  const creatorAccount = creatorAccountData?.accountById;
  // eslint-disable-next-line lingui/no-unlocalized-strings
  const createdAt = formatDate(data?.createdAt, 'MMMM D, YYYY | h:mm A');
  const creatorIsAdmin = creatorAccount?.id === adminAccountId;

  return (
    <>
      {!isFetching && (!data || (isAdmin && !data?.published)) ? (
        <NotFoundPage />
      ) : (
        <>
          {!loadingOffchainProjectById && !isAdmin && privatePostError && (
            <PostPrivate />
          )}
          {!loadingOffchainProjectById &&
            data?.contents &&
            (!privatePostError || isAdmin) && (
              <>
                <PostHeader
                  projectHref={`/project/${
                    offchainProject?.slug ??
                    offchainProject?.onChainId ??
                    projectId
                  }`}
                  isAdmin={isAdmin}
                  title={data.contents.title || _(UNTITLED)}
                  creatorAccount={creatorAccount}
                  adminAccountId={adminAccountId}
                  creatorIsAdmin={creatorIsAdmin}
                  createdAt={data?.createdAt}
                  privatePost={privatePost}
                  publicPost={publicPost}
                  privateFiles={privateFiles}
                  offChainProjectId={projectId}
                />

                {privacyType && files && files.length > 0 && (
                  <div
                    className={`${
                      !isAdmin && privateFiles
                        ? 'max-w-[750px] sm:mb-[35px] px-[16px] sm:px-0'
                        : 'max-w-[942px] sm:mb-[70px]'
                    } m-auto relative mb-30`}
                  >
                    <PostFiles
                      photoCredit={_(PHOTO_CREDIT)}
                      privacyType={privacyType}
                      mapboxToken={MAPBOX_TOKEN}
                      isAdmin={isAdmin}
                      files={files}
                      hasToken={hasToken}
                      adminPrivateLabel={
                        privacyType === 'private_locations'
                          ? _(ADMIN_PRIVATE_LOCATIONS_LABEL)
                          : _(ADMIN_PRIVATE_FILES_LABEL)
                      }
                      privateFilesLabel={_(PRIVATE_FILES_LABEL)}
                      privateLocationsLabel={_(PRIVATE_LOCATIONS_LABEL)}
                      readMoreText={{
                        text: _(READ),
                        lessText: _(LESS),
                        moreText: _(MORE),
                      }}
                    />
                    {(isAdmin || !privateFiles) && (
                      <img
                        className="hidden sm:block absolute top-[17px] left-20 z-[-1]"
                        src={bgShadow.src}
                        alt="bg-shadow"
                      />
                    )}
                  </div>
                )}

                <Section className="sm:p-0 py-0">
                  <Body className="max-w-[750px] m-auto" size="xl">
                    <Linkify
                      // eslint-disable-next-line lingui/no-unlocalized-strings
                      options={{ target: '_blank', rel: 'noopener noreferrer' }}
                    >
                      {data?.contents.comment}
                    </Linkify>
                  </Body>
                  <div className="my-40 sm:my-50 mx-auto border-t-[1px] border-b-0 border-solid border-grey-300 max-w-[750px] w-[100%]" />
                </Section>

                <PostTimeline
                  createdAt={createdAt}
                  creatorAccount={creatorAccount}
                  creatorIsAdmin={creatorIsAdmin}
                  registryAddr={
                    offchainProject?.creditClassByCreditClassId
                      ?.accountByRegistryId?.addr
                  }
                  adminAddr={offchainProject?.accountByAdminAccountId?.addr}
                />

                <PostFooter prevIri={data?.prevIri} nextIri={data?.nextIri} />
              </>
            )}
        </>
      )}
    </>
  );
}

export { Post };
