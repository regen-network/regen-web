import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import {
  DRAFT,
  POST_IS_PRIVATE,
  UNTITLED,
} from 'legacy-pages/Post/Post.constants';

import { TableActionButtons } from 'web-components/src/components/buttons/TableActionButtons';
import DocumentIcon from 'web-components/src/components/icons/DocumentIcon';
import { DraftIcon } from 'web-components/src/components/icons/DraftIcon';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import { LocationIcon } from 'web-components/src/components/icons/LocationIcon';
import { LockIcon } from 'web-components/src/components/icons/LockIcon';
import { PrivateFile } from 'web-components/src/components/icons/PrivateFile';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import TrashIcon from 'web-components/src/components/icons/TrashIcon';
import { UnlockIcon } from 'web-components/src/components/icons/UnlockIcon';
import { Tag } from 'web-components/src/components/organisms/PostFiles/components/Tag';
import {
  ActionsTable,
  RenderActionButtonsFunc,
  SortCallbacksType,
  TablePaginationParams,
} from 'web-components/src/components/table/ActionsTable';
import { Title } from 'web-components/src/components/typography';
import UserAvatar from 'web-components/src/components/user/UserAvatar';
import { formatDate } from 'web-components/src/utils/format';

import { UseStateSetter } from 'types/react/use-state';
import {
  ACTIONS_TABLE_ACTIONS_TEXT,
  getLabelDisplayedRows,
} from 'lib/constants/shared.constants';

import WithLoader from 'components/atoms/WithLoader';
import { NoCredits } from 'components/molecules';
import { SEE_HELP_DOCS } from 'components/organisms/ProjectCollaborators/ProjectCollaborators.constants';
import {
  FILES_ARE_PRIVATE,
  LOCATIONS_ARE_PRIVATE,
} from 'components/templates/ProjectDetails/ProjectDetails.constant';

import {
  DATA_POSTS_DESCRIPTION,
  DATA_POSTS_TABLE_LABEL,
  DATA_POSTS_TITLE,
  DELETE_POST_ACTION,
  EDIT_DRAFT_ACTION,
  NO_DATA_POSTS_TITLE,
  PUBLIC_LABEL,
} from './DataPostsTable.constants';
import { DataPost } from './DataPostsTable.types';

type DataPostsTableProps = {
  /** Array of data posts to display */
  posts?: DataPost[];
  /** Whether no posts exist at all (show empty state) */
  noPosts: boolean;
  /** Whether posts are still loading */
  isLoading?: boolean;
  /** Callback when a table pagination change occurs */
  onTableChange?: UseStateSetter<TablePaginationParams>;
  /** Initial pagination parameters (for server-side pagination) */
  initialPaginationParams?: TablePaginationParams;
  /** Skip offset-based slicing (for server-side pagination) */
  isIgnoreOffset?: boolean;
  /** Callback when user clicks "Edit Draft" on a draft post */
  onEditDraft?: (post: DataPost) => void;
  /** Callback when user clicks "Delete Post" on a published post */
  onDeletePost?: (post: DataPost) => void;
  /** Sort callbacks for sortable columns (Title, Date Created, Author) */
  sortCallbacks?: SortCallbacksType;
  /** Whether the current user is a viewer (hides action buttons) */
  isViewer?: boolean;
};

export const DataPostsTable: React.FC<
  React.PropsWithChildren<DataPostsTableProps>
