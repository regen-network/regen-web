import React from 'react';
import { Box, Grid } from '@mui/material';

import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import AvailableCreditsIcon from 'web-components/lib/components/icons/AvailableCreditsIcon';
import AvatarIcon from 'web-components/lib/components/icons/AvatarIcon';
import CloseIcon from 'web-components/lib/components/icons/CloseIcon';
import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import CurrentCreditsIcon from 'web-components/lib/components/icons/CurrentCreditsIcon';
import OrganizationIcon from 'web-components/lib/components/icons/OrganizationIcon';
import PinIcon from 'web-components/lib/components/icons/PinIcon';
import PointerIcon from 'web-components/lib/components/icons/PointerIcon';
import RegenIcon from 'web-components/lib/components/icons/RegenIcon';
import RegenLogoIcon from 'web-components/lib/components/icons/RegenLogoIcon';
import TotalCreditsIcon from 'web-components/lib/components/icons/TotalCreditsIcon';
import VerifiedIcon from 'web-components/lib/components/icons/VerifiedIcon';
import PlayIcon from 'web-components/lib/components/icons/PlayIcon';
import DocumentIcon from 'web-components/lib/components/icons/DocumentIcon';
import EyeIcon from 'web-components/lib/components/icons/EyeIcon';
import EmailIcon from 'web-components/lib/components/icons/EmailIcon';
import PhoneIcon from 'web-components/lib/components/icons/PhoneIcon';
import DropdownIcon from 'web-components/lib/components/icons/DropdownIcon';
import CheckIcon from 'web-components/lib/components/icons/CheckIcon';
import CheckedIcon from 'web-components/lib/components/icons/CheckedIcon';
import BreadcrumbIcon from 'web-components/lib/components/icons/BreadcrumbIcon';
import FacebookIcon from 'web-components/lib/components/icons/social/FacebookIcon';
import InstagramIcon from 'web-components/lib/components/icons/social/InstagramIcon';
import TelegramIcon from 'web-components/lib/components/icons/social/TelegramIcon';
import DiscordIcon from 'web-components/lib/components/icons/social/DiscordIcon';
import TwitterIcon from 'web-components/lib/components/icons/social/TwitterIcon';
import LinkedInIcon from 'web-components/lib/components/icons/social/LinkedInIcon';
import MediumIcon from 'web-components/lib/components/icons/social/MediumIcon';
import YoutubeIcon from 'web-components/lib/components/icons/social/YoutubeIcon';
import GithubIcon from 'web-components/lib/components/icons/social/GithubIcon';
import WhitepaperIcon from 'web-components/lib/components/icons/WhitepaperIcon';
import BlockIcon from 'web-components/lib/components/icons/BlockIcon';
import LinkIcon from 'web-components/lib/components/icons/LinkIcon';
import PrintIcon from 'web-components/lib/components/icons/PrintIcon';
import RegenLedgerIcon from 'web-components/lib/components/icons/RegenLedgerIcon';
import InfoIcon from 'web-components/lib/components/icons/InfoIcon';
import ShieldIcon from 'web-components/lib/components/icons/ShieldIcon';
import PlusIcon from 'web-components/lib/components/icons/PlusIcon';
import MinusIcon from 'web-components/lib/components/icons/MinusIcon';
import InterfaceIcon from 'web-components/lib/components/icons/InterfaceIcon';
import FarmerIcon from 'web-components/lib/components/icons/FarmerIcon';
import TrustIcon from 'web-components/lib/components/icons/TrustIcon';
import RegistrationIcon from 'web-components/lib/components/icons/RegistrationIcon';
import ShadedCreditsIcon from 'web-components/lib/components/icons/ShadedCreditsIcon';
import TrustDocumentIcon from 'web-components/lib/components/icons/TrustDocumentIcon';
import AccountabilityIcon from 'web-components/lib/components/icons/AccountabilityIcon';
import ReviewIcon from 'web-components/lib/components/icons/ReviewIcon';
import InfoIconOutlined from 'web-components/lib/components/icons/InfoIconOutlined';
import CoBenefitsIcon from 'web-components/lib/components/icons/CoBenefitsIcon';
import CountingIcon from 'web-components/lib/components/icons/CountingIcon';
import SatelliteIcon from 'web-components/lib/components/icons/SatelliteIcon';
import SmallArrowIcon from 'web-components/lib/components/icons/SmallArrowIcon';
import SoilSampleIcon from 'web-components/lib/components/icons/SoilSampleIcon';
import TrashIcon from 'web-components/lib/components/icons/TrashIcon';
import { WalletIcon } from 'web-components/lib/components/icons/WalletIcon';
import { RegenTokenIcon } from 'web-components/lib/components/icons/RegenTokenIcon';
import { SaveIcon } from 'web-components/lib/components/icons/SaveIcon';
import { HorizontalDotsIcon } from 'web-components/lib/components/icons/HorizontalDotsIcon';
import { Spinner } from 'web-components/lib/components/icons/Spinner';
import { BrokenLinkIcon } from 'web-components/lib/components/icons/BrokenLinkIcon';
import { ProjectPageIcon } from 'web-components/lib/components/icons/ProjectPageIcon';
import EditIcon from 'web-components/lib/components/icons/EditIcon';

export default {
  title: 'Icons',
  component: ArrowDownIcon,
};

function LabeledIcon(props: {
  icon: React.ReactElement;
  label: string;
}): JSX.Element {
  return (
    <Grid
      item
      sm={1.5}
      sx={{
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        textAlign: 'center',
        gap: 8,
      }}
    >
      <Box
        sx={{
          height: 70,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        {props.icon}
      </Box>
      <div>{props.label}</div>
    </Grid>
  );
}

export const allIcons = (): JSX.Element => (
  <Grid container>
    <LabeledIcon icon={<AccountabilityIcon />} label="AccountabilityIcon" />
    <LabeledIcon
      icon={<ArrowDownIcon color={'#000'} direction={'down'} />}
      label="ArrowDownIcon"
    />
    <LabeledIcon icon={<AvatarIcon />} label="Avatar" />
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
    <LabeledIcon icon={<CreditsIcon color="#000" />} label="CreditsIcon" />
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
