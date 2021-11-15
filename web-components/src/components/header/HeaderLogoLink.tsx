import React, { useEffect, useState } from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import RegenIcon from '../icons/RegenIcon';

const useStyles = makeStyles<Theme, { isLoaded: boolean }>(theme => {
  const { pxToRem } = theme.typography;

  return {
    icon: props => ({
      display: props.isLoaded ? 'block' : 'inline-block',
      height: 'auto',
      width: pxToRem(186),
      [theme.breakpoints.down('md')]: {
        width: pxToRem(111),
      },
      [theme.breakpoints.down('sm')]: {
        width: pxToRem(104),
      },
    }),
  };
});

export const HeaderLogoLink: React.FC<{ color: string }> = ({ color }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const styles = useStyles({ isLoaded });

  // TODO: this is a hack to make the SVG render properly in safari - it's not a
  // perfect solution but should work until we can dedicate time to find
  // something more long-term. You can see the bug by visiting the /community
  // page in safari
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.location &&
      window.location.href
    )
      setIsLoaded(!isLoaded);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <a href="/">
      <RegenIcon className={styles.icon} color={color} />
    </a>
  );
};
