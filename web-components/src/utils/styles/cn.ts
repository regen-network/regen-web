import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names and applies Tailwind CSS styles.
 * clsx(...inputs) allows to use of various syntaxes to apply style (object, array, condition...).
 * twMerge(...) ensures that the classes applied at the end will override previous ones in case of conflict.
 * @param inputs - The class names to merge.
 * @returns The merged class names with Tailwind CSS styles applied.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
