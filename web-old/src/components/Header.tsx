import * as React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles, ThemeProvider} from "@material-ui/styles";
import {createMuiTheme, Theme} from "@material-ui/core";
import blue from '@material-ui/core/colors/blue'
import {grey, indigo, pink, red} from "@material-ui/core/colors";

export interface HeaderProps {

}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {},
}));

export default function Header(props: HeaderProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu" href="#">
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" color="inherit">
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

