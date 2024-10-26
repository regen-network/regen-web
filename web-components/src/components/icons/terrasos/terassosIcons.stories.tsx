import React from 'react';
import { Meta } from '@storybook/react';

import { LabeledIcon } from '../icons.stories';
import ColombiaRegionIcon from './ColombiaRegionIcon/ColombiaRegionIcon';
import EcologicalConnectivityLevelIcon, {
  Level,
} from './EcologicalConnectivityLevelIcon';
import IucnRedCodeIcon, { IucnType } from './IucnRedCodeIcon';
import SocialCulturalValueIcon, {
  SocialCulturalValueType,
} from './SocialCulturalValueIcon';

export default {
  title: 'Terrasos/Icons',
  component: ColombiaRegionIcon,
} as Meta;

export const allIcons = (): JSX.Element => (
  <>
    <h3>ColombiaRegionIcon</h3>
    <div className="grid grid-cols-4 gap-4 ">
      <LabeledIcon
        label="Pacific"
        icon={
          <ColombiaRegionIcon region="PACIFIC" className="w-[60px] h-[60px]" />
        }
      />
      <LabeledIcon
        label="Orinoco"
        icon={
          <ColombiaRegionIcon region="ORINOCO" className="w-[60px] h-[60px]" />
        }
      />
      <LabeledIcon
        label="Caribbean"
        icon={
          <ColombiaRegionIcon
            region="CARIBBEAN"
            className="w-[60px] h-[60px]"
          />
        }
      />
      <LabeledIcon
        label="Amazon"
        icon={
          <ColombiaRegionIcon region="AMAZON" className="w-[60px] h-[60px]" />
        }
      />
      <LabeledIcon
        label="Andean"
        icon={
          <ColombiaRegionIcon region="ANDEAN" className="w-[60px] h-[60px]" />
        }
      />
      <LabeledIcon
        label="Andean (selected)"
        icon={
          <ColombiaRegionIcon
            region="ANDEAN"
            className="w-[60px] h-[60px]"
            isSelected={true}
          />
        }
      />
    </div>
    <h3>IucnRedCodeIcon</h3>

    <div className="grid grid-cols-4 gap-4 ">
      {(Object.keys(IucnType) as IucnType[]).map(type => (
        <LabeledIcon
          label={type}
          icon={<IucnRedCodeIcon type={type} key={type} />}
        />
      ))}
    </div>
    <h3>EcologicalConnectivityLevelIcon</h3>
    <div className="grid grid-cols-4 gap-4 ">
      {(Object.keys(Level) as Level[]).map(level => (
        <LabeledIcon
          label={level}
          icon={<EcologicalConnectivityLevelIcon level={level} key={level} />}
        />
      ))}
    </div>

    <h3>SocialCulturalValueIcon</h3>
    <div className="grid grid-cols-4 gap-4">
      {(Object.keys(SocialCulturalValueType) as SocialCulturalValueType[]).map(
        type => (
          <LabeledIcon
            label={type}
            icon={<SocialCulturalValueIcon type={type} key={type} />}
          />
        ),
      )}
    </div>
  </>
);
