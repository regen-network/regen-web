import { Box, useTheme } from '@mui/material';

import UserInfoCard, { Account } from '../../../components/user/UserInfoCard';

type Props = {
  program?: Account;
};

export const ProgramImageChildren = ({ program }: Props) => {
  const theme = useTheme();

  return (
    <>
      {program && (
        <Box
          sx={{
            position: 'absolute',
            bottom: theme.spacing(3.75),
            left: theme.spacing(5),
          }}
        >
          <UserInfoCard user={program} />
        </Box>
      )}
    </>
  );
};
