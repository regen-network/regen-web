import { useEffect, useState } from 'react';
import { Point } from 'geojson';

import { cn } from '../../../utils/styles/cn';
import { PostFilesPrivateFiles } from './PostFiles.PrivateFiles';
import { PostFilesPrivateLocations } from './PostFiles.PrivateLocations';
import { PostFilesPublic } from './PostFiles.Public';
import { FilesPreviews, PostPrivacyType } from './PostFiles.types';
import { parseFile } from './PostFiles.utils';

export type FileLocationType = 'none' | 'file' | 'custom';
export type PostFile = {
  iri: string;
  url?: string;
  name?: string;
  description?: string;
  credit?: string;
  location?: Point;
  locationType: FileLocationType;
  mimeType?: string;
};
export type PostFilesProps = {
  privacyType: PostPrivacyType;
  files: Array<PostFile>;
  mapboxToken?: string;
  isAdmin: boolean;
  hasToken?: boolean;
  photoCredit: string;
  adminPrivateLabel: string;
  privateLocationsLabel: string;
  privateFilesLabel: string;
  readMoreText: { text: string; lessText: string; moreText: string };
};

const PostFiles = ({
  privacyType,
  files,
  mapboxToken,
  isAdmin = false,
  hasToken = false,
  photoCredit,
  adminPrivateLabel,
  privateLocationsLabel,
  privateFilesLabel,
  readMoreText,
}: PostFilesProps) => {
  const isPublic = privacyType === 'public';
  const privateLocations = privacyType === 'private_locations';
  const privateFiles = privacyType === 'private_files';
  const [filesPreviews, setFilesPreviews] = useState<FilesPreviews>({});

  useEffect(() => {
    async function parseFiles() {
      files?.map(async file => {
        const fileUrl = file.url;
        if (fileUrl) {
          const preview = await parseFile({
            fileUrl,
            fileName: file.name,
            fileMimeType: file.mimeType,
          });
          if (preview)
            setFilesPreviews(prev => ({ ...prev, [fileUrl]: preview }));
        }
      });
    }
    parseFiles();
  }, [files]);

  return (
    <div
      className={cn(
        'w-[100%]',
        (isPublic || privateLocations || isAdmin) && 'lg:h-[550px]',
      )}
    >
      {(isPublic || isAdmin || hasToken) && (
        <PostFilesPublic
          files={files}
          filesPreviews={filesPreviews}
          mapboxToken={mapboxToken}
          isAdmin={isAdmin}
          privateLocations={privateLocations}
          privateFiles={privateFiles}
          adminPrivateLabel={adminPrivateLabel}
          readMoreText={readMoreText}
        />
      )}
      {!isAdmin && !hasToken && privateLocations && (
        <PostFilesPrivateLocations
          photoCredit={photoCredit}
          files={files}
          filesPreviews={filesPreviews}
          label={privateLocationsLabel}
        />
      )}
      {!isAdmin && !hasToken && privateFiles && (
        <PostFilesPrivateFiles label={privateFilesLabel} />
      )}
    </div>
  );
};

export { PostFiles };
