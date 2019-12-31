export function getSize(size?: string): number {
  let spacing: number;
  switch(size) {
    case 'big':
      spacing = 14.5;
      break;
    case 'medium':
      spacing = 10;
      break;
    case 'small':
      spacing = 7;
      break;
    default:
      spacing = 10;
      break;
  }
  return spacing;
}

export function getFontSize(size?: string): string {
  let fontSize: string;
  switch(size) {
    case 'big':
      fontSize = '1.125';
      break;
    case 'medium':
      fontSize = '1';
      break;
    case 'small':
      fontSize = '0.875';
      break;
    default:
      fontSize = '1';
      break;
  }
  return fontSize + 'rem';
}
