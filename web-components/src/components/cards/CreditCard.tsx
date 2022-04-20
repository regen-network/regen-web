import React from 'react';
import { Box } from '@mui/material';
import MediaCard from './MediaCard';
import CreditPlaceInfo from '../place/CreditPlaceInfo';
import Credits from '../credits';
import { BodyText } from '../typography';

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

export default function CreditCard({
  credit,
  onClick,
  width,
}: CreditCardProps): JSX.Element {
  return (
    <MediaCard
      titleVariant="h5"
      onClick={onClick}
      imgSrc={credit.imgSrc}
      name={credit.name}
      width={width}
    >
      <BodyText size="sm">{credit.description}</BodyText>
      <CreditPlaceInfo
        place={credit.place}
        outcome={credit.outcome}
        fontSize="0.8125rem"
      />
      <Box mt={2}>
        <Credits
          numberOfHolders={credit.numberOfHolders}
          numberOfProjects={credit.numberOfProjects}
          amount={credit.amount}
          totalAmount={credit.totalAmount}
        />
      </Box>
    </MediaCard>
  );
}
