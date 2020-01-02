import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Card from './Card';
import CreditPlaceInfo from '../place/CreditPlaceInfo';
import Title from '../title';
import Credits from '../credits';

export interface CreditInfo {
  name: string;
  description: string;
  imgSrc: string;
  place: string;
  outcome: string;
  numberOfHolders: number,
  numberOfProjects: number,
  amount: number, //  current purchased amount
  totalAmount: number, // total available amount
  unit?: string; // currency?
}

interface CreditCardProps {
  credit: CreditInfo;
  // TODO: add func + variable related to heart round icon, need more info on this
  onClick(): () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(4.75),
    marginBottom: theme.spacing(5.25),
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(5),
  },
  image: {
    height: theme.spacing(48.75),
    pointer: 'pointer',
  },
  description: {
    fontSize: '0.875rem',
    lineHeight: '150%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  creditsContainer: {
    marginTop: theme.spacing(3.75),
  },
}));

export default function CreditCard({ credit, onClick }: CreditCardProps): JSX.Element {
  const classes = useStyles({});
  return (
    <Card width="20.5rem">
      <CardMedia onClick={onClick} className={classes.image} image={credit.imgSrc} />
      <div className={classes.container}>
        <Title variant="h3">{credit.name}</Title>
        <Typography
          color="secondary"
          className={classes.description}>
          {credit.description}
        </Typography>
        <CreditPlaceInfo
          place={credit.place}
          outcome={credit.outcome}
          fontSize="0.8125rem"
        />
        <div className={classes.creditsContainer}>
          <Credits
            numberOfHolders={credit.numberOfHolders}
            numberOfProjects={credit.numberOfProjects}
            amount={credit.amount}
            totalAmount={credit.totalAmount}
          />
        </div>
      </div>
    </Card>
  );
}
