import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: theme.spacing(163.75),
    margin: '0 auto',
    '& #mlb2-2154348.ml-form-embedContainer': {
      '& div.ml-form-embedWrapper': {
        maxWidth: '100%',
        'background-color': 'rgba(0,0,0,0)',
        '& .ml-form-embedBody': {
          padding: 0,
          '& .ml-form-formContent.horozintalForm': {
            '& .ml-form-horizontalRow .horizontal-fields': {
              [theme.breakpoints.down('xs')]: {
                paddingRight: `${theme.spacing(1.75)} !important`,
              },
              [theme.breakpoints.up('sm')]: {
                paddingRight: theme.spacing(3.25),
              },
            },
          },
          '& .ml-form-horizontalRow': {
            display: 'flex',
            '& .ml-input-horizontal': {
              width: '70% !important',
            },
            '& .ml-button-horizontal': {
              width: '30% !important',
            },
            '& input': {
              borderRadius: '2px',
              border: 'none !important',
              lineHeight: '150%',
              [theme.breakpoints.down('xs')]: {
                fontSize: `${theme.spacing(4)} !important`,
                height: theme.spacing(15),
                padding: `${theme.spacing(5)} !important`,
                marginRight: theme.spacing(1.75),
              },
              [theme.breakpoints.up('sm')]: {
                height: theme.spacing(17.75),
                fontSize: `${theme.spacing(4.5)} !important`,
                padding: `${theme.spacing(5)} !important`,
                marginRight: theme.spacing(3.25),
              },
            },
            '& button': {
              fontFamily: theme.typography.h1.fontFamily,
              fontWeight: 800,
              backgroundColor: `${theme.palette.secondary.main} !important`,
              borderRadius: '2px',
              border: 'none !important',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              [theme.breakpoints.down('xs')]: {
                fontSize: `${theme.spacing(3.5)} !important`,
                padding: `${theme.spacing(3)} 0 !important`,
                lineHeight: theme.spacing(4.5),
                height: theme.spacing(15),
              },
              [theme.breakpoints.up('sm')]: {
                fontSize: `${theme.spacing(5.25)} !important`,
                padding: `${theme.spacing(4.5)} 0 !important`,
                lineHeight: theme.spacing(6.5),
                height: theme.spacing(17.75),
              },
              '&:hover': {
                backgroundColor: '#7BC796 !important',
              },
            },
          },
        },
        '& .ml-form-successBody div.ml-form-successContent h4': {
          'text-align': 'center',
          color: '#fff',
        },
        '& .ml-form-successBody div.ml-form-successContent h4, .ml-form-successBody div.ml-form-successContent p': {
          'text-align': 'center',
          color: '#fff',
        },
      },
    },
  },
}));

interface propTypes {}
const MailSubmit = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div
      className={clsx('ml-form-embed', classes.root)}
      data-account={process.env.GATSBY_MAILERLITE_DATA_ACCOUNT}
      data-form={process.env.GATSBY_MAILERLITE_DATA_FORM}
    ></div>
  );
};

export default MailSubmit;
