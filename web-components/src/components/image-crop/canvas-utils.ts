import { Crop } from 'react-image-crop';

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
//  * @param {HTMLImageElement} image - Image File Object
//  * @param {Crop} crop - crop Object
//  * @param {String} fileName - Name of the returned file in Promise
 */
export async function getCroppedImg(image: HTMLImageElement, crop: Crop): Promise<HTMLImageElement> {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx = canvas.getContext('2d');
  const pixelRatio = window.devicePixelRatio;

  if (crop && crop.width && crop.height && crop.x !== undefined && crop.y !== undefined) {
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

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
        crop.width,
        crop.height,
      );
    }
  }

  return canvasToBlob(canvas);
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>(resolve => {
    canvas.toBlob(file => {
      const newImg = document.createElement('img');
      const url = URL.createObjectURL(file);

      newImg.onload = () => {
        // no longer need to read the blob so it's revoked
        URL.revokeObjectURL(url);
      };

      newImg.src = url;

      resolve(newImg);
    }, 'image/jpeg');
  });
}
