import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';

import Card from '../cards/Card';
import CheckIcon from '../icons/CheckIcon';
import InfoIconOutlined from '../icons/InfoIconOutlined';
import InfoTooltip from '../tooltip/InfoTooltip';
import { Body, Label } from '../typography';

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
    // <Card className={clsx(className, styles.root, classes && classes.root)}>
    <Card
      className={clsx(className, classes?.root)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderColor: 'grey.100',
        width: { sm: 350 },
        minWidth: [278],
        minHeight: [163, 183],
        mr: [3.25, 5.375],
        mb: 5,
        px: [4, 8],
        py: [4, 5],
        position: 'relative',
      }}
    >
      <Box sx={{ display: 'flex', width: '100%', minHeight: 72 }}>
        <Box sx={{ display: 'flex', flex: 1 }} />
        {icon && (
          <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            {icon}
          </Box>
        )}
        <Box sx={{ display: 'flex', flex: 1, alignItems: 'flex-start' }}>
          {item.tooltip && (
            <InfoTooltip title={item.tooltip || ''} arrow placement="top">
              <Box
                sx={{
                  ml: 'auto',
                  cursor: 'pointer',
                  mt: [-1.5, -2],
                  mr: [-2, -5],
                }}
              >
                <InfoIconOutlined />
              </Box>
            </InfoTooltip>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Box display="flex" justifyContent="center" pt={2}>
          <Label size="sm" mobileSize="sm">
            <CheckIcon className={styles.check} />
            {item.title}
          </Label>
        </Box>
        <Body as="div" size="sm" sx={{ textAlign: 'center', pt: 3 }}>
          {item.description}
        </Body>
      </Box>
    </Card>
  );
}

export { OverviewCard };
