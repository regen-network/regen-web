import { Theme } from 'src/theme/muiTheme';

import { InfoLabelVariant } from './InfoLabel.types';

type GetInfoLabelColorParams = {
  theme: Theme;
};

export const getInfoLabelColorMapping = ({
  theme,
}: GetInfoLabelColorParams): Record<InfoLabelVariant, string> => ({
  default: theme.palette.info.light,
  success: theme.palette.secondary.light,
});
