import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';

import Card from '../cards/Card';
import CheckIcon from '../icons/CheckIcon';
import InfoIconOutlined from '../icons/InfoIconOutlined';
import InfoTooltip from '../tooltip/InfoTooltip';
import { Body, ButtonText } from '../typography';

interface OverviewCardProps {
  className?: string;
  classes?: {
    root?: string;
    icon?: string;
  };
  icon?: JSX.Element;
  item: OverviewItem;
}

interface OverviewItem {
  title: string;
  description: JSX.Element | string;
  tooltip?: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: theme.palette.grey[100],
    minWidth: theme.spacing(57.75),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(87.625),
      height: theme.spacing(45.75),
      padding: theme.spacing(5, 8),
      marginRight: theme.spacing(5.375),
      marginBottom: theme.spacing(5),
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: theme.spacing(69.5),
      minHeight: theme.spacing(40.75),
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
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(-1.5),
      marginRight: theme.spacing(-2),
    },
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  check: {
    height: theme.spacing(4.25),
    width: theme.spacing(4.25),
    marginRight: theme.spacing(1.715),
    display: 'inline-block',
  },
}));

function OverviewCard({
  className,
  classes,
  icon,
  item,
}: OverviewCardProps): JSX.Element {
  const styles = useStyles();

  return (
    <Card className={clsx(className, styles.root, classes && classes.root)}>
      <div className={styles.top}>
        <div className={clsx(styles.cardTopThird)} />
        {icon && (
          <div className={clsx(styles.cardTopThird, styles.iconWrap)}>
            {icon}
          </div>
        )}
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
        <Box display="flex" justifyContent="center" pt={2}>
          <ButtonText size="sm" mobileSize="sm">
            <CheckIcon className={styles.check} />
            {item.title}
          </ButtonText>
        </Box>
        <Body size="sm" sx={{ textAlign: 'center', pt: 3 }}>
          {item.description}
        </Body>
      </div>
    </Card>
  );
}

export { OverviewCard };
