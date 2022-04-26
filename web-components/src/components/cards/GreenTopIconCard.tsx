import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import { Grid, Box } from '@mui/material';
import clsx from 'clsx';

import Card from './Card';
import OutlinedButton from '../buttons/OutlinedButton';
import { BlockContent, SanityBlockOr } from '../block-content';
import { Body, Title } from '../typography';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    border: 'none',
    borderRadius: '9px',
    flexDirection: 'column',
    margin: theme.spacing(4),
    maxWidth: theme.spacing(90),
  },
  img: {
    width: '100%',
    height: theme.spacing(20),
    margin: '0 auto',
  },
}));

const GreenTopIconCard: React.FC<{
  className?: string;
  title: string;
  description: SanityBlockOr<string>;
  linkUrl: string;
  linkText: string;
  imgSrc: string;
}> = props => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, props.className)}>
      <Box sx={{ backgroundColor: 'secondary.contrastText', py: 5 }}>
        <img
          className={classes.img}
          src={props.imgSrc}
          alt={
            typeof props.description === 'string'
              ? props.description
              : props.title
          }
        />
      </Box>

      <Grid container direction="column" sx={{ flex: 1, p: 4, gap: 4 }}>
        <Title variant="h3">{props.title}</Title>
        <Body as="div">
          {typeof props.description === 'string' ? (
            props.description
          ) : (
            <BlockContent content={props.description} />
          )}
        </Body>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
          }}
        >
          <OutlinedButton
            size="small"
            href={props.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.linkText}
          </OutlinedButton>
        </Box>
      </Grid>
    </Card>
  );
};

export default GreenTopIconCard;
