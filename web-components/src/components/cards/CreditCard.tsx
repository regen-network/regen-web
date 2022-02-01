import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Typography from '@mui/material/Typography';
import MediaCard from './MediaCard';
import CreditPlaceInfo from '../place/CreditPlaceInfo';
import Credits from '../credits';

export interface CreditInfo {
  name: string;
  description: string;
  imgSrc: string;
  place: string;
  outcome: string;
  numberOfHolders: number;
  numberOfProjects: number;
  amount: number; //  current purchased amount
  totalAmount: number; // total available amount
  unit?: string; // currency?
}

interface CreditCardProps {
  credit: CreditInfo;
  // TODO: add func + variable related to heart round icon, need more info on this
  onClick: () => void;
  width?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  description: {
    fontSize: '0.875rem',
    lineHeight: '150%',
    marginBottom: theme.spacing(3),
    color: theme.palette.info.dark,
  },
  creditsContainer: {
    marginTop: theme.spacing(3.75),
  },
}));

export default function CreditCard({
  credit,
  onClick,
  width,
}: CreditCardProps): JSX.Element {
  const classes = useStyles({});
  return (
    <MediaCard
      titleVariant="h5"
      onClick={onClick}
      imgSrc={credit.imgSrc}
      name={credit.name}
      width={width}
    >
      <Typography className={classes.description}>
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
