import { SxProps } from '@mui/material';

import { Theme } from '../../../theme/muiTheme';
import OutlinedButton from '../../buttons/OutlinedButton';
import { Title } from '../../typography';
import Card from '../Card';

export interface CreateCardProps {
  sx?: SxProps<Theme>;
  onClick: () => void;
  title?: string;
  buttonText: string;
  icon?: JSX.Element;
}

/** base component for making other create cards */
export const CreateCard = ({
  buttonText,
  icon,
  onClick,
  title,
  sx = [],
}: CreateCardProps): JSX.Element => {
  return (
    <Card
      sx={[
        theme => ({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: { xs: theme.spacing(62.5), sm: theme.spacing(92.5) },
          backgroundColor: 'info.light',
          p: { xs: 12, sm: 8, md: 12 },
          borderRadius: '10px',
          borderColor: 'grey.100',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {!!icon && icon}
      {!!title && (
        <Title variant="h4" align="center">
          {title}
        </Title>
      )}
      <OutlinedButton sx={{ width: '100%' }} onClick={onClick}>
        {buttonText}
      </OutlinedButton>
    </Card>
  );
};
