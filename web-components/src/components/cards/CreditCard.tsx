import React from 'react';
import { Box } from '@mui/material';

import Credits from '../credits';
import CreditPlaceInfo from '../place/CreditPlaceInfo';
import { Body } from '../typography';
import MediaCard from './MediaCard/MediaCard';

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
  draftText: string;
  numberOfHoldersLabel: string;
  numberOfProjects: number;
  numberOfProjectsLabel: string;
  totalAmountLabel: string;
}

export default function CreditCard({
  credit,
  onClick,
  width,
  draftText,
  numberOfHoldersLabel,
  numberOfProjectsLabel,
  totalAmountLabel,
}: CreditCardProps): JSX.Element {
  return (
    <MediaCard
      titleVariant="h5"
      onClick={onClick}
      imgSrc={credit.imgSrc}
      name={credit.name}
      width={width}
      draftText={draftText}
    >
      <Body size="sm">{credit.description}</Body>
      <CreditPlaceInfo
        place={credit.place}
        outcome={credit.outcome}
        fontSize="0.8125rem"
      />
      <Box mt={2}>
        <Credits
          numberOfHolders={credit.numberOfHolders}
          numberOfHoldersLabel={numberOfHoldersLabel}
          numberOfProjects={credit.numberOfProjects}
          numberOfProjectsLabel={numberOfProjectsLabel}
          totalAmount={credit.totalAmount}
          totalAmountLabel={totalAmountLabel}
          amount={credit.amount}
        />
      </Box>
    </MediaCard>
  );
}
