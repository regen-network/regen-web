import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { SDG } from 'web-components/lib/components/cards/ProjectTopCard';

interface Props {
  sdgs: SDG[];
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  image: {
    borderRadius: 2,
    [theme.breakpoints.up('sm')]: {
      height: theme.typography.pxToRem(200),
      marginRight: theme.spacing(8),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.typography.pxToRem(100),
      marginRight: theme.spacing(4),
    },
  },
  sdgs: {
    display: 'flex',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      width: `calc(100% + ${theme.spacing(8)})`,
      marginLeft: theme.spacing(-4),
      paddingLeft: theme.spacing(4),
    },
  },
}));

function SDGs({ sdgs }: Props): JSX.Element {
  const styles = useStyles();

  return (
    <div className={styles.sdgs}>
      {sdgs.map((sdg: SDG) => (
        <img key={sdg.title} className={styles.image} alt={sdg.imageUrl} src={sdg.imageUrl} />
      ))}
    </div>
  );
}

export { SDGs };
