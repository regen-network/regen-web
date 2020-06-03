import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& #mlb2-2154348.ml-form-embedContainer div.ml-form-embedWrapper': {
      'background-color': 'rgba(0,0,0,0)',
    },
    '& #mlb2-2154348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody div.ml-form-successContent h4': {
      'text-align': 'center',
      color: '#fff',
    },
    '& #mlb2-2154348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody div.ml-form-successContent p': {
      'text-align': 'center',
      color: '#fff',
    },
  },
}));

interface propTypes {}
const MailSubmit = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div
      className={clsx('ml-form-embed', classes.root)}
      data-account={`${process.env.GATSBY_MAILERLITE_DATA_ACCOUNT}`}
      data-form={`${process.env.GATSBY_MAILERLITE_DATA_FORM}`}
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
