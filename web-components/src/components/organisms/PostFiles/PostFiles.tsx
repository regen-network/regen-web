import { Point } from 'geojson';

import { cn } from '../../../utils/styles/cn';
import { PostFilesPrivateFiles } from './PostFiles.PrivateFiles';
import { PostFilesPrivateLocations } from './PostFiles.PrivateLocations';
import { PostFilesPublic } from './PostFiles.Public';
import { PostPrivacyType } from './PostFiles.types';

export type PostFile = {
  url: string;
  name: string;
  description?: string;
  credit?: string;
  location: Point;
  mimeType: string;
};
export type PostFilesProps = {
  privacyType: PostPrivacyType;
  files: Array<PostFile>;
  mapboxToken?: string;
  isAdmin: boolean;
};

const PostFiles = ({
  privacyType,
  files,
  mapboxToken,
  isAdmin = false,
}: PostFilesProps) => {
  const isPublic = privacyType === 'public';
  const privateLocations = privacyType === 'private_locations';
  const privateFiles = privacyType === 'private_files';
  return (
    <div
      className={cn(
        'w-[100%]',
        (isPublic || privateLocations || isAdmin) && 'sm:h-[550px]',
      )}
    >
      {isPublic && <PostFilesPublic files={files} mapboxToken={mapboxToken} />}
      {privateLocations && <PostFilesPrivateLocations files={files} />}
      {privateFiles && <PostFilesPrivateFiles files={files} />}
    </div>
  );
};

export { PostFiles };
