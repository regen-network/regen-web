/* eslint-disable lingui/no-unlocalized-strings */
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import Separator from '../../atoms/Separator';
import { CopyButtonProps } from '../../buttons/CopyButton';
import { TextButton } from '../../buttons/TextButton';
import { CogIcon } from '../../icons/CogIcon';
import { OrgProfileIcon } from '../../icons/OrgProfileIcon';
import PersonalProfileIcon from '../../icons/PersonalProfileIcon';
import SmallArrowIcon from '../../icons/SmallArrowIcon';
import { LinkComponentProp } from '../../modal/ConfirmModal';
import { HeaderDropdownItemProps } from './HeaderDropdown/HeaderDropdown.Item';
import { CollapsibleUserMenuSection } from './UserMenuItems.CollapsibleUserMenuSection';
import { UserMenuItemProfile, UserMenuProfile } from './UserMenuItem.Profile';

type TextContent = {
  signedInAs: string;
  copyText: Pick<CopyButtonProps, 'tooltipText' | 'toastText'>;
  personalProfile: string;
  organizationProfile: string;
  personalDashboard: string;
  organizationDashboard: string;
  organization: string;
  createOrganization: string;
  finishOrgCreation: string;
  createOrgDisabledTooltip: string;
};

export type ExtendedUserMenuProfile = UserMenuProfile & {
  dashboardLink: string;
};
interface GetUserMenuItemsParams {
  pathname: string;
  linkComponent: LinkComponentProp;
  navLinkComponent: LinkComponentProp;
  profile?: ExtendedUserMenuProfile;
  organizationProfiles?: ExtendedUserMenuProfile[];
  createOrganization?: () => void;
  finishOrgCreation?: () => void;
  unfinalizedOrgCreation?: boolean;
  textContent: TextContent;
  orgEnabled?: boolean;
  loginDisabled: boolean;
}

const className = 'pl-20';
const labelClassName = 'text-sm';

export const getUserMenuItems = ({
  linkComponent,
  navLinkComponent,
  pathname,
  profile,
  organizationProfiles,
  createOrganization,
  unfinalizedOrgCreation,
  finishOrgCreation,
  textContent,
  orgEnabled,
  loginDisabled,
}: GetUserMenuItemsParams): HeaderDropdownItemProps[] => {
  const resolvedOrgProfiles = organizationProfiles ?? [];

  const hasOrgProfiles = resolvedOrgProfiles.length > 0;
  const hasOrgSection =
    !!orgEnabled &&
    (hasOrgProfiles ||
      !!createOrganization ||
      (unfinalizedOrgCreation && !!finishOrgCreation));

  return [
    profile && {
      children: (
        <div className="flex flex-col w-full">
          <div className="text-[11px] text-grey-400 uppercase font-extrabold pl-15 tracking-wider">
            {textContent.signedInAs}
          </div>
          <CollapsibleUserMenuSection
            pathname={pathname}
            labelClassName={labelClassName}
            linkComponent={navLinkComponent}
            items={[
              {
                href: profile.profileLink,
                label: textContent.personalProfile,
                className,
                icon: <PersonalProfileIcon linearGradient />,
              },
              {
                href: profile.dashboardLink,
                label: textContent.personalDashboard,
                className,
                icon: <CogIcon linearGradient />,
              },
            ]}
            header={
              <div className="w-full px-10">
                <UserMenuItemProfile
                  {...profile}
                  profileLink={undefined}
                  personalProfileText={textContent.personalProfile}
                  copyText={textContent.copyText}
                  linkComponent={linkComponent}
                  showCheckIcon
                />
              </div>
            }
          />
        </div>
      ),
    },
    hasOrgSection && {
      children: (
        <Separator className={`w-full ${hasOrgProfiles ? 'mt-5 mb-0' : 'mb-0'}`} />
      ),
    },
    ...(orgEnabled
      ? resolvedOrgProfiles.flatMap((orgProfile, i) => [
          {
            children: (
              <CollapsibleUserMenuSection
                pathname={pathname}
                labelClassName={labelClassName}
                linkComponent={navLinkComponent}
                items={[
                  {
                    href: !unfinalizedOrgCreation
                      ? orgProfile.profileLink
                      : undefined,
                    label: textContent.organizationProfile,
                    className: 'pl-[17px]',
                    iconClassName: 'mr-[11px]',
                    icon: <OrgProfileIcon linearGradient />,
                  },
                  {
                    href: !unfinalizedOrgCreation
                      ? orgProfile.dashboardLink
                      : undefined,
                    label: textContent.organizationDashboard,
                    className,
                    icon: <CogIcon linearGradient />,
                  },
                ]}
                header={
                  <div className="w-full">
                    <div className="px-10">
                      <UserMenuItemProfile
                        {...orgProfile}
                        profileLink={undefined}
                        personalProfileText={textContent.personalProfile}
                        copyText={textContent.copyText}
                        linkComponent={linkComponent}
                      />
                    </div>
                  </div>
                }
              />
            ),
          },
          i < resolvedOrgProfiles.length - 1 && {
            children: <Separator className="w-full mt-5 mb-0" />,
          },
        ])
      : []),
    orgEnabled &&
      createOrganization &&
      hasOrgProfiles && {
        children: <Separator className="w-full mb-0" />,
      },
    orgEnabled &&
      createOrganization && {
        children: loginDisabled ? (
          <InfoTooltip
            title={textContent.createOrgDisabledTooltip}
            arrow
            placement="top"
          >
            <TextButton className="pl-20 text-[11px] bg-[linear-gradient(180deg,#ACACAC_0%,#CCC_100%)] bg-clip-text text-[transparent] cursor-default">
              + {textContent.createOrganization}
            </TextButton>
          </InfoTooltip>
        ) : (
          <TextButton
            className="pl-20 text-[11px] bg-[linear-gradient(202deg,#4FB573_14.67%,#B9E1C7_97.14%)] bg-clip-text text-[transparent]"
            onClick={createOrganization}
          >
            + {textContent.createOrganization}
          </TextButton>
        ),
      },
    orgEnabled &&
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
      children: <Separator className="h-1 w-full mt-0 mb-[14px]" />,
    },
  ].filter(Boolean) as HeaderDropdownItemProps[];
};
