import { ProfileModalSchemaType } from '../ProfileModal/ProfileModal.schema';

export interface Option extends ProfileModalSchemaType {
  group: string;
}

export type OptionType = Option | JSX.Element;
