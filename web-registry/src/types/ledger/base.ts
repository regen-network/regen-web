// This should be removed once we migrate
// the current queries to use regen-js instead of REST

export interface PageResponse {
  next_key: string | null;
  total: string;
}
