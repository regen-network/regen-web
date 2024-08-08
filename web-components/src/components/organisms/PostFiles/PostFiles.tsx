import { useEffect, useState } from 'react';
import { Point } from 'geojson';

import { cn } from '../../../utils/styles/cn';
import { PostFilesPrivateFiles } from './PostFiles.PrivateFiles';
import { PostFilesPrivateLocations } from './PostFiles.PrivateLocations';
import { PostFilesPublic } from './PostFiles.Public';
import { FilesPreviews, PostPrivacyType } from './PostFiles.types';
import { parseFile } from './PostFiles.utils';

export type PostFile = {
  iri: string;
  url?: string;
  name?: string;
  description?: string;
  credit?: string;
  location?: Point;
  mimeType?: string;
};
export type PostFilesProps = {
  privacyType: PostPrivacyType;
  files: Array<PostFile>;
  mapboxToken?: string;
  isAdmin: boolean;
  hasToken?: boolean;
};

const PostFiles = ({
  privacyType,
  files,
  mapboxToken,
  isAdmin = false,
  hasToken = false,
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
        />
      )}
      {!isAdmin && !hasToken && privateLocations && (
        <PostFilesPrivateLocations
          files={files}
          filesPreviews={filesPreviews}
        />
      )}
      {!isAdmin && !hasToken && privateFiles && <PostFilesPrivateFiles />}
    </div>
  );
};

export { PostFiles };
