import { useState } from 'react';
import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { makeStyles } from 'tss-react/mui';

import copyTextToClipboard from '../../utils/copy';
import Banner from '../banner';
import LinkIcon from './LinkIcon';
import FacebookIcon from './social/FacebookIcon';
import LinkedInIcon from './social/LinkedInIcon';
import TelegramIcon from './social/TelegramIcon';
import TwitterIcon from './social/TwitterIcon';

interface ShareIconsProps {
  url: string;
  twitterShare?: string;
  telegramShare?: string;
  xsSize?: string | number;
}

interface StyleProps {
  xsSize?: string | number;
}

const useStyles = makeStyles<StyleProps>()((theme, { xsSize }) => ({
  iconContainer: {
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: '50%',
    display: 'block',
    width: theme.spacing(12.5),
    height: theme.spacing(12.5),
    [theme.breakpoints.down('sm')]: {
      width: xsSize || theme.spacing(12.5),
      height: xsSize || theme.spacing(12.5),
    },
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    '& svg': {
      color: 'transparent',
      width: '100%',
      height: '100%',
    },
  },
  small: {
    padding: theme.spacing(2),
  },
  root: {
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'left',
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));

export default function ShareIcons({
  url,
  twitterShare = '',
  telegramShare = '',
  xsSize,
}: ShareIconsProps): JSX.Element {
  const theme = useTheme();
  const { classes } = useStyles({ xsSize });
  const [copied, setCopied] = useState(false);

  return (
    <>
      <Grid container className={classes.root} spacing={4}>
        <Grid item>
          <a
            href={`https://twitter.com/intent/tweet?url=${url}&text=${twitterShare}`}
            rel="noopener noreferrer"
            target="_blank"
            className={classes.iconContainer}
          >
            <TwitterIcon
              color={theme.palette.primary.main}
              hoverColor={theme.palette.secondary.main}
            />
          </a>
        </Grid>
        <Grid item>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            rel="noopener noreferrer"
            target="_blank"
            className={classes.iconContainer}
          >
            <FacebookIcon
              color={theme.palette.primary.main}
              hoverColor={theme.palette.secondary.main}
            />
          </a>
        </Grid>
        <Grid item>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
            rel="noopener noreferrer"
            target="_blank"
            className={classes.iconContainer}
          >
            <LinkedInIcon
              color={theme.palette.primary.main}
              hoverColor={theme.palette.secondary.main}
            />
          </a>
        </Grid>
        <Grid item>
          <a
            href={`https://t.me/share/url?url=${url}&text=${telegramShare}`}
            rel="noopener noreferrer"
            target="_blank"
            className={classes.iconContainer}
          >
            <TelegramIcon
              color={theme.palette.primary.main}
              hoverColor={theme.palette.secondary.main}
            />
          </a>
        </Grid>
        <Grid item>
          <div
            onClick={() => copyTextToClipboard(url).then(() => setCopied(true))}
            className={classes.iconContainer}
          >
            <LinkIcon
              className={classes.small}
              color={theme.palette.primary.main}
              hoverColor={theme.palette.secondary.main}
            />
          </div>
        </Grid>
      </Grid>
      {copied && <Banner text="Link copied to your clipboard" />}
    </>
  );
}
