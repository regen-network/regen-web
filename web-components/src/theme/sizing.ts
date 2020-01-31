export interface Sizes {
  xs: number;
  sm: number;
}

export interface FontSizes {
  xs: string;
  sm: string;
}

export function getSize(size?: string): Sizes {
  let spacing: Sizes;
  switch (size) {
    case 'xl':
      spacing = { xs: 12.5, sm: 16 };
      break;
    case 'big':
      spacing = { xs: 10, sm: 12 };
      break;
    case 'medium':
      spacing = { xs: 7, sm: 10 };
      break;
    case 'small':
      spacing = { xs: 7, sm: 7 };
      break;
    default:
      spacing = { xs: 7, sm: 10 };
      break;
  }
  return spacing;
}

export function getFontSize(size?: string): FontSizes {
  let fontSize: FontSizes;
  switch (size) {
    case 'xl':
      fontSize = { xs: '1.125rem', sm: '1.3125em' };
      break;
    case 'big':
      fontSize = { xs: '1rem', sm: '1.125rem' };
      break;
    case 'medium':
      fontSize = { xs: '0.875rem', sm: '1rem' };
      break;
    case 'small':
      fontSize = { xs: '0.75rem', sm: '0.875rem' };
      break;
    default:
      fontSize = { xs: '0.875rem', sm: '1rem' };
      break;
  }
  return fontSize;
}
