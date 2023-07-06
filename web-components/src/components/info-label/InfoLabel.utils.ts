import { Theme } from '../../theme/muiTheme';
import { InfoLabelVariant } from './InfoLabel.types';

type GetInfoLabelColorParams = {
  theme: Theme;
};

export const getInfoLabelColorMapping = ({
  theme,
}: GetInfoLabelColorParams): Record<InfoLabelVariant, string> => ({
  default: theme.palette.info.light,
  success: theme.palette.secondary.light,
  complete: theme.palette.secondary.light,
  pending: theme.palette.warning.contrastText,
  error: theme.palette.error.contrastText,
});
