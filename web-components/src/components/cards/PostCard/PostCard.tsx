import React from 'react';
import { Box, Grid, Link, useMediaQuery, useTheme } from '@mui/material';
import Linkify from 'linkify-react';

import { defaultFontFamily } from '../../../theme/muiTheme';
import VerifiedIcon from '../../icons/VerifiedIcon';
import WhitepaperIcon from '../../icons/WhitepaperIcon';
import { LinkComponentProp } from '../../modal/ConfirmModal';
import {
  FilePreview,
  FileToPreview,
} from '../../organisms/PostFiles/components/FilePreview';
import { Body, Subtitle } from '../../typography';
import UserInfo, { User } from '../../user/UserInfo';
import Card from '../Card';
import { SIGNED_BY } from './PostCard.constants';
import { DraftBadge } from './PostCard.DraftBadge';
import { PrivateBadge } from './PostCard.PrivateBadge';
import ActionButton from './PostCardActionButton';

interface PostCardProps {
  title: string;
  comment?: string;
  imgSrc?: string;
  author: User;
  signers?: Array<User>;
  privacyLabel?: string;
  isAdmin?: boolean;
  numberOfFiles?: number;
  sharePublicLink: (ev: React.MouseEvent) => void;
  sharePrivateLink: (ev: React.MouseEvent) => void;
  onDelete: (ev: React.MouseEvent) => void;
  onEditDraft?: (ev: React.MouseEvent) => void;
  onClick: () => void;
  publicPost?: boolean;
  file?: FileToPreview;
  preview?: string;
  draftLabel?: string;
  linkComponent?: LinkComponentProp;
}

export default function PostCard({
  title,
  comment,
  file,
  preview,
  author,
  signers,
  privacyLabel,
  isAdmin,
  numberOfFiles,
  sharePublicLink,
  sharePrivateLink,
  onClick,
  publicPost,
  onDelete,
  onEditDraft,
  draftLabel,
  linkComponent = Link,
}: PostCardProps): JSX.Element {
  const hasFile = !!file;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Card
      className="group relative bg-grey-100 hover:bg-grey-200 cursor-default"
      sx={{ p: { xs: 4, md: 8 } }}
      borderRadius="10px"
      onClick={onClick}
    >
      <ActionButton
        draft={!!draftLabel}
        isAdmin={isAdmin}
        sharePublicLink={sharePublicLink}
        sharePrivateLink={sharePrivateLink}
        onDelete={onDelete}
        onEditDraft={onEditDraft}
        publicPost={publicPost}
      />
      {!hasFile && (
        <div className="absolute lg:right-[90px] top-[18px] lg:top-[26px]">
          {!draftLabel && privacyLabel && <PrivateBadge label={privacyLabel} />}
          {draftLabel && <DraftBadge label={draftLabel} />}
        </div>
      )}

      <Grid
        container
        sx={{
          flexWrap: { xs: 'wrap-reverse', md: 'nowrap' },
          position: 'relative',
        }}
      >
        <Grid
          xs={12}
          md={hasFile ? 7 : 12}
          item
          sx={{
            pb: { xs: 4.5, md: 0 },
            pr: { xs: 0, md: 2 },
            pt: { xs: hasFile ? 0 : 11, md: 0 },
          }}
        >
          <Subtitle className="group-hover:text-grey-500" size="lg" mb={2.75}>
            {title}
          </Subtitle>
          <UserInfo
            size="lg"
            fontFamily={defaultFontFamily}
            user={author}
            nameHasPadding={false}
            classNames={{
              info: 'ml-10',
              title: 'text-sm truncate max-w-[120px]',
              timestamp: 'text-xs',
            }}
            linkComponent={linkComponent}
          />
          {comment && (
            <Box sx={{ paddingInlineEnd: 2, paddingBlockStart: 4.5 }}>
              <Body
                onClick={e => e.stopPropagation()}
                size="md"
                sx={{ pb: 1.5 }}
                className="line-clamp-2 overflow-hidden"
              >
                <Linkify
                  // eslint-disable-next-line lingui/no-unlocalized-strings
                  options={{ target: '_blank', rel: 'noopener noreferrer' }}
                >
                  {comment}
                </Linkify>
              </Body>
            </Box>
          )}
          {signers && signers.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3.5 }}>
              <VerifiedIcon color="white" hasFill />
              <Body
                size="xs"
                mobileSize="xs"
                sx={{
                  whiteSpace: 'nowrap',
                  ml: 1,
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                {SIGNED_BY}
              </Body>
              {signers.map((signer, i) => (
                <UserInfo
                  key={`${signer.timestamp}-${i}`}
                  fontFamily={defaultFontFamily}
                  user={signer}
                  size="xs"
                  classNames={{
                    info: 'ml-3',
                    title: 'text-xs font-semibold truncate max-w-[120px]',
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    ml: 2,
                    width: 'inherit',
                  }}
                  nameHasPadding={false}
                />
              ))}
            </Box>
          )}
        </Grid>
        {hasFile && (
          <Grid
            xs={12}
            md={5}
            item
            sx={{
              mb: { xs: 5, md: 0 },
            }}
          >
            <Box
              sx={theme => ({
                height: theme => ({
                  sm: theme.spacing(51),
                  xs: theme.spacing(49.25),
                }),
                border: `1px solid ${theme.palette.grey[100]}`,
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative',
              })}
            >
              <div className="absolute z-[1] left-[12px] top-[12px]">
                {!draftLabel && privacyLabel && (
                  <PrivateBadge label={privacyLabel} />
                )}
                {draftLabel && <DraftBadge label={draftLabel} />}
              </div>
              {file && (
                <FilePreview
                  className="w-[100%] h-[100%] group-hover:scale-x-105 group-hover:scale-y-105 transition-all duration-500"
                  linearGradientClassName="bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_5.23%,rgba(0,0,0,0.00)_31.4%)]"
                  file={file}
                  pdfPageHeight={isMobile ? 197 : 204}
                  preview={preview}
                />
              )}
              {numberOfFiles && numberOfFiles > 1 && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: theme => theme.spacing(3),
                    right: theme => theme.spacing(3),
                    display: 'flex',
                    alignItems: 'center',
                    color: theme => theme.palette.primary.main,
                    zIndex: 1,
                  }}
                >
                  <Subtitle
                    size="sm"
                    color="white"
                    sx={{ boxShadow: theme => theme.shadows[1] }}
                  >
                    {numberOfFiles}
                  </Subtitle>
                  <WhitepaperIcon className="h-[24px] w-[24px] ml-[7px]" />
                </Box>
              )}
            </Box>
          </Grid>
        )}
      </Grid>
    </Card>
  );
}
