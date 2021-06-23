import React from 'react';
import { makeStyles, Theme, SvgIcon } from '@material-ui/core';
import clsx from 'clsx';
import ReactHtmlParser from 'react-html-parser';

import Card from '../cards/Card';
import CheckIcon from '../icons/CheckIcon';
import InfoIconOutlined from '../icons/InfoIconOutlined';
import InfoTooltip from '../tooltip/InfoTooltip';
import Item from '../sliders/Item';

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
    height: 197, //
    width: 350.5, //
    padding: theme.spacing(5, 8),
    [theme.breakpoints.up('sm')]: {
      marginRight: 21.5, //
      marginBottom: 20, //
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: 13, //
    },
  },
  top: {
    display: 'flex',
    width: '100%',
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
    marginTop: -8,
    marginRight: -20,
    cursor: 'pointer',
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

    color: theme.palette.info.dark,
    fontSize: theme.typography.pxToRem(14),
    paddingTop: theme.spacing(3),
  },
  check: {
    height: 17,
    width: 17,
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
