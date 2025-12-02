export type VisibilitySwitchProps = {
  checked: boolean;
  disabled?: boolean;
  isCurrentUser?: boolean;
  onChange: (val: boolean) => void;
};
