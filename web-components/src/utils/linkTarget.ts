export function getLinkTarget(blankTarget?: boolean | null): string {
  return blankTarget ? '_blank' : '_self';
}
