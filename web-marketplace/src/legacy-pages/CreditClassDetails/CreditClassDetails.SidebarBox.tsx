import { Flex } from 'web-components/src/components/box';

const SideBarBox: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <Flex
      col
      sx={{
        borderRadius: '10px',
        border: theme => `1px solid ${theme.palette.grey[100]}`,
        bgcolor: 'primary.main',
        px: 5,
        py: 11,
        my: { xs: 4, sm: 0 },
        minWidth: theme => ['0', theme.spacing(91.75)],
      }}
    >
      {children}
    </Flex>
  );
};

export { SideBarBox };
