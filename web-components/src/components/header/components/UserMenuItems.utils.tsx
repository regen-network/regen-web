/* eslint-disable lingui/no-unlocalized-strings */
import Separator from '../../atoms/Separator';
import { CopyButtonProps } from '../../buttons/CopyButton';
import { TextButton } from '../../buttons/TextButton';
import { CogIcon } from '../../icons/CogIcon';
import SmallArrowIcon from '../../icons/SmallArrowIcon';
import { LinkComponentProp } from '../../modal/ConfirmModal';
import { HeaderDropdownItemProps } from './HeaderDropdown/HeaderDropdown.Item';
import { UserMenuItemProfile, UserMenuProfile } from './UserMenuItem.Profile';

type TextContent = {
  signedInAs: string;
  copyText: Pick<CopyButtonProps, 'tooltipText' | 'toastText'>;
  publicProfile: string;
  personalDashboard: string;
  organizationDashboard: string;
  organization: string;
  createOrganization: string;
  finishOrgCreation: string;
};

export type ExtendedUserMenuProfile = UserMenuProfile & {
  dashboardLink: string;
};
interface GetUserMenuItemsParams {
  pathname: string;
  linkComponent: LinkComponentProp;
  navLinkComponent: LinkComponentProp;
  profile?: ExtendedUserMenuProfile;
  organizationProfile?: ExtendedUserMenuProfile;
  createOrganization?: () => void;
  finishOrgCreation?: () => void;
  unfinalizedOrgCreation?: boolean;
  textContent: TextContent;
}

const className = 'pl-20';
const labelClassName = 'text-sm';

export const getUserMenuItems = ({
  linkComponent,
  navLinkComponent,
  pathname,
  profile,
  organizationProfile,
  createOrganization,
  unfinalizedOrgCreation,
  finishOrgCreation,
  textContent,
}: GetUserMenuItemsParams): HeaderDropdownItemProps[] =>
  [
    profile && {
      children: (
        <div className="w-full">
          <div className="text-[11px] text-grey-400 uppercase font-extrabold pl-15 tracking-wider font-extrabold">
            {textContent.signedInAs}
          </div>
          <div className="px-10">
            <UserMenuItemProfile
              {...profile}
              publicProfileText={textContent.publicProfile}
              copyText={textContent.copyText}
              linkComponent={linkComponent}
              showCheckIcon
            />
          </div>
        </div>
      ),
    },
    {
      pathname,
      linkComponent: navLinkComponent,
      href: profile?.dashboardLink,
      labelClassName,
      className,
      icon: <CogIcon linearGradient />,
      label: textContent.personalDashboard,
    },
    createOrganization && {
      children: <Separator className="w-full my-[14px]" />,
    },
    organizationProfile && {
      children: (
        <div className="w-full">
          <div className="text-[11px] text-grey-400 uppercase font-extrabold pl-15 tracking-wider font-extrabold">
            {textContent.organization}
          </div>
          <div className="px-10">
            <UserMenuItemProfile
              {...organizationProfile}
              publicProfileText={textContent.publicProfile}
              copyText={textContent.copyText}
              linkComponent={linkComponent}
            />
          </div>
        </div>
      ),
    },
    organizationProfile &&
      !unfinalizedOrgCreation && {
        pathname,
        linkComponent: navLinkComponent,
        href: organizationProfile.dashboardLink,
        labelClassName,
        className,
        icon: <CogIcon linearGradient />,
        label: textContent.organizationDashboard,
      },
    !organizationProfile &&
      createOrganization && {
        children: (
          <TextButton
            className="pl-20 text-[11px] bg-[linear-gradient(202deg,#4FB573_14.67%,#B9E1C7_97.14%)] bg-clip-text text-[transparent]"
            onClick={createOrganization}
          >
            + {textContent.createOrganization}
          </TextButton>
        ),
      },
    unfinalizedOrgCreation &&
      finishOrgCreation && {
        children: (
          <TextButton
            className="group pl-20 text-[11px] bg-[linear-gradient(202deg,#4FB573_14.67%,#B9E1C7_97.14%)] bg-clip-text text-[transparent]"
            onClick={finishOrgCreation}
          >
            {textContent.finishOrgCreation}
            <SmallArrowIcon className="text-brand-400 group-hover:text-brand-200 h-[8px] ml-3" />
          </TextButton>
        ),
      },
    {
      children: <Separator className="w-full my-[14px]" />,
    },
  ].filter(Boolean) as HeaderDropdownItemProps[];
