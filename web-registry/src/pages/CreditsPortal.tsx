import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Title from 'web-components/lib/components/title';
import { useAllProjectsQuery, useIssueCreditsMutation } from '../generated/graphql';
import { CreditsIssue } from './CreditsIssue';
import { CreditsTransfer } from './CreditsTransfer';
import { CreditsRetire } from './CreditsRetire';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5),
  },
  ownershipTitle: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(4),
    fontSize: '1.3rem',
  },
  input: {
    padding: theme.spacing(1),
  },
  form: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  button: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const CreditsPortal: React.FC = () => {
  return (
    <Box>
      <CreditsIssue />
      <CreditsTransfer />
      <CreditsRetire />
    </Box>
  );
};

export { CreditsPortal };
