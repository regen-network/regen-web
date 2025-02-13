export const toggleFilter = (id: string) => {
  return (prev: Record<string, boolean>) => ({ ...prev, [id]: !prev[id] });
};
