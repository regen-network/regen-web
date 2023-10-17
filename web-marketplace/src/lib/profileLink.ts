function getProfileLink(accountAddressOrId: string) {
  return `${window.location.origin}/profiles/${accountAddressOrId}/portfolio`;
}

export { getProfileLink };
