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
