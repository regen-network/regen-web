import { isAndroid, isIOS, WCWallet } from '@interchain-kit/core';

export class WCMobileWebWallet extends WCWallet {
  walletConnectData: any;

  async navigateWalletConnectLink(uri: string) {
    let wcUrl: string | undefined = '';
    if (isAndroid()) {
      wcUrl = this.info.walletConnectLink?.android?.replace(
        '{wc-uri}',
        encodeURIComponent(uri),
      );
    }
    if (isIOS()) {
      wcUrl = this.info.walletConnectLink?.ios?.replace(
        '{wc-uri}',
        encodeURIComponent(uri),
      );
    }
    if (wcUrl) {
      window.location.href = wcUrl;
    }
  }

  async navigateToDappBrowserLink() {
    if (!this.info.dappBrowserLink) {
      return;
    }
    const link = this.info.dappBrowserLink(window.location.href);
    window.open(link, '_blank', 'noopener,noreferrer');
  }

  async init() {
    await super.init();
    this.provider.on('display_uri', async (uri: string) => {
      await this.navigateWalletConnectLink(uri);
      await this.navigateToDappBrowserLink();
    });
  }

  async connect() {
    await this.navigateToDappBrowserLink();
    await super.connect('');
  }
}
