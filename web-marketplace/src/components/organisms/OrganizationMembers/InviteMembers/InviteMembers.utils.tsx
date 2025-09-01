import { BaseMemberRole } from '../../BaseMembersTable/BaseMembersTable.types';

export const shortenAddress = (addr: string): string => {
  if (addr.length <= 15) return addr;
  return `${addr.slice(0, 9)}...${addr.slice(-6)}`;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidRegenAddress = (address: string): boolean => {
  return (
    address.startsWith('regen1') && address.length >= 39 && address.length <= 45
  );
};

export const isValidAddressOrEmail = (
  value: string,
  role: BaseMemberRole | undefined,
): boolean => {
  if (!value.trim()) return false;
  const match = value.match(/^(.+)\s\((.+)\)$/);
  if (match) {
    return true;
  }
  if (role === 'admin' || role === 'editor') {
    return isValidRegenAddress(value);
  }

  return isValidEmail(value) || isValidRegenAddress(value);
};

export const getValidationError = (
  addressOrEmail: string,
  role: BaseMemberRole | undefined,
  REGEN_ADDRESS_REQUIRED_ERROR: string,
  INVALID_EMAIL_ERROR: string,
  INVALID_REGEN_ADDRESS_ERROR: string,
): string | null => {
  if (!addressOrEmail.trim()) return null;
  const match = addressOrEmail.match(/^(.+)\s\((.+)\)$/);
  if (match) {
    return null;
  }
  if (role === 'admin' || role === 'editor') {
    if (!isValidRegenAddress(addressOrEmail)) {
      return REGEN_ADDRESS_REQUIRED_ERROR;
    }
  } else {
    if (!isValidEmail(addressOrEmail) && !isValidRegenAddress(addressOrEmail)) {
      if (addressOrEmail.includes('@')) {
        return INVALID_EMAIL_ERROR;
      } else if (addressOrEmail.startsWith('regen')) {
        return INVALID_REGEN_ADDRESS_ERROR;
      } else {
        return INVALID_EMAIL_ERROR;
      }
    }
  }

  return null;
};

export const getDisplayValue = (addressOrEmail: string): string => {
  const match = addressOrEmail.match(/^(.+)\s\((.+)\)$/);
  if (match) {
    const [, name, address] = match;
    return `${name} (${shortenAddress(address)})`;
  }
  return addressOrEmail;
};
