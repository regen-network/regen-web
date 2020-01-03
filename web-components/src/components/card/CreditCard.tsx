import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MediaCard from './MediaCard';
import CreditPlaceInfo from '../place/CreditPlaceInfo';
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
  onClick: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  description: {
    fontSize: '0.875rem',
    lineHeight: '150%',
    marginBottom: theme.spacing(3),
    color: theme.palette.info.main,
  },
  creditsContainer: {
    marginTop: theme.spacing(3.75),
  },
}));

export default function CreditCard({ credit, onClick }: CreditCardProps): JSX.Element {
  const classes = useStyles({});
  return (
    <MediaCard
      onClick={onClick}
      imgSrc={credit.imgSrc}
      name={credit.name}
    >
      <Typography
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
    </MediaCard>
  );
}
