import { AXELAR_USDC_DENOM, REGEN_DENOM } from 'config/allowedBaseDenoms';

import { Link } from 'components/atoms';

export const coinsTableBuyModalConfig = {
  [REGEN_DENOM]: [
    {
      label: 'Go to Osmosis',
      description: (
        <Link href="https://app.osmosis.zone/">app.osmosis.zone</Link>
      ),
    },
    {
      label: 'Buy $OSMO',
      description: 'Click the Buy tokens button',
    },
    {
      label: 'Swap $OSMO for $REGEN',
      description: `Keep a small amount of $OSMO in your wallet to pay for gas fees.`,
    },
    {
      label: 'Withdraw $REGEN',
      description: `On the assets page`,
    },
    {
      label: "You're ready to buy ecocredits 🎉",
      description: <Link href="/storefront">Go back to marketplace page</Link>,
    },
  ],
  [AXELAR_USDC_DENOM]: [
    {
      label: 'Go to Osmosis',
      description: (
        <Link href="https://app.osmosis.zone/">app.osmosis.zone</Link>
      ),
    },
    {
      label: 'Buy $OSMO',
      description: 'Click the Buy tokens button',
    },
    {
      label: 'Swap a small amount of $OSMO for $REGEN',
      description: `To pay for tx fees when buying ecocredits`,
    },
    {
      label: 'Withdraw $REGEN',
      description: `On the assets page`,
    },
    {
      label: 'Swap the rest of $OSMO for $USDC',
      description: `Keep a small amount of $OSMO in your wallet to pay for gas fees.`,
    },
    {
      label: 'Bridge your USDC from Osmosis to Regen',
      description: (
        <Link href="https://satellite.money/?source=osmosis&destination=regen&asset_denom=uusdc&destination_address=">
          Axelar bridge portal
        </Link>
      ),
    },
    {
      label: "You're ready to buy ecocredits 🎉",
      description: <Link href="/storefront">Go back to marketplace page</Link>,
    },
  ],
};
