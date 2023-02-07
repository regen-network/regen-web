export const getEventsKey = (events?: string[]): string =>
  events?.join(',') ?? '';
