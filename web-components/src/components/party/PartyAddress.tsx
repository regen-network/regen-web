import React, { useState } from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';

import DropdownIcon from '../icons/DropdownIcon';
import { User } from '../user/UserInfo';

interface PartyAddressProps {
  name: string;
  address: string;
  onClick: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.info.dark,
    lineHeight: '150%',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('sm')]: {
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

export default function PartyAddress({
  onClick,
  name,
  address,
}: PartyAddressProps): JSX.Element {
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
