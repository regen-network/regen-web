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
  disconnect: () => void;
};

type ConnectionState = DisconnectedState | ConnectedState;

/**
 * SocialProviderInfo describes a social provider and its connection info.
 */
export type SocialProviderInfo = {
  /** The name of the social provider. */
  providerName: string;
} & ConnectionState;

type WalletConnectedState = {
  /** The on-chain address of the wallet. Address will be undefined if the
   * there is no wallet connected.
   */
  address: string;
} & ConnectedState;

export type WalletProviderInfo = WalletConnectedState | DisconnectedState;