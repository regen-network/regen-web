import { Point } from 'geojson';

import { cn } from '../../../utils/styles/cn';
import { PostFilesPrivateFiles } from './PostFiles.PrivateFiles';
import { PostFilesPrivateLocations } from './PostFiles.PrivateLocations';
import { PostFilesPublic } from './PostFiles.Public';
import { PostPrivacyType } from './PostFiles.types';

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
          mapboxToken={mapboxToken}
          isAdmin={isAdmin}
          privateLocations={privateLocations}
          privateFiles={privateFiles}
        />
      )}
      {!isAdmin && !hasToken && privateLocations && (
        <PostFilesPrivateLocations files={files} />
      )}
      {!isAdmin && !hasToken && privateFiles && <PostFilesPrivateFiles />}
    </div>
  );
};

export { PostFiles };
