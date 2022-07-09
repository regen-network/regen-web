import React from 'react';
import { Grid } from '@mui/material';
import { FlexCol } from '../box';

import AccountabilityIcon from './AccountabilityIcon';
import ArrowDownIcon from './ArrowDownIcon';
import AvailableCreditsIcon from './AvailableCreditsIcon';
import AvatarIcon from './AvatarIcon';
import BlockIcon from './BlockIcon';
import BreadcrumbIcon from './BreadcrumbIcon';
import { BrokenLinkIcon } from './BrokenLinkIcon';
import CheckedIcon from './CheckedIcon';
import CheckIcon from './CheckIcon';
import CloseIcon from './CloseIcon';
import CoBenefitsIcon from './CoBenefitsIcon';
import CountingIcon from './CountingIcon';
import CreditsIcon from './CreditsIcon';
import { CreditClassIcon } from './CreditClassIcon';
import CurrentCreditsIcon from './CurrentCreditsIcon';
import DiscordIcon from './social/DiscordIcon';
import DocumentIcon from './DocumentIcon';
import DropdownIcon from './DropdownIcon';
import EditIcon from './EditIcon';
import EmailIcon from './EmailIcon';
import EyeIcon from './EyeIcon';
import FacebookIcon from './social/FacebookIcon';
import FarmerIcon from './FarmerIcon';
import GithubIcon from './social/GithubIcon';
import { HorizontalDotsIcon } from './HorizontalDotsIcon';
import InfoIcon from './InfoIcon';
import InfoIconOutlined from './InfoIconOutlined';
import InstagramIcon from './social/InstagramIcon';
import InterfaceIcon from './InterfaceIcon';
import LinkedInIcon from './social/LinkedInIcon';
import LinkIcon from './LinkIcon';
import MediumIcon from './social/MediumIcon';
import MinusIcon from './MinusIcon';
import OrganizationIcon from './OrganizationIcon';
import PhoneIcon from './PhoneIcon';
import PinIcon from './PinIcon';
import PlayIcon from './PlayIcon';
import PlusIcon from './PlusIcon';
import PointerIcon from './PointerIcon';
import PrintIcon from './PrintIcon';
import { ProjectPageIcon } from './ProjectPageIcon';
import { ProjectPageIconSmall } from './ProjectPageIconSmall';
import RegenIcon from './RegenIcon';
import RegenLedgerIcon from './RegenLedgerIcon';
import RegenLogoIcon from './RegenLogoIcon';
import { RegenTokenIcon } from './RegenTokenIcon';
import RegistrationIcon from './RegistrationIcon';
import ReviewIcon from './ReviewIcon';
import SatelliteIcon from './SatelliteIcon';
import { SaveIcon } from './SaveIcon';
import ShadedCreditsIcon from './ShadedCreditsIcon';
import ShieldIcon from './ShieldIcon';
import SmallArrowIcon from './SmallArrowIcon';
import { Spinner } from './Spinner';
import SoilSampleIcon from './SoilSampleIcon';
import TelegramIcon from './social/TelegramIcon';
import TotalCreditsIcon from './TotalCreditsIcon';
import TrashIcon from './TrashIcon';
import TrustDocumentIcon from './TrustDocumentIcon';
import TrustIcon from './TrustIcon';
import TwitterIcon from './social/TwitterIcon';
import VerifiedIcon from './VerifiedIcon';
import WhitepaperIcon from './WhitepaperIcon';
import YoutubeIcon from './social/YoutubeIcon';
import { WalletIcon } from './WalletIcon';

export default {
  title: 'Icons',
  component: ArrowDownIcon,
};

function LabeledIcon(props: {
  icon: React.ReactElement;
  label: string;
}): JSX.Element {
  return (
    <Grid item sm={3} md={2} lg={1.5} sx={{ border: 1, borderRadius: 3 }}>
      <FlexCol
        sx={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: '100%',
          minHeight: 50,
          py: 4,
        }}
      >
        <div>{props.icon}</div>
        <div>{props.label}</div>
      </FlexCol>
    </Grid>
  );
}

