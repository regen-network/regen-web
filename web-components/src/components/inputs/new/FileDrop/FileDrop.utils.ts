// Convert file to base64 string
export const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const isImage = (mimeType?: string) => mimeType?.includes('image/');
export const isVideo = (mimeType?: string) => mimeType?.includes('video/');
export const isAudio = (mimeType?: string) => mimeType?.includes('audio/');
