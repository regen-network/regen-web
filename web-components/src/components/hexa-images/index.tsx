import React, { useState } from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import ReactHtmlParser from 'react-html-parser';

import Title from '../title';
import Description from '../description';
import { BlockContent, SanityBlockOr } from '../block-content';

interface HexaImage {
  name: string;
  imgSrc: string;
  role: SanityBlockOr<string>; // optionally pass block content from sanity
  description: SanityBlockOr<string>;
}

interface HexaImagesProps {
  items: HexaImage[];
}

const useStyles = makeStyles((theme: Theme) => ({
  grid: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      flexDirection: 'column-reverse',
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      justifyContent: 'space-between',
    },
    [theme.breakpoints.between(theme.breakpoints.values.tablet, 'lg')]: {
      height: theme.spacing(87.5),
    },
  },
  image: {
    [theme.breakpoints.between('sm', 'lg')]: {
      height: theme.spacing(34.5),
      width: theme.spacing(30),
      top: theme.spacing(-0.75),
      left: theme.spacing(1.5),
    },
    [theme.breakpoints.up('lg')]: {
      height: theme.spacing(47.5),
      width: theme.spacing(41.5),
      top: theme.spacing(-1.75),
      left: theme.spacing(1.25),
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(21.5),
      width: theme.spacing(18.5),
      top: theme.spacing(-0.75),
      left: theme.spacing(0.75),
    },
    position: 'absolute',
    zIndex: 2,
  },
  item: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(20),
      width: theme.spacing(20),
      '&:nth-child(4)': {
        marginLeft: theme.spacing(10),
      },
      '&:nth-child(4), &:nth-child(5), &:nth-child(6)': {
        marginTop: theme.spacing(-2),
      },
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      height: theme.spacing(31.25),
      width: theme.spacing(33),
      '&:nth-child(4)': {
        marginLeft: theme.spacing(17.25),
      },
      '&:nth-child(4), &:nth-child(5), &:nth-child(6)': {
        marginTop: theme.spacing(-2.5),
      },
    },
    [theme.breakpoints.up('lg')]: {
      height: theme.spacing(44.25),
      width: theme.spacing(44),
      '&:not(:nth-child(6))': {
        marginRight: theme.spacing(3),
      },
      '&:nth-child(4)': {
        marginLeft: theme.spacing(23.5),
      },
      '&:nth-child(4), &:nth-child(5), &:nth-child(6)': {
        marginTop: theme.spacing(-3.75),
      },
    },
  },
  hexagon: {
    background: theme.palette.secondary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.between('sm', 'lg')]: {
      height: theme.spacing(33),
      width: theme.spacing(19),
    },
    [theme.breakpoints.up('lg')]: {
      height: theme.spacing(44.25),
      width: theme.spacing(25.5),
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(20),
      width: theme.spacing(11.5),
    },
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
    transform: 'rotate(30deg)',

    '&::before, &::after': {
      background: 'inherit',
      content: '""',
      height: 'inherit',
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      width: 'inherit',
      zIndex: -1,
    },

    '&::before': {
      transform: 'rotate(-60deg)',
    },

    '&::after': {
      transform: 'rotate(60deg)',
    },
  },
  images: {
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(70),
    },
    [theme.breakpoints.up('lg')]: {
      width: theme.spacing(161.5),
      height: theme.spacing(84.75),
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      width: theme.spacing(116.25),
      height: theme.spacing(60),
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      margin: '0 auto',
    },
  },
  title: {
    color: theme.palette.secondary.main,
    lineHeight: '140%',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(4.5),
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(8),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(3.5),
    },
  },
  role: {
    textTransform: 'uppercase',
    fontWeight: 800,
    letterSpacing: '1px',
    color: theme.palette.info.main,
    '& p': {
      margin: 0,
    },
    '& a': {
      textDecoration: 'none',
      color: theme.palette.info.main,
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
        color: theme.palette.info.main,
      },
    },
    [theme.breakpoints.up('sm')]: {
      lineHeight: theme.spacing(5.75),
      paddingBottom: theme.spacing(4.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3.5),
      lineHeight: theme.spacing(4.5),
      paddingBottom: theme.spacing(3.5),
    },
  },
  description: {
    fontSize: theme.spacing(4.5),
    lineHeight: '150%',
    '& p': {
      margin: 0,
    },
  },
  text: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      height: theme.spacing(70),
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      width: '30%',
    },
  },
}));

// TODO type
function renderText(text: SanityBlockOr<string>): any {
  if (typeof text === 'string') {
    return ReactHtmlParser(text);
  }
  return <BlockContent content={text} />;
}

export default function HexaImages({ items }: HexaImagesProps): JSX.Element {
  const classes = useStyles();
  const [selected, setSelected] = useState(0);

  return (
    <Grid className={classes.grid} container wrap="nowrap">
      <Grid item className={classes.text}>
        <Title variant="h3" className={classes.title}>
          {items[selected].name}
        </Title>
        <Title variant="h6" className={classes.role}>
          {renderText(items[selected].role)}
        </Title>
        <Description className={classes.description}>{renderText(items[selected].description)}</Description>
      </Grid>
      <Grid container className={classes.images}>
        {items.map((item, i) => (
          <Grid
            key={i}
            item
            className={classes.item}
            onMouseEnter={() => {
              setSelected(i);
            }}
          >
            {selected === i && <div className={classes.hexagon} />}
            {/* <div className={classes.hexagon} /> */}
            <img
              className={classes.image}
              key={i}
              src={item.imgSrc}
              alt={item.name}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
