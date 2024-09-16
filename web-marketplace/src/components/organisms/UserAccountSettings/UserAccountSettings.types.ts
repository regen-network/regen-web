import { AccountByIdQuery } from 'generated/graphql';

import { useEmailConfirmationData } from '../LoginFlow/hooks/useEmailConfirmationData';

/**
 * Describes the props for the UserAccountSettings component.
 */
export interface UserAccountSettingsProps {
  /**
   * The user's login email.
   */
  email: string;

  /**
   * A list of social providers that the user can connect to.
   */
  socialProviders: SocialProviderInfo[];

  /**
   * The wallet provider that the user can connect to.
   */
  walletProvider: WalletProviderInfo;

  /**
   * The current user's custodial address.
   */
  custodialAddress: NonNullable<
    AccountByIdQuery['accountById']
  >['custodialAddress'];

  /**
   * Methods and data related to email confirmation,
   * returned by the useEmailConfirmationData hook.
   */
  emailConfirmationData: Pick<
    ReturnType<typeof useEmailConfirmationData>,
    | 'isConfirmationModalOpen'
    | 'email'
    | 'emailModalError'
    | 'resendTimeLeft'
    | 'onConfirmationModalClose'
    | 'onMailCodeChange'
    | 'onResendPasscode'
    | 'onEmailSubmit'
    | 'isConnectedEmailErrorModalOpen'
    | 'onConnectedEmailErrorModalClose'
  >;
}

type DisconnectedState = {
  /**
   * A callback for connecting to the provider if the provider is not already
   * connected.
   */
  connect: () => void;
};

type ConnectedState = {
  /**
   * A callback for disconnecting from the provider if the provider is already
   * connected.
   */
  disconnect?: () => Promise<void>;
  /**
   * The email of the connected social provider account. This can be different
   * from the active account email.
   */
  email?: string | null;
};

type ConnectionState = DisconnectedState | ConnectedState;

/**
 * SocialProviderInfo describes a social provider and its connection info.
 */
export type SocialProviderInfo = {
  /** The name of the social provider. */
  name: string;
} & ConnectionState;

type WalletConnectedState = {
  /** The on-chain address of the wallet. Address will be undefined if the
   * there is no wallet connected.
   */
  address: string;
} & ConnectedState;

export type WalletProviderInfo = WalletConnectedState | DisconnectedState;
