import { Crop } from 'react-image-crop';

/**
 * Asynchronously crops the provided image based on the given crop area.
 * The result is returned as a new HTMLImageElement.
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 *
//  * @param {HTMLImageElement} image - Image File Object
//  * @param {Crop} crop - crop Object
//  * @param {String} fileName - Name of the returned file in Promise
 */
export async function getCroppedImg(
  image: HTMLImageElement,
  crop: Crop,
): Promise<HTMLImageElement> {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx = canvas.getContext('2d');
  const pixelRatio = window.devicePixelRatio;

  if (
    crop &&
    crop.width &&
    crop.height &&
    crop.x !== undefined &&
    crop.y !== undefined
  ) {
    canvas.width = crop.width * scaleX * pixelRatio;
    canvas.height = crop.height * scaleY * pixelRatio;

    if (ctx) {
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY,
      );
    }
  }

  return canvasToBlob(canvas);
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>(resolve => {
    canvas.toBlob(file => {
      if (file) {
        const newImg = document.createElement('img');
        const url = URL.createObjectURL(file);
        newImg.onload = () => {
          // no longer need to read the blob so it's revoked
          URL.revokeObjectURL(url);
        };

        newImg.src = url;

        resolve(newImg);
      }
    }, 'image/png');
  });
}

export function srcToFile(
  src: string,
  fileName: string,
  mimeType: string,
): Promise<File> {
  return fetch(src)
    .then(res => res.arrayBuffer())
    .then(buf => new File([buf], fileName, { type: mimeType }));
}

export async function getImageSrc(
  croppedImage: HTMLImageElement,
  onUpload?: (file: File) => Promise<string>,
  fileName?: string,
  fileType?: string,
): Promise<string> {
  let result = croppedImage.src;
  const timestamp = new Date().getTime();
  const fileNameWithTimestamp = `${timestamp}-${fileName}`;

  if (onUpload && fileName) {
    const imageFile = await srcToFile(
      croppedImage.src,
      fileNameWithTimestamp,
      fileType ?? 'image/png',
    );
    result = await onUpload(imageFile);
  }
  return result;
}
