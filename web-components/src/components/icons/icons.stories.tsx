import React from 'react';
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
import { Loading } from 'web-components/lib/components/loading';

export default {
  title: 'Icons',
  component: ArrowDownIcon,
};

export const arrowIcon = (): JSX.Element => (
  <ArrowDownIcon color={'#000'} direction={'down'} />
);

export const accountabilityIcon = (): JSX.Element => <AccountabilityIcon />;

export const availableCreditsIcon = (): JSX.Element => <AvailableCreditsIcon />;

export const avatarIcon = (): JSX.Element => <AvatarIcon />;

export const blockIcon = (): JSX.Element => <BlockIcon color="black" />;

export const breadcrumbIcon = (): JSX.Element => (
  <BreadcrumbIcon direction={'down'} />
);

export const checkedIcon = (): JSX.Element => <CheckedIcon />;

export const checkIcon = (): JSX.Element => <CheckIcon />;

export const closeIcon = (): JSX.Element => <CloseIcon />;

export const coBenefitsIcon = (): JSX.Element => <CoBenefitsIcon />;

export const countingIcon = (): JSX.Element => <CountingIcon />;

export const creditsIcon = (): JSX.Element => <CreditsIcon color={'#000'} />;

export const currentCreditsIcon = (): JSX.Element => (
  <CurrentCreditsIcon color={'#4FB573'} />
);

export const discordIcon = (): JSX.Element => <DiscordIcon />;

export const documentIcon = (): JSX.Element => <DocumentIcon />;

export const dropdownIcon = (): JSX.Element => <DropdownIcon />;

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

/** this isn't really an icon, but it makes sense here I think in storybook */
export const loadingIcon = (): JSX.Element => <Loading />;

export const mediumIcon = (): JSX.Element => <MediumIcon />;

export const minusIcon = (): JSX.Element => <MinusIcon />;

export const organizationIcon = (): JSX.Element => <OrganizationIcon />;

export const phoneIcon = (): JSX.Element => <PhoneIcon />;

export const pinIcon = (): JSX.Element => <PinIcon fontSize={'small'} />;

export const playIcon = (): JSX.Element => <PlayIcon />;

export const plusIcon = (): JSX.Element => <PlusIcon />;

export const pointerIcon = (): JSX.Element => <PointerIcon />;

export const printIcon = (): JSX.Element => <PrintIcon />;

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
