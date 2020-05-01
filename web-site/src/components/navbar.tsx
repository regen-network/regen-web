import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import DropdownCategory from './dropdownCategory';
import Link from './link';

const useStyles = makeStyles((theme: Theme) => ({
  io: {},
}));
export default function Navbar(): JSX.Element {
  const classes = useStyles({});
  // TODO: Add search/menu logic
  return (
    <div id="navbar" className={classes.io}>
      <DropdownCategory name="Pilots">
        <Link anchor="Rainforest Foundation" target="https://www.regen.network/rainforestfoundation.html" />
      </DropdownCategory>
      <DropdownCategory name="Resources" />
      <DropdownCategory name="Community" />
    </div>
  );
}
