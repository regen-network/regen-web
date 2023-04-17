import React from 'react';
import { Box } from '@mui/material';

import { formatDate } from 'web-components/lib/utils/format';

import { Document, Maybe } from 'generated/graphql';

type Props = {
  document: Maybe<Document>;
};

const getDocumentationTableRow = ({ document }: Props): React.ReactNode[] => {
  const { name, type, createdAt } = document ?? {};
  return [
    <Box sx={{ color: 'info.main' }}>{name}</Box>,
    <Box sx={{ color: 'info.main' }}>{type}</Box>,
    <Box sx={{ color: 'info.main' }}>{formatDate(createdAt)}</Box>,
  ];
};

export default getDocumentationTableRow;
