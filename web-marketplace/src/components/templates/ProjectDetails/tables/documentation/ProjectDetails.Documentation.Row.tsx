import React from 'react';
import { Box } from '@mui/material';

import DocumentIcon from 'web-components/lib/components/icons/DocumentIcon';
import { formatDate } from 'web-components/lib/utils/format';

import { Document, Maybe } from 'generated/graphql';

type Props = {
  document: Maybe<Document>;
};

const getDocumentationTableRow = ({ document }: Props): React.ReactNode[] => {
  const { name, type, date } = document ?? {};
  return [
    <Box
      sx={{
        color: 'info.dark',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <DocumentIcon
        fileType={name?.split('.')?.pop()}
        sx={{ mr: 3, opacity: 0.75 }}
      />
      {name}
    </Box>,
    <Box sx={{ color: 'info.dark' }}>{type}</Box>,
    <Box sx={{ color: 'info.dark' }}>{formatDate(date)}</Box>,
  ];
};

export default getDocumentationTableRow;
