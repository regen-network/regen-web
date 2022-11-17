import Grid from '@mui/material/Grid';
import { makeStyles } from 'tss-react/mui';

import { Body, Title } from '../typography';

export interface ImageGridProps {
  img: JSX.Element; // using pure img tag or gatsby-image
  title: string;
  description: string | JSX.Element;
  even: boolean;
}

export interface StyleProps {
  even: boolean;
}

const useStyles = makeStyles<StyleProps>()((theme, { even }) => ({
  root: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      flexDirection: even ? 'row-reverse' : 'row',
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      flexDirection: 'column',
    },
  },
  text: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: even ? theme.spacing(37.5) : theme.spacing(10),
      paddingRight: even ? theme.spacing(10) : theme.spacing(37.5),
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      flexGrow: 0,
      flexBasis: '50%',
      maxWidth: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: even ? theme.spacing(5) : theme.spacing(10),
      paddingRight: even ? theme.spacing(10) : theme.spacing(5),
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(18.25),
      flexGrow: 0,
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      lineHeight: '130%',
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      lineHeight: '145%',
      marginBottom: theme.spacing(3.5),
    },
    [theme.breakpoints.between('md', 'xl')]: {
      maxWidth: theme.spacing(115.5),
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: theme.spacing(145),
    },
    marginLeft: even ? 'auto' : 0,
    marginRight: even ? 0 : 'auto',
  },
  image: {
    height: '100%',
    width: '100%',
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      flexGrow: 0,
      flexBasis: '50%',
      maxWidth: '50%',
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      flexGrow: 0,
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
}));

export default function ImageGrid({
  img,
  title,
  description,
  even,
}: ImageGridProps): JSX.Element {
  const { classes } = useStyles({ even });

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Grid item className={classes.image}>
        {img}
      </Grid>
      <Grid item className={classes.text}>
        <Title variant="h2" className={classes.title}>
          {title}
        </Title>
        <Body
          as="div"
          size="xl"
          sx={theme => ({
            ml: even ? 'auto' : 0,
            mr: even ? 0 : 'auto',
            [theme.breakpoints.between('md', 'xl')]: {
              maxWidth: theme.spacing(115.5),
            },
            [theme.breakpoints.up('xl')]: {
              maxWidth: theme.spacing(145),
            },
          })}
        >
          {description}
        </Body>
      </Grid>
    </Grid>
  );
}
