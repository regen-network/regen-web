import { SxProps } from '@mui/material';
import { Theme } from '~/theme/muiTheme';
import Card from '../Card';
import { Title } from '../../typography';
import OutlinedButton from '../../buttons/OutlinedButton';

export interface DashboardCreateCardProps {
  sx?: SxProps<Theme>;
  onClick: () => void;
  title?: string;
  buttonText: string;
  icon?: JSX.Element | null | false;
}

export const DashboardCreateCard = ({
  buttonText,
  icon,
  onClick,
  title,
  sx = [],
}: DashboardCreateCardProps) => {
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
