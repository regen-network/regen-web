import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core';

import DropdownIcon from '../icons/DropdownIcon';

interface UserAddressProps {
  onClick: () => void;
  name: string;
  address: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.info.dark,
    lineHeight: '150%',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
    },
  },
  name: {
    cursor: 'pointer',
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
  },
  icon: {
    width: theme.spacing(3.25),
    height: theme.spacing(2.5),
    cursor: 'pointer',
    paddingLeft: theme.spacing(0.5),
  },
}));

export default function UserAddress({ onClick, name, address }: UserAddressProps): JSX.Element {
  const classes = useStyles();
  const [showAddress, setShowAddress] = useState<boolean>(false);

  const handleClick = (): void => {
    setShowAddress(prev => !prev);
  };

  return (
    <div className={classes.root}>
      <div onClick={onClick} className={classes.name}>
        {name}:
      </div>
      <div>
        {showAddress ? address : address.substring(0, 12)}
        <DropdownIcon
          onClick={handleClick}
          direction={showAddress ? 'prev' : 'next'}
          className={classes.icon}
        ></DropdownIcon>
      </div>
    </div>
  );
}
