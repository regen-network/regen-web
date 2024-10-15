import React from 'react';
import { Grid } from '@mui/material';
import { Meta } from '@storybook/react';

import { LabeledIcon } from '../icons.stories';
import RegionIndicatorIcon from './ColombiaRegionIcon/ColombiaRegionIcon';

export default {
  title: 'Terassos/Icons',
  component: RegionIndicatorIcon,
} as Meta;

export const allIcons = (): JSX.Element => (
  <Grid container gap={4}>
    <LabeledIcon
      label="Pacific"
      icon={
        <RegionIndicatorIcon region="PACIFIC" className="w-[60px] h-[60px]" />
      }
    />
    <LabeledIcon
      label="Orinoco"
      icon={
        <RegionIndicatorIcon region="ORINOCO" className="w-[60px] h-[60px]" />
      }
    />
    <LabeledIcon
      label="Caribbean"
      icon={
        <RegionIndicatorIcon region="CARIBBEAN" className="w-[60px] h-[60px]" />
      }
    />
    <LabeledIcon
      label="Amazon"
      icon={
        <RegionIndicatorIcon region="AMAZON" className="w-[60px] h-[60px]" />
      }
    />
    <LabeledIcon
      label="Andean"
      icon={
        <RegionIndicatorIcon region="ANDEAN" className="w-[60px] h-[60px]" />
      }
    />
    <LabeledIcon
      label="Andean (selected)"
      icon={
        <RegionIndicatorIcon
          region="ANDEAN"
          className="w-[60px] h-[60px]"
          isSelected={true}
        />
      }
    />
  </Grid>
);
