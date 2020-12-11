export default function getOrigin(): string {
  return process.env.NODE_ENV === 'production'
    ? `${window.location.origin}/registry`
    : `${window.location.origin}`;
}
