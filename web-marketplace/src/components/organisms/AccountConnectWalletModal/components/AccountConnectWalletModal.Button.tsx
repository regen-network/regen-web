import { Box } from '@mui/system';
import Image from 'next/image';

import { Title } from 'web-components/src/components/typography';

import { LoginProvider } from 'components/organisms/LoginModal/LoginModal.types';

export interface Props {
  provider: LoginProvider;
}

const LoginModalButton = ({ provider: { name, onClick, image } }: Props) => (
  <Box
    component="button"
    sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      border: theme => `1px solid ${theme.palette.grey['100']}`,
      backgroundColor: 'primary.main',
      borderRadius: '2px',
      cursor: 'pointer',
      py: 4.25,
      boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.15)',
    }}
    onClick={onClick}
    key={name}
  >
    <Image className="h-40 pb-[4px] object-contain" src={image} alt={name} />
    <Title variant="h6">{name}</Title>
  </Box>
);

export { LoginModalButton };
