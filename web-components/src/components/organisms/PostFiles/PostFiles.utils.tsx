import mammoth from 'mammoth';
import { read, utils } from 'xlsx';

import { AudioFileIcon } from '../../icons/AudioFileIcon';
import { ImageIcon } from '../../icons/ImageIcon';
import { OtherDocumentsIcon } from '../../icons/OtherDocumentsIcon';
import { PdfFileIcon } from '../../icons/PdfFileIcon';
import { SpreadsheetFileIcon } from '../../icons/SpreadsheetFileIcon';
import { VideoIcon } from '../../icons/VideoIcon';
import { srcToFile } from '../../image-crop/canvas-utils';
import {
  isAudio,
  isCsv,
  isDocx,
  isImage,
  isJson,
  isPdf,
  isVideo,
  isXlsOrXlsx,
  toArrayBuffer,
  toText,
} from '../../inputs/new/FileDrop/FileDrop.utils';
import { PostFile } from './PostFiles';
import {
  audioColors,
  otherDocumentColors,
  textDocumentColors,
} from './PostFiles.constants';

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
  const allSpreadsheets = mimeTypes.every(mimeType => isCsv(mimeType));
  if (allSpreadsheets) {
    return <SpreadsheetFileIcon {...dimensions} />;
  }
  return <OtherDocumentsIcon {...dimensions} />;
};

export const getColors = (
  audio: boolean,
  csv: boolean,
  json: boolean,
  xls: boolean,
  docx: boolean,
) =>
  audio
    ? audioColors
    : csv || xls || json || docx
    ? textDocumentColors
    : otherDocumentColors;

type ParseFileParams = {
  fileUrl?: string;
  fileName?: string;
  fileMimeType?: string;
};
export async function parseFile({
  fileUrl,
  fileName,
  fileMimeType,
}: ParseFileParams) {
  const csv = isCsv(fileMimeType);
  const json = isJson(fileMimeType);
  const xls = isXlsOrXlsx(fileMimeType);
  const docx = isDocx(fileMimeType);

  if ((csv || json || xls || docx) && fileUrl && fileName) {
    const fileData = await srcToFile(fileUrl, fileName, fileMimeType);
    if (csv || json) {
      const text = (await toText(fileData)) as string;
      return text;
    } else {
      const arrayBuffer = (await toArrayBuffer(fileData)) as ArrayBuffer;
      if (xls) {
        const workbook = read(new Uint8Array(arrayBuffer), { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const csv = utils.sheet_to_csv(worksheet);
        return csv;
      } else if (docx) {
        const html = await mammoth.convertToHtml({ arrayBuffer });
        return html.value;
      }
    }
  }
  return;
}
