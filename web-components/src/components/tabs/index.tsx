import React, { useState } from 'react';
import Tab, { TabProps } from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  DefaultTheme as Theme,
  makeStyles,
  useTheme,
  withStyles,
} from '@mui/styles';

export interface RegenTab extends TabProps {
  content?: JSX.Element;
  label: string;
}

interface RegenTabsProps {
  tabs: RegenTab[];
  background: string;
}

interface StyleProps {
  background: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: props => `url("${props.background}")`,
    backgroundSize: 'cover',
    // backgroundColor: theme.palette.background.paper,
  },
  content: {
    borderLeft: `2px solid ${theme.palette.secondary.dark}`,
    borderRight: `2px solid ${theme.palette.secondary.dark}`,
    borderBottom: `2px solid ${theme.palette.secondary.dark}`,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
}));

export function a11yProps(index: any): object {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CustomTabs = withStyles((theme: Theme) => ({
  indicator: {
    display: 'none',
  },
}))(Tabs);

const CustomTab = withStyles((theme: Theme) => ({
  root: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 800,
    letterSpacing: '1px',
    opacity: 1,
    zIndex: 1,
    borderBottom: `2px solid ${theme.palette.secondary.dark}`,
    border: `2px solid ${theme.palette.secondary.contrastText}`,
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.info.light,
    maxWidth: 'none',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      // padding: `${theme.spacing(6)} ${theme.spacing(5.5)}`,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
      padding: `${theme.spacing(7)} ${theme.spacing(26.25)}`,
      '&:last-child': {
        border: 'none',
        borderBottom: `2px solid ${theme.palette.secondary.dark}`,
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        width: '100%',
        marginLeft: 0,
        zIndex: 0,
      },
    },
    '&:not(:first-child)': {
      marginLeft: '-2px',
    },
    '&:nth-child(odd)': {
      borderTopLeftRadius: 5,
    },
    '&:nth-child(even)': {
      borderTopRightRadius: 5,
    },
  },
  selected: {
    marginLeft: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottom: 'none',
    color: theme.palette.primary.contrastText,
    backgroundColor: 'transparent',
    borderTop: `5px solid ${theme.palette.secondary.dark}`,
    borderLeft: `2px solid ${theme.palette.secondary.dark}`,
    borderRight: `2px solid ${theme.palette.secondary.dark}`,
    zIndex: 2,
  },
}))(Tab);

export default function RegenTabs({
  tabs,
  background,
}: RegenTabsProps): JSX.Element {
  const classes = useStyles({ background });
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const [value, setValue] = useState(0);

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: number,
  ): void => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div>
        <CustomTabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="tabs"
        >
          {tabs.map((tab, index) => (
            <CustomTab
              key={`tab-${index}`}
              label={tab.label}
              {...a11yProps(index)}
            />
          ))}
          {matches && <CustomTab disabled />}
        </CustomTabs>
      </div>
      {tabs.map(
        (tab, index) =>
          value === index && (
            <div key={`content-${index}`} className={classes.content}>
              {tab.content}
            </div>
          ),
      )}
    </div>
  );
}
