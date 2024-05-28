import { AudioFileIcon } from '../../icons/AudioFileIcon';
import { ImageIcon } from '../../icons/ImageIcon';
import { OtherDocumentsIcon } from '../../icons/OtherDocumentsIcon';
import { PdfFileIcon } from '../../icons/PdfFileIcon';
import { SpreadsheetFileIcon } from '../../icons/SpreadsheetFileIcon';
import { VideoIcon } from '../../icons/VideoIcon';
import {
  isAudio,
  isImage,
  isPdf,
  isSpreadSheet,
  isVideo,
} from '../../inputs/new/FileDrop/FileDrop.utils';
import { PostFile } from './PostFiles';

export const getIconForFiles = (files: Array<PostFile>) => {
  const dimensions = { width: '24', height: '24' };
  const mimeTypes = files.map(file => file.mimeType);
  const allImages = mimeTypes.every(mimeType => isImage(mimeType));
  if (allImages) {
    return <ImageIcon {...dimensions} />;
  }
  const allVideos = mimeTypes.every(mimeType => isVideo(mimeType));
  if (allVideos) {
    return <VideoIcon {...dimensions} />;
  }
  const allAudios = mimeTypes.every(mimeType => isAudio(mimeType));
  if (allAudios) {
    return <AudioFileIcon {...dimensions} />;
  }
  const allPdfs = mimeTypes.every(mimeType => isPdf(mimeType));
  if (allPdfs) {
    return <PdfFileIcon {...dimensions} />;
  }
  const allSpreadsheets = mimeTypes.every(mimeType => isSpreadSheet(mimeType));
  if (allSpreadsheets) {
    return <SpreadsheetFileIcon {...dimensions} />;
  }
  return <OtherDocumentsIcon {...dimensions} />;
};
