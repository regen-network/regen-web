import { AutocompleteRenderGroupParams, Box } from '@mui/material';

type NoGroupProps = { params: AutocompleteRenderGroupParams };

export const NoGroup: React.FC<NoGroupProps> = ({ params }) => (
  <>
    <Box
      component="hr"
      sx={{
        borderTop: '1px solid',
        borderTopColor: 'grey.100',
      }}
    />
    {params.children}
  </>
);
