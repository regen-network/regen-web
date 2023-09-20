# Adding a new denom to the Marketplace

1. Add the icon in `web-components/src/components/icons/coins/{CoinIcon}.tsx`
   - Add an entry in `icons.stories.tsx` for the new Icon
2. Add the new denom in `web-marketplace/src/config/allowedBaseDenoms.ts`
   - The new denom value can be different on redwood and mainnet.
     You can check these values here: [redwood](http://redwood.regen.network:1317/ibc/apps/transfer/v1/denom_traces), [mainnet](http://mainnet.regen.network:1317/ibc/apps/transfer/v1/denom_traces)
   - Add the denom to `UPPERCASE_DENOM` if needed
3. Map the new denom with the icon in `DenomIcon.tsx`
4. Add the coingecko id of the new coin in `GECKO_TOKEN_IDS` and `DENOM_COINGECKO_ID_MAPPING` variables in `web-marketplace/src/lib/coingecko.ts`
