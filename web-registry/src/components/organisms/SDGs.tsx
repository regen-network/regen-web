import React from 'react';
import { makeStyles } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';
import { getSanityImgSrc } from '../../lib/imgSrc';
import { Sdg, Maybe } from '../../generated/sanity-graphql';

interface Props {
  sdgs: Array<Maybe<Sdg>>;
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  image: {
    borderRadius: 2,
    [theme.breakpoints.up('sm')]: {
      height: theme.typography.pxToRem(200),
      marginRight: theme.spacing(8),
    },
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
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
      {sdgs.map((sdg, i) => (
        <img
          key={sdg?.title || i}
          className={styles.image}
          alt={sdg?.title || getSanityImgSrc(sdg?.image)}
          src={getSanityImgSrc(sdg?.image)}
        />
      ))}
    </div>
  );
}

export { SDGs };
