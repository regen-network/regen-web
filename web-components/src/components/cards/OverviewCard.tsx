import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import ReactHtmlParser from 'react-html-parser';

import Card from '../cards/Card';
import CheckIcon from '../icons/CheckIcon';
import InfoIconOutlined from '../icons/InfoIconOutlined';
import InfoTooltip from '../tooltip/InfoTooltip';

interface OverviewCardProps {
  className?: string;
  classes?: {
    root?: string;
    icon?: string;
  };
  icon: JSX.Element;
  item: OverviewItem;
}
interface OverviewItem {
  title: string;
  description: string;
  tooltip?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: theme.palette.grey[100],
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(87.625),
      minHeight: theme.spacing(45.75),
      maxHeight: theme.spacing(49.25),
      padding: theme.spacing(5, 8),
      marginRight: theme.spacing(5.375),
      marginBottom: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: theme.spacing(69.5),
      minHeight: theme.spacing(40.75),
      maxHeight: theme.spacing(49.25),
      padding: theme.spacing(4),
      marginRight: theme.spacing(3.25),
    },
    '& a': {
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  top: {
    display: 'flex',
    width: '100%',
    height: theme.spacing(18),
  },
  cardTopThird: {
    display: 'flex',
    flex: 1,
  },
  cardTopRight: {
    alignItems: 'flex-start',
  },
  iconWrap: {
    justifyContent: 'center',
  },
  info: {
    marginLeft: 'auto',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(-2),
      marginRight: theme.spacing(-5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(-1.5),
      marginRight: theme.spacing(-2),
    },
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: theme.typography.pxToRem(14),
    fontFamily: theme.typography.h1.fontFamily,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingTop: theme.spacing(2),
  },
  description: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexWrap: 'wrap',
    color: theme.palette.info.dark,
    fontSize: theme.typography.pxToRem(14),
    paddingTop: theme.spacing(3),
  },
  check: {
    height: theme.spacing(4.25),
    width: theme.spacing(4.25),
    marginRight: theme.spacing(1.715),
  },
}));

function OverviewCard({ className, classes, icon, item }: OverviewCardProps): JSX.Element {
  const styles = useStyles();

  return (
    <Card className={clsx(className, styles.root, classes && classes.root)}>
      <div className={styles.top}>
        <div className={clsx(styles.cardTopThird)}></div>
        <div className={clsx(styles.cardTopThird, styles.iconWrap)}>{icon}</div>
        <div className={clsx(styles.cardTopThird, styles.cardTopRight)}>
          {item.tooltip && (
            <InfoTooltip title={item.tooltip || ''} arrow placement="top">
              <div className={styles.info}>
                <InfoIconOutlined />
              </div>
            </InfoTooltip>
          )}
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.title}>
          <CheckIcon className={styles.check} />
          {item.title}
        </div>
        <div className={styles.description}>{ReactHtmlParser(item.description)}</div>
      </div>
    </Card>
  );
}

export { OverviewCard };