export const allIcons = (): JSX.Element => (
  <Grid container gap={4}>
    <LabeledIcon icon={<AccountabilityIcon />} label="AccountabilityIcon" />
    <LabeledIcon
      icon={
        <ArrowDownIcon color={'#000'} direction={'down'} fontSize="large" />
      }
      label="ArrowDownIcon"
    />
    <LabeledIcon icon={<AvatarIcon sx={{ height: 40 }} />} label="Avatar" />
    <LabeledIcon
      icon={<AvailableCreditsIcon sx={{ height: 40 }} />}
      label="AvailableCreditsIcon"
    />
    <LabeledIcon icon={<BlockIcon color="black" />} label="BlackIcon" />
    <LabeledIcon
      icon={<BreadcrumbIcon direction="down" />}
      label="BreadcrumbIcon"
    />

    <LabeledIcon icon={<BrokenLinkIcon />} label="BrokenLinkIcon" />
    <LabeledIcon icon={<CheckedIcon />} label="CheckedIcon" />
    <LabeledIcon icon={<CheckIcon />} label="CheckIcon" />
    <LabeledIcon icon={<CloseIcon />} label="CloseIcon" />
    <LabeledIcon icon={<CoBenefitsIcon />} label="CoBenefitsIcon" />
    <LabeledIcon icon={<CountingIcon />} label="CountingIcon" />
    <LabeledIcon
      icon={<CreditsIcon color="green" sx={{ height: 25 }} />}
      label="CreditsIcon"
    />
    <LabeledIcon
      icon={<CreditClassIcon sx={{ color: 'secondary.main' }} />}
      label="CreditClassIcon"
    />
    <LabeledIcon
      icon={<CurrentCreditsIcon color="#4FB573" />}
      label="CurrentCreditsIcon"
    />
    <LabeledIcon icon={<DiscordIcon color="blue" />} label="DiscordIcon" />
    <LabeledIcon icon={<DocumentIcon />} label="DocumentIcon" />
    <LabeledIcon icon={<DropdownIcon />} label="DropdownIcon" />
    <LabeledIcon icon={<EditIcon />} label="EditIcon" />
    <LabeledIcon icon={<EmailIcon color="grey" />} label="EmailIcon" />
    <LabeledIcon icon={<EyeIcon />} label="EyeIcon" />
    <LabeledIcon icon={<FacebookIcon color="blue" />} label="FacebookIcon" />
    <LabeledIcon icon={<FarmerIcon />} label="FarmerIcon" />
    <LabeledIcon icon={<GithubIcon color="grey" />} label="GithubIcon" />
    <LabeledIcon icon={<HorizontalDotsIcon />} label="HorizontalDotsIcon" />
    <LabeledIcon icon={<InfoIcon />} label="InfoIcon" />
    <LabeledIcon icon={<InfoIconOutlined />} label="InfoIconOutlined" />
    <LabeledIcon icon={<InstagramIcon />} label="InstagramIcon" />
    <LabeledIcon icon={<InterfaceIcon />} label="InterfaceIcon" />
    <LabeledIcon icon={<LinkedInIcon color="blue" />} label="LinkedInIcon" />
    <LabeledIcon icon={<LinkIcon />} label="LinkIcon" />
    <LabeledIcon icon={<MediumIcon color="grey" />} label="MediumIcon" />
    <LabeledIcon icon={<MinusIcon />} label="MinusIcon" />
    <LabeledIcon icon={<OrganizationIcon />} label="OrganizationIcon" />
    <LabeledIcon icon={<PhoneIcon />} label="PhoneIcon" />
    <LabeledIcon icon={<PinIcon fontSize="small" />} label="PinIcon" />
    <LabeledIcon icon={<PlayIcon height={'20px'} />} label="PlayIcon" />
    <LabeledIcon icon={<PlusIcon />} label="PlusIcon" />
    <LabeledIcon icon={<PointerIcon />} label="PointerIcon" />
    <LabeledIcon icon={<PrintIcon />} label="PrintIcon" />
    <LabeledIcon icon={<ProjectPageIcon />} label="ProjectPageIcon" />
    <LabeledIcon icon={<ProjectPageIconSmall />} label="ProjectPageIconSmall" />
    <LabeledIcon icon={<RegenIcon />} label="RegenIcon" />
    <LabeledIcon icon={<RegenLedgerIcon />} label="RegenLedgerIcon" />
    <LabeledIcon icon={<RegenLogoIcon color="grey" />} label="RegenLogoIcon" />
    <LabeledIcon icon={<RegenTokenIcon />} label="RegenTokenIcon" />
    <LabeledIcon icon={<RegistrationIcon />} label="RegistrationIcon" />
    <LabeledIcon icon={<ReviewIcon />} label="ReviewIcon" />
    <LabeledIcon icon={<SatelliteIcon />} label="SatelliteIcon" />
    <LabeledIcon icon={<SaveIcon color="green" />} label="SaveIcon" />
    <LabeledIcon icon={<ShadedCreditsIcon />} label="ShadedCreditsIcon" />
    <LabeledIcon icon={<ShieldIcon />} label="ShieldIcon" />
    <LabeledIcon icon={<SmallArrowIcon />} label="SmallArrowIcon" />
    <LabeledIcon icon={<SoilSampleIcon />} label="SoilSampleIcon" />
    <LabeledIcon icon={<Spinner />} label="Spinner" />
    <LabeledIcon icon={<TelegramIcon color="blue" />} label="TelegramIcon" />
    <LabeledIcon icon={<TotalCreditsIcon />} label="TotalCreditsIcon" />
    <LabeledIcon icon={<TrashIcon color="grey" />} label="TrashIcon" />
    <LabeledIcon icon={<TrustIcon />} label="TrustIcon" />
    <LabeledIcon icon={<TrustDocumentIcon />} label="TrustDocumentIcon" />
    <LabeledIcon icon={<TwitterIcon color="blue" />} label="TwitterIcon" />
    <LabeledIcon icon={<VerifiedIcon color="#000" />} label="VerifiedIcon" />
    <LabeledIcon icon={<WalletIcon />} label="WalletIcon" />
    <LabeledIcon
      icon={<WhitepaperIcon color="grey" />}
      label="WhitepaperIcon"
    />
    <LabeledIcon icon={<YoutubeIcon color="red" />} label="YoutubeIcon" />
  </Grid>
);
