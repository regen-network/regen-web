import React from 'react';
<<<<<<< HEAD
import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import AvailableCreditsIcon from 'web-components/lib/components/icons/AvailableCreditsIcon';
import AvatarIcon from 'web-components/lib/components/icons/AvatarIcon';
import CloseIcon from 'web-components/lib/components/icons/CloseIcon';
import { CreditClassIcon } from 'web-components/lib/components/icons/CreditClassIcon';
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
import { CelebrateIcon } from 'web-components/lib/components/icons/CelebrateIcon';
=======
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
>>>>>>> 7755e82f (Feat: Create credit class UI + absolute paths, storybook in registry (#1044))

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
<<<<<<< HEAD

export const accountabilityIcon = (): JSX.Element => <AccountabilityIcon />;

export const availableCreditsIcon = (): JSX.Element => <AvailableCreditsIcon />;

export const avatarIcon = (): JSX.Element => <AvatarIcon />;

export const blockIcon = (): JSX.Element => <BlockIcon color="black" />;

export const breadcrumbIcon = (): JSX.Element => (
  <BreadcrumbIcon direction={'down'} />
);

export const brokenLinkIcon = (): JSX.Element => <BrokenLinkIcon />;

export const checkedIcon = (): JSX.Element => <CheckedIcon />;

export const checkIcon = (): JSX.Element => <CheckIcon />;

export const closeIcon = (): JSX.Element => <CloseIcon />;

export const coBenefitsIcon = (): JSX.Element => <CoBenefitsIcon />;

export const countingIcon = (): JSX.Element => <CountingIcon />;

export const creditClassIcon = (): JSX.Element => <CreditClassIcon />;

export const creditsIcon = (): JSX.Element => <CreditsIcon color={'#000'} />;

export const currentCreditsIcon = (): JSX.Element => (
  <CurrentCreditsIcon color={'#4FB573'} />
);

export const discordIcon = (): JSX.Element => <DiscordIcon />;

export const documentIcon = (): JSX.Element => <DocumentIcon />;

export const dropdownIcon = (): JSX.Element => <DropdownIcon />;

export const editIcon = (): JSX.Element => <EditIcon />;

export const emailIcon = (): JSX.Element => <EmailIcon />;

export const eyeIcon = (): JSX.Element => <EyeIcon />;

export const facebookIcon = (): JSX.Element => <FacebookIcon />;

export const farmerIcon = (): JSX.Element => <FarmerIcon />;

export const githubIcon = (): JSX.Element => <GithubIcon />;

export const horizontalDotsIcon = (): JSX.Element => <HorizontalDotsIcon />;

export const infoIcon = (): JSX.Element => <InfoIcon />;

export const infoIconOutlined = (): JSX.Element => <InfoIconOutlined />;

export const instagramIcon = (): JSX.Element => <InstagramIcon />;

export const interfaceIcon = (): JSX.Element => <InterfaceIcon />;

export const linkedInIcon = (): JSX.Element => <LinkedInIcon />;

export const linkIcon = (): JSX.Element => <LinkIcon color="black" />;

export const mediumIcon = (): JSX.Element => <MediumIcon />;

export const minusIcon = (): JSX.Element => <MinusIcon />;

export const organizationIcon = (): JSX.Element => <OrganizationIcon />;

export const phoneIcon = (): JSX.Element => <PhoneIcon />;

export const pinIcon = (): JSX.Element => <PinIcon fontSize={'small'} />;

export const playIcon = (): JSX.Element => <PlayIcon />;

export const plusIcon = (): JSX.Element => <PlusIcon />;

export const pointerIcon = (): JSX.Element => <PointerIcon />;

export const printIcon = (): JSX.Element => <PrintIcon />;

export const projectPageIcon = (): JSX.Element => <ProjectPageIcon />;

export const regenIcon = (): JSX.Element => <RegenIcon />;

export const regenLedgerIcon = (): JSX.Element => <RegenLedgerIcon />;

export const regenLogoIcon = (): JSX.Element => <RegenLogoIcon />;

export const regenTokenIcon = (): JSX.Element => <RegenTokenIcon />;

export const registrationIcon = (): JSX.Element => <RegistrationIcon />;

export const reviewIcon = (): JSX.Element => <ReviewIcon />;

export const satelliteIcon = (): JSX.Element => <SatelliteIcon />;

export const saveIcon = (): JSX.Element => <SaveIcon />;

export const shadedCreditsIcon = (): JSX.Element => <ShadedCreditsIcon />;

export const shieldIcon = (): JSX.Element => <ShieldIcon />;

export const smallArrowIcon = (): JSX.Element => <SmallArrowIcon />;

export const soilSampleIcon = (): JSX.Element => <SoilSampleIcon />;

export const spinner = (): JSX.Element => <Spinner />;

export const telegramIcon = (): JSX.Element => <TelegramIcon />;

export const totalCreditsIcon = (): JSX.Element => <TotalCreditsIcon />;

export const trashIcon = (): JSX.Element => <TrashIcon />;

export const trustDocumentIcon = (): JSX.Element => <TrustDocumentIcon />;

export const trustIcon = (): JSX.Element => <TrustIcon />;

export const twitterIcon = (): JSX.Element => <TwitterIcon />;

export const verifiedIcon = (): JSX.Element => <VerifiedIcon color={'#000'} />;

export const walletIcon = (): JSX.Element => <WalletIcon />;

export const whitepaperIcon = (): JSX.Element => (
  <WhitepaperIcon color="black" />
);

export const youtubeIcon = (): JSX.Element => <YoutubeIcon />;

export const celebrateIcon = (): JSX.Element => <CelebrateIcon />;
=======
>>>>>>> 7755e82f (Feat: Create credit class UI + absolute paths, storybook in registry (#1044))
