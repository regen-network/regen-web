import React from 'react';
import { CircularProgress } from '@mui/material';

type Props = {
  isLoading: boolean;
  children: JSX.Element;
};

const WithLoader = ({ isLoading, children }: Props): JSX.Element => {
  if (isLoading) {
    return <CircularProgress color="secondary" />;
  }

  return children;
};

export default WithLoader;
