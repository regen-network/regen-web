export const getBackground = (index: number, value: number) => {
  const percentage = `${Math.min(100, 55 + index * value)}%`;
  // eslint-disable-next-line lingui/no-unlocalized-strings
  return `linear-gradient(-8deg, rgba(var(--sc-card-credibility-diagonal-background) / 1) ${percentage}, transparent ${percentage})`;
};
