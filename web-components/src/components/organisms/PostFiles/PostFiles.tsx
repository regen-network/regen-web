import { Point } from 'geojson';

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
};

const PostFiles = ({ privacyType, files, mapboxToken }: PostFilesProps) => {
  return (
    <div className="w-[100%] sm:h-[550px]">
      {privacyType === 'public' && (
        <PostFilesPublic files={files} mapboxToken={mapboxToken} />
      )}
      {privacyType === 'private_locations' && (
        <PostFilesPrivateLocations files={files} />
      )}
    </div>
  );
};

export { PostFiles };
