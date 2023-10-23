import { Box, Card, CardMedia, SxProps } from '@mui/material';

import { Theme } from '../../../theme/muiTheme';
import { ButtonType } from '../../../types/shared/buttonType';
import { LinkComponentType } from '../../../types/shared/linkComponentType';
import { sxToArray } from '../../../utils/mui/sxToArray';
import { truncateTwoLines } from '../../../utils/mui/truncate';
import OutlinedButton from '../../buttons/OutlinedButton';
import { CreditPrice } from '../../cards/ProjectCard/ProjectCard.CreditPrice';
import { PurchaseInfo } from '../../cards/ProjectCard/ProjectCard.types';
import { Title } from '../../typography';

export interface Props {
  name: string;
  imgSrc: string;
  purchaseInfo?: PurchaseInfo;
  button: ButtonType;
  href?: string;
  className?: string;
  LinkComponent?: LinkComponentType;
  sx?: SxProps<Theme>;
}

export const CreditClassGridCard = ({
  button,
  imgSrc,
  href,
  name,
  purchaseInfo,
  className,
  LinkComponent = ({ children }) => <>{children}</>,
  sx = [],
}: Props): JSX.Element => {
  const { text, disabled, startIcon, onClick } = button;

  return (
    <Card
      elevation={1}
      sx={[
        {
          border: '1px solid',
          borderColor: 'grey.100',
          borderRadius: '10px',
        },
        ...sxToArray(sx),
      ]}
      className={className}
    >
      <LinkComponent href={href ?? ''}>
        <CardMedia
          image={imgSrc ?? ''}
          sx={{ with: '100%', height: '176px' }}
        />
      </LinkComponent>
      <Box sx={{ p: 5, pb: 6.25 }}>
        <Title variant="h5" sx={[truncateTwoLines, { mb: 5, height: '57px' }]}>
          {name}
        </Title>
        <CreditPrice purchaseInfo={purchaseInfo} sx={{ mb: 5 }} />
        <OutlinedButton
          onClick={onClick}
          size="small"
          startIcon={startIcon}
          disabled={disabled}
          sx={{ width: '100%' }}
        >
          {text}
        </OutlinedButton>
      </Box>
    </Card>
  );
};
