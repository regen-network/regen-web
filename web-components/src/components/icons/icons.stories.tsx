import React from 'react';
import { Grid } from '@mui/material';

import { Flex } from '../box';
import AccountabilityIcon from './AccountabilityIcon';
import ArrowDownIcon from './ArrowDownIcon';
import ArrowLeftIcon from './ArrowLeft';
import ArrowRightIcon from './ArrowRight';
import ArrowSkipLeftIcon from './ArrowSkipLeft';
import ArrowSkipRightIcon from './ArrowSkipRight';
import AvailableCreditsIcon from './AvailableCreditsIcon';
import AvatarIcon from './AvatarIcon';
import AvatarOutlineIcon from './AvatarOutlineIcon';
import BlockIcon from './BlockIcon';
import BreadcrumbIcon from './BreadcrumbIcon';
import { BrokenLinkIcon } from './BrokenLinkIcon';
import CarbonOffsetBadgeIcon from './CarbonOffsetBadgeIcon';
import CelebrateRegenIcon from './CelebrateRegenIcon';
import CertifiedDocumentIcon from './CertifiedDocumentIcon';
import CheckedIcon from './CheckedIcon';
import CheckIcon from './CheckIcon';
import CloseIcon from './CloseIcon';
import CoBenefitsIcon from './CoBenefitsIcon';
import AxlUsdcIcon from './coins/AxlUsdcIcon';
import EeurIcon from './coins/EeurIcon';
import EvmosIcon from './coins/EvmosIcon';
import GravUsdcIcon from './coins/GravUsdcIcon';
import UsdcIcon from './coins/UsdcIcon';
import CountingIcon from './CountingIcon';
import { CreditBatchIcon } from './CreditBatchIcon';
import { CreditBatchLightIcon } from './CreditBatchLightIcon';
import { CreditClassIcon } from './CreditClassIcon';
import CreditsIcon from './CreditsIcon';
import CreditsIssuedIcon from './CreditsIssued';
import CreditsRetiredIcon from './CreditsRetired';
import CreditsTradeableIcon from './CreditsTradeable';
import CurrentCreditsIcon from './CurrentCreditsIcon';
import DocumentIcon from './DocumentIcon';
import DropdownIcon from './DropdownIcon';
import EditIcon from './EditIcon';
import EmailIcon from './EmailIcon';
import EmptyCartIcon from './EmptyCartIcon';
import ErrorIcon from './ErrorIcon';
import EyeIcon from './EyeIcon';
import FarmerIcon from './FarmerIcon';
import FilterIcon from './FilterIcon';
import { HorizontalDotsIcon } from './HorizontalDotsIcon';
import InfoIcon from './InfoIcon';
import InfoIconOutlined from './InfoIconOutlined';
import InterfaceIcon from './InterfaceIcon';
import LinkIcon from './LinkIcon';
import MinusIcon from './MinusIcon';
import NoBasketTokensIcon from './NoBasketTokensIcon';
import NoEcocreditsIcon from './NoEcocreditsIcon';
import { NoProjectIcon } from './NoProjectIcon';
import NoRetirementCertificatesIcon from './NoRetirementCertificatesIcon';
import OrganizationIcon from './OrganizationIcon';
import OutlinedCheckIcon from './OutlinedCheckIcon';
import PendingIcon from './PendingIcon';
import PhoneIcon from './PhoneIcon';
import PinIcon from './PinIcon';
import PlayIcon from './PlayIcon';
import PlusIcon from './PlusIcon';
import PointerIcon from './PointerIcon';
import PrintIcon from './PrintIcon';
import { ProjectPageIcon } from './ProjectPageIcon';
import { ProjectPageIconSmall } from './ProjectPageIconSmall';
import PutInBasketIcon from './PutInBasketIcon';
import QuestionIcon from './QuestionIcon';
import QuestionIconOutlined from './QuestionIconOutlined';
import RegenIcon from './RegenIcon';
import RegenLedgerIcon from './RegenLedgerIcon';
import RegenLogoIcon from './RegenLogoIcon';
import RegenMarketIcon from './RegenMarketIcon';
import RegenNetworkIcon from './RegenNetworkIcon';
import RegenNotFoundIcon from './RegenNotFoundIcon';
import { RegenTokenIcon } from './RegenTokenIcon';
import RegistrationIcon from './RegistrationIcon';
import RegistryIcon from './RegistryIcon';
import ReviewIcon from './ReviewIcon';
import SatelliteIcon from './SatelliteIcon';
import { SaveIcon } from './SaveIcon';
import SellOrderNotFoundIcon from './SellOrderNotFoundIcon';
import ShadedCreditsIcon from './ShadedCreditsIcon';
import ShieldIcon from './ShieldIcon';
import SmallArrowIcon from './SmallArrowIcon';
import DiscordIcon from './social/DiscordIcon';
import FacebookIcon from './social/FacebookIcon';
import GithubIcon from './social/GithubIcon';
import InstagramIcon from './social/InstagramIcon';
import LinkedInBadgeIcon from './social/LinkedInBadgeIcon';
import LinkedInIcon from './social/LinkedInIcon';
import MediumIcon from './social/MediumIcon';
import TelegramIcon from './social/TelegramIcon';
import TwitterBadgeIcon from './social/TwitterBadgeIcon';
import TwitterIcon from './social/TwitterIcon';
import TwitterIcon2 from './social/TwitterIcon2';
import WebsiteLinkIcon from './social/WebsiteLinkIcon';
import YoutubeIcon from './social/YoutubeIcon';
import SoilSampleIcon from './SoilSampleIcon';
import { Spinner } from './Spinner';
import SuccessIcon from './SuccessIcon';
import TakeFromBasketIcon from './TakeFromBasketIcon';
import TotalCreditsIcon from './TotalCreditsIcon';
import ToucanIcon from './ToucanIcon';
import TradeableIcon from './TradeableIcon';
import TrashIcon from './TrashIcon';
import TrustDocumentIcon from './TrustDocumentIcon';
import TrustIcon from './TrustIcon';
import UserMenuIcon from './UserMenuIcon';
import VerifiedIcon from './VerifiedIcon';
import WalletErrorIcon from './WalletErrorIcon';
import { WalletIcon } from './WalletIcon';
import WhitepaperIcon from './WhitepaperIcon';

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
      <Flex
        col
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
      </Flex>
    </Grid>
  );
}

