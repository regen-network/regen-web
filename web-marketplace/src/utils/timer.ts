export const timer = (ms: number): Promise<NodeJS.Timeout> =>
  new Promise(res => setTimeout(res, ms));
