export default function getRegistryUrl(path: string): string {
  return process.env.NODE_ENV !== 'production' || process.env.REACT_APP_DEPLOY_PREVIEW === 'true'
    ? `${window.location.origin}${path}`
    : `${window.location.origin}/registry${path}`;
}