export const allIcons = (): JSX.Element => (
  <Grid container gap={4}>
    <LabeledIcon
      icon={<ArrowLeftIcon sx={{ color: 'secondary.main' }} />}
      label="ArrowLeftIcon"
    />
    <LabeledIcon
      icon={<ArrowRightIcon sx={{ color: 'secondary.main' }} />}
      label="ArrowRightIcon"
    />
    <LabeledIcon
      icon={<ArrowSkipLeftIcon sx={{ color: 'secondary.main' }} />}
      label="ArrowSkipLeftIcon"
    />
    <LabeledIcon
      icon={<ArrowSkipRightIcon sx={{ color: 'secondary.main' }} />}
      label="ArrowSkipRightIcon"
    />
    <LabeledIcon icon={<AxlUsdcIcon />} label="AxlUsdcIcon" />
    <LabeledIcon icon={<AccountabilityIcon />} label="AccountabilityIcon" />
    <LabeledIcon
      icon={
        <ArrowDownIcon color={'#000'} direction={'down'} fontSize="large" />
      }
      label="ArrowDownIcon"
    />
    <LabeledIcon icon={<AvatarIcon sx={{ height: 40 }} />} label="Avatar" />
    <LabeledIcon
      icon={<AvatarOutlineIcon sx={{ fontSize: 24, color: 'info.main' }} />}
      label="AvatarOutlineIcon"
    />
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
    <LabeledIcon
      icon={<CarbonOffsetBadgeIcon />}
      label="CarbonOffsetBadgeIcon"
    />
    <LabeledIcon
      icon={<CelebrateRegenIcon sx={{ fontSize: 64 }} />}
      label="CelebrateRegenIcon"
    />
    <LabeledIcon
      icon={<CertifiedDocumentIcon sx={{ color: 'secondary.main' }} />}
      label="CertifiedDocumentIcon"
    />
    <LabeledIcon icon={<CheckedIcon />} label="CheckedIcon" />
    <LabeledIcon icon={<CheckIcon />} label="CheckIcon" />
    <LabeledIcon icon={<CloseIcon />} label="CloseIcon" />
    <LabeledIcon icon={<CoBenefitsIcon />} label="CoBenefitsIcon" />
    <LabeledIcon icon={<CountingIcon />} label="CountingIcon" />
    <LabeledIcon
      icon={<CreditBatchIcon sx={{ color: '#4FB573' }} />}
      label="CreditBatchIcon"
    />
    <LabeledIcon
      icon={<CreditBatchLightIcon sx={{ color: 'info.main' }} />}
      label="CreditBatchLightIcon"
    />
    <LabeledIcon
      icon={<CreditsIcon sx={{ height: 25 }} />}
      label="CreditsIcon"
    />
    <LabeledIcon
      icon={<CreditClassIcon sx={{ color: 'secondary.main' }} />}
      label="CreditClassIcon"
    />
    <LabeledIcon icon={<CreditsIssuedIcon />} label="CreditsIssuedIcon" />
    <LabeledIcon icon={<CreditsTradeableIcon />} label="CreditsTradeableIcon" />
    <LabeledIcon icon={<CreditsRetiredIcon />} label="CreditsRetiredIcon" />
    <LabeledIcon
      icon={<CurrentCreditsIcon color="#4FB573" />}
      label="CurrentCreditsIcon"
    />
    <LabeledIcon icon={<DiscordIcon color="blue" />} label="DiscordIcon" />
    <LabeledIcon icon={<DocumentIcon />} label="DocumentIcon" />
    <LabeledIcon icon={<DropdownIcon />} label="DropdownIcon" />
    <LabeledIcon icon={<EditIcon />} label="EditIcon" />
    <LabeledIcon icon={<EeurIcon />} label="EeurIcon" />
    <LabeledIcon icon={<EmailIcon color="grey" />} label="EmailIcon" />
    <LabeledIcon
      icon={<EmptyCartIcon sx={{ color: 'info.main' }} />}
      label="EmptyCartIcon"
    />
    <LabeledIcon icon={<ErrorIcon />} label="ErrorIcon" />
    <LabeledIcon icon={<EyeIcon />} label="EyeIcon" />
    <LabeledIcon icon={<EvmosIcon />} label="EvmosIcon" />
    <LabeledIcon icon={<FacebookIcon color="blue" />} label="FacebookIcon" />
    <LabeledIcon icon={<FarmerIcon />} label="FarmerIcon" />
    <LabeledIcon
      icon={<FilterIcon sx={{ color: 'secondary.dark' }} />}
      label="FilterIcon"
    />
    <LabeledIcon icon={<GithubIcon color="grey" />} label="GithubIcon" />
    <LabeledIcon icon={<GravUsdcIcon />} label="GravUsdcIcon" />
    <LabeledIcon icon={<HorizontalDotsIcon />} label="HorizontalDotsIcon" />
    <LabeledIcon icon={<InfoIcon />} label="InfoIcon" />
    <LabeledIcon icon={<InfoIconOutlined />} label="InfoIconOutlined" />
    <LabeledIcon icon={<InstagramIcon />} label="InstagramIcon" />
    <LabeledIcon icon={<InterfaceIcon />} label="InterfaceIcon" />
    <LabeledIcon icon={<LinkedInIcon color="blue" />} label="LinkedInIcon" />
    <LabeledIcon icon={<LinkedInBadgeIcon />} label="LinkedInBadgeIcon" />
    <LabeledIcon icon={<LinkIcon />} label="LinkIcon" />
    <LabeledIcon icon={<MediumIcon color="grey" />} label="MediumIcon" />
    <LabeledIcon icon={<MinusIcon />} label="MinusIcon" />
    <LabeledIcon icon={<NoBasketTokensIcon />} label="NoBasketTokensIcon" />
    <LabeledIcon icon={<NoEcocreditsIcon />} label="NoEcocreditsIcon" />
    <LabeledIcon icon={<NoProjectIcon />} label="NoProjectIcon" />
    <LabeledIcon
      icon={<NoRetirementCertificatesIcon />}
      label="NoRetirementCertificatesIcon"
    />
    <LabeledIcon icon={<OrganizationIcon />} label="OrganizationIcon" />
    <LabeledIcon icon={<OutlinedCheckIcon />} label="OutlinedCheckIcon" />
    <LabeledIcon icon={<PendingIcon />} label="PendingIcon" />
    <LabeledIcon
      icon={<PhoneIcon sx={{ color: 'secondary.main' }} />}
      label="PhoneIcon"
    />
    <LabeledIcon icon={<PinIcon fontSize="small" />} label="PinIcon" />
    <LabeledIcon icon={<PlayIcon height={'20px'} />} label="PlayIcon" />
    <LabeledIcon icon={<PlusIcon />} label="PlusIcon" />
    <LabeledIcon icon={<PointerIcon />} label="PointerIcon" />
    <LabeledIcon icon={<PrintIcon />} label="PrintIcon" />
    <LabeledIcon icon={<ProjectPageIcon />} label="ProjectPageIcon" />
    <LabeledIcon icon={<ProjectPageIconSmall />} label="ProjectPageIconSmall" />
    <LabeledIcon icon={<PutInBasketIcon />} label="PutInBasketIcon" />
    <LabeledIcon icon={<QuestionIcon />} label="QuestionIcon" />
    <LabeledIcon
      icon={<QuestionIconOutlined sx={{ color: 'secondary.main' }} />}
      label="QuestionIconOutlined"
    />
    <LabeledIcon icon={<RegenIcon />} label="RegenIcon" />
    <LabeledIcon icon={<RegenLedgerIcon />} label="RegenLedgerIcon" />
    <LabeledIcon icon={<RegenLogoIcon color="grey" />} label="RegenLogoIcon" />
    <LabeledIcon
      icon={<RegenMarketIcon sx={{ fontSize: 64 }} />}
      label="RegenMarketIcon"
    />
    <LabeledIcon icon={<RegenNetworkIcon />} label="RegenNetworkIcon" />
    <LabeledIcon
      icon={<RegenNotFoundIcon sx={{ color: 'secondary.main' }} />}
      label="RegenNotFoundIcon"
    />
    <LabeledIcon icon={<RegenTokenIcon />} label="RegenTokenIcon" />
    <LabeledIcon icon={<RegistrationIcon />} label="RegistrationIcon" />
    <LabeledIcon icon={<RegistryIcon />} label="RegistryIcon" />
    <LabeledIcon icon={<ReviewIcon />} label="ReviewIcon" />
    <LabeledIcon icon={<SatelliteIcon />} label="SatelliteIcon" />
    <LabeledIcon icon={<SaveIcon color="green" />} label="SaveIcon" />
    <LabeledIcon
      icon={<SellOrderNotFoundIcon />}
      label="SellOrderNotFoundIcon"
    />
    <LabeledIcon icon={<ShadedCreditsIcon />} label="ShadedCreditsIcon" />
    <LabeledIcon icon={<ShieldIcon />} label="ShieldIcon" />
    <LabeledIcon icon={<SmallArrowIcon />} label="SmallArrowIcon" />
    <LabeledIcon
      icon={<WebsiteLinkIcon sx={{ color: '#7BC796' }} />}
      label="SocialLinkIcon"
    />
    <LabeledIcon icon={<SoilSampleIcon />} label="SoilSampleIcon" />
    <LabeledIcon icon={<Spinner />} label="Spinner" />
    <LabeledIcon icon={<SuccessIcon />} label="SuccessIcon" />
    <LabeledIcon icon={<TakeFromBasketIcon />} label="TakeFromBasketIcon" />
    <LabeledIcon icon={<TelegramIcon color="blue" />} label="TelegramIcon" />
    <LabeledIcon icon={<TotalCreditsIcon />} label="TotalCreditsIcon" />
    <LabeledIcon icon={<ToucanIcon />} label="ToucanIcon" />
    <LabeledIcon
      icon={<TradeableIcon sx={{ color: 'grey.600' }} />}
      label="tradeableIcon"
    />
    <LabeledIcon icon={<TrashIcon color="grey" />} label="TrashIcon" />
    <LabeledIcon icon={<TrustIcon />} label="TrustIcon" />
    <LabeledIcon icon={<TrustDocumentIcon />} label="TrustDocumentIcon" />
    <LabeledIcon icon={<TwitterIcon color="blue" />} label="TwitterIcon" />
    <LabeledIcon
      icon={<TwitterIcon2 sx={{ color: '#7BC796' }} />}
      label="TwitterIcon2"
    />
    <LabeledIcon icon={<TwitterBadgeIcon />} label="TwitterBadgeIcon" />
    <LabeledIcon icon={<UsdcIcon />} label="UsdcIcon" />
    <LabeledIcon icon={<UserMenuIcon />} label="UserMenuIcon" />
    <LabeledIcon icon={<VerifiedIcon color="#000" />} label="VerifiedIcon" />
    <LabeledIcon icon={<WalletIcon />} label="WalletIcon" />
    <LabeledIcon
      icon={<WalletErrorIcon sx={{ fontSize: 64 }} />}
      label="WalletErrorIcon"
    />
    <LabeledIcon
      icon={<WhitepaperIcon color="grey" />}
      label="WhitepaperIcon"
    />
    <LabeledIcon icon={<YoutubeIcon color="red" />} label="YoutubeIcon" />
  </Grid>
);
