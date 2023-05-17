export const getBackground = (index: number, value: number) => {
  const percentage = `${Math.min(100, 55 + index * value)}%`;
  return `linear-gradient(-8deg, #F1F7F6 ${percentage}, transparent ${percentage})`;
};
