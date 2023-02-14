export type NestedPartial<K> = {
  [attr in keyof K]?: K[attr] extends object ? NestedPartial<K[attr]> : K[attr];
};
