export const isSelected = (path: string, location: string) => {
  return path === location.substring(location.lastIndexOf('/') + 1);
};
