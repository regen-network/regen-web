export default function getRegistryUrl(path: string): string {
  return process.env.NODE_ENV === 'production'
    ? `${window.location.origin}/registry${path}`
    : `${window.location.origin}${path}`;
}
