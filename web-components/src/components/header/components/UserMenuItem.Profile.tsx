import { useMemo } from 'react';
import { Grid } from '@mui/material';

import { CopyButton, CopyButtonProps } from '../../buttons/CopyButton';
import Card from '../../cards/Card';
import CheckIcon from '../../icons/CheckIcon';
import SmallArrowIcon from '../../icons/SmallArrowIcon';
import { isValidAddress } from '../../inputs/validation';
import { LinkComponentProp } from '../../modal/ConfirmModal';
import { Body, Subtitle } from '../../typography';
import UserAvatar from '../../user/UserAvatar';

export type UserMenuProfile = {
  id?: string;
  profileImage: string;
  name: string;
  address?: string | null;
  truncatedAddress?: string | null;
  profileLink?: string;
};
export type UserMenuItemProfileProps = UserMenuProfile & {
  profileLink?: string;
  publicProfileText: string;
  copyText: Pick<CopyButtonProps, 'tooltipText' | 'toastText'>;
  linkComponent: LinkComponentProp;
  showCheckIcon?: boolean;
};

const UserMenuItemProfile: React.FC<UserMenuItemProfileProps> = ({
  profileImage,
  name,
  address,
  truncatedAddress,
  profileLink,
  linkComponent: LinkComponent,
  publicProfileText,
  copyText,
  showCheckIcon,
}) => {
  const validWalletAddress = useMemo(
    () => address && isValidAddress(address),
    [address],
  );
  console.log('profileImage', profileImage);
  return (
    <Card className="group/card hover:border-grey-300 hover:bg-grey-100 border-[transparent] bg-grey-0 w-full shadow-none p-5">
      <Grid container wrap="nowrap" alignItems="center">
        <Grid item mr={3} position="relative">
          <UserAvatar className="w-30 h-30" src={profileImage} alt={name} />
          {showCheckIcon && (
            <div className="flex items-center justify-center w-15 h-15 absolute rounded-[50%] bg-bc-green-200 right-0 bottom-0">
              <CheckIcon className="w-[13px] h-[13px] text-brand-400" />
            </div>
          )}
        </Grid>
        <Grid item>
          <Subtitle size="md">{name}</Subtitle>
          <div className="flex flex-row items-baseline gap-15">
            {address &&
              (validWalletAddress ? (
                <CopyButton
                  className="group flex flex-row items-center gap-3 hover:underline"
                  content={address}
                  {...copyText}
                  // eslint-disable-next-line lingui/no-unlocalized-strings
                  iconClassName="h-[14px] w-[14px] group-hover:text-ac-success-400 hover:stroke-none text-sc-icon-standard-disabled"
                >
                  <Body
                    className="cursor-pointer truncate max-w-[137px] text-sc-text-sub-header group-hover/card:text-sc-text-paragraph"
                    size="xs"
                  >
                    {truncatedAddress}
                  </Body>
                </CopyButton>
              ) : (
                <Body
                  className="truncate max-w-[137px] text-sc-text-sub-header group-hover/card:text-sc-text-paragraph"
                  size="xs"
                >
                  {truncatedAddress}
                </Body>
              ))}
            {profileLink && (
              <LinkComponent
                href={profileLink}
                className="no-underline opacity-0 group-hover/card:opacity-100"
              >
                <Subtitle
                  className="underline text-sc-text-sub-header hover:text-sc-text-paragraph"
                  size="xs"
                >
                  {publicProfileText}
                  <SmallArrowIcon className="h-[8px] ml-3" />
                </Subtitle>
              </LinkComponent>
            )}
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export { UserMenuItemProfile };
