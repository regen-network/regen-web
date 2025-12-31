import { TxResponse } from '@regen-network/api/cosmos/base/abci/v1beta1/abci';

export const matchesIri = (txRes: TxResponse, iri: string) =>
  txRes.events.some(event =>
    event.attributes.some(
      attribute => attribute.key === 'iri' && attribute.value?.includes(iri),
    ),
  );
