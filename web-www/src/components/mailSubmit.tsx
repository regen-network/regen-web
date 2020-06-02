import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& #mlb2-2154348.ml-form-embedContainer div.ml-form-embedWrapper': {
      'background-color': 'rgba(0,0,0,0)',
    },
  },
}));

interface propTypes {}
const MailSubmit = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div
      className={clsx('ml-form-embed', classes.root)}
      data-account="1227754:o0l3c1z1f3"
      data-form="2154348:v8j6q8"
    ></div>
  );
};

MailSubmit.propTypes = {
  siteTitle: PropTypes.string,
};

MailSubmit.defaultProps = {
  siteTitle: ``,
};

export default MailSubmit;