> = ({
  posts,
  noPosts,
  isLoading = false,
  onTableChange,
  initialPaginationParams,
  isIgnoreOffset = false,
  onEditDraft,
  onDeletePost,
  sortCallbacks,
  isViewer = false,
}) => {
  const { _ } = useLingui();
  const navigate = useNavigate();

  const labelDisplayedRows = useMemo(
    () =>
      getLabelDisplayedRows({
        _,
        isIgnoreOffset,
        rowsLength: posts?.length ?? 0,
      }),
    [_, posts?.length, isIgnoreOffset],
  );

  const renderActionButtons: RenderActionButtonsFunc = i => {
    if (isViewer) return null;
    if (!posts) return null;
    const post = posts[i];
    if (!post) return null;

    const buttons: {
      label: string;
      onClick: () => void;
      icon?: JSX.Element;
    }[] = [];

    // "Edit Draft" is available for posts still in draft mode
    if (!post.published && onEditDraft) {
      buttons.push({
        label: _(EDIT_DRAFT_ACTION),
        onClick: () => onEditDraft(post),
        icon: <EditIcon />,
      });
    }

    // "Delete Post" is available for published posts only
    if (post.published && onDeletePost) {
      buttons.push({
        label: _(DELETE_POST_ACTION),
        onClick: () => onDeletePost(post),
        icon: <TrashIcon className="text-error-300" />,
      });
    }

    if (buttons.length === 0) return null;
    return <TableActionButtons buttons={buttons} />;
  };

  const renderPrivacyTag = (privacy: DataPost['privacy']) => {
    switch (privacy) {
      case 'public':
        return (
          <Tag
            className="bg-ac-primary-200"
            labelClassName="font-normal"
            label={_(PUBLIC_LABEL)}
            icon={<UnlockIcon className="w-[14px] h-[14px]" />}
          />
        );
      case 'private':
        return (
          <Tag
            className="bg-bc-red-300"
            labelClassName="font-normal"
            label={_(POST_IS_PRIVATE)}
            icon={<LockIcon className="w-[16px] h-[16px]" />}
          />
        );
      case 'private_files':
        return (
          <Tag
            className="bg-bc-red-300"
            labelClassName="font-normal"
            label={_(FILES_ARE_PRIVATE)}
            icon={<PrivateFile className="w-[16px] h-[16px]" />}
          />
        );
      case 'private_locations':
        return (
          <Tag
            className="bg-bc-red-300"
            labelClassName="font-normal"
            label={_(LOCATIONS_ARE_PRIVATE)}
            icon={<LocationIcon className="w-[16px] h-[16px]" />}
          />
        );
      default:
        return null;
    }
  };

  if (noPosts) {
    return (
      <NoCredits
        className="bg-grey-200 border-0 border-t border-solid border-sc-card-standard-stroke"
        title={_(NO_DATA_POSTS_TITLE)}
      />
    );
  }

  return (
    <WithLoader isLoading={isLoading} variant="skeleton">
      <div className="w-full pt-30 md:pt-[30px] bg-bc-neutral-0 rounded-lg border border-solid border-bc-neutral-300">
        <div className="mb-10 my-[30px]">
          <Title variant="h4">
            {_(DATA_POSTS_TITLE)}
            {(posts?.length ?? 0) > 0 && (
              <span className="pl-[2px] text-bc-neutral-400 font-normal">
                ({posts?.length})
              </span>
            )}
          </Title>
        </div>
        <p className="text-sc-text-paragraph mb-30 mx-[30px] mt-0 max-w-[551px]">
          {_(DATA_POSTS_DESCRIPTION)}{' '}
          <button
            className="p-0 text-[12px] tracking-[1px] font-[800] bg-transparent font-muli cursor-pointer text-ac-primary-500 border-none inline-flex items-center gap-3 group align-middle"
            onClick={() => navigate('/docs')}
          >
            {_(SEE_HELP_DOCS)}
            <SmallArrowIcon
              sx={{
                height: '16px',
                width: '16px',
                transition: 'transform 0.2s',
              }}
              className="group-hover:translate-x-3 "
            />
          </button>
        </p>
        <ActionsTable
          tableLabel={_(DATA_POSTS_TABLE_LABEL)}
          actionButtonsText={_(ACTIONS_TABLE_ACTIONS_TEXT)}
          renderActionButtons={renderActionButtons}
          labelDisplayedRows={labelDisplayedRows}
          onTableChange={onTableChange}
          initialPaginationParams={initialPaginationParams}
          isIgnoreOffset={isIgnoreOffset}
          sortCallbacks={sortCallbacks}
          /* eslint-disable react/jsx-key */
          headerRows={[
            <Trans>Title</Trans>,
            <Trans>Date Created</Trans>,
            <Trans>Author</Trans>,
            <Trans>Privacy</Trans>,
            <Trans>Files</Trans>,
          ]}
          rows={
            /* eslint-disable react/jsx-key */
            posts?.map(post => [
              <div
                className="max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap"
                title={post.title}
              >
                <span className="font-bold">
                  {post.title || <em>{_(UNTITLED)}</em>}
                </span>
                {!post.published && (
                  <span className="ml-10 inline-flex items-center gap-[2px] px-[8px] py-[2px] text-[0.75rem] rounded bg-bc-neutral-300 text-bc-neutral-500 font-bold">
                    <DraftIcon className="w-[14px] h-[14px]" />
                    {_(DRAFT)}
                  </span>
                )}
              </div>,
              <div className="whitespace-nowrap text-bc-neutral-400">
                {formatDate(post.createdAt, undefined, true)}
              </div>,
              <div className="flex items-center gap-[16px]">
                <UserAvatar
                  src={post.authorAvatarUrl}
                  alt={post.author}
                  size="md"
                  href={post.authorProfileLink}
                />
                <div className="min-w-0">
                  <div
                    className="font-bold overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]"
                    title={post.author}
                  >
                    {post.author}
                  </div>
                  {post.authorCompany && (
                    <div
                      className="text-[0.75rem] text-[#545555] overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]"
                      title={post.authorCompany}
                    >
                      {post.authorCompany}
                    </div>
                  )}
                </div>
              </div>,
              <div>{renderPrivacyTag(post.privacy)}</div>,
              <div className="flex items-center gap-[8px]">
                {post.filesCount}
                <DocumentIcon sx={{ fontSize: 18, color: 'info.main' }} />
              </div>,
            ]) ?? []
          }
        />
      </div>
    </WithLoader>
  );
};
