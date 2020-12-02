function fallbackCopyTextToClipboard(text: string): Promise<any> {
  const textArea = document.createElement('textarea');
  textArea.setAttribute('readonly', 'true');
  textArea.setAttribute('contenteditable', 'true');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  return new Promise((resolve, reject) => {
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      resolve();
    } catch (err) {
      document.body.removeChild(textArea);
      reject(err);
    }
  });
}

export default function copyTextToClipboard(text: string): Promise<any> {
  if (!navigator.clipboard) {
    return fallbackCopyTextToClipboard(text);
  }
  return new Promise((resolve, reject) =>
    navigator.clipboard.writeText(text).then(
      () => resolve(),
      err => reject(err),
    ),
  );
}
