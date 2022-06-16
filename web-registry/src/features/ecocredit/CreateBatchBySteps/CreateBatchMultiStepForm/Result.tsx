import React from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';
// import { MsgCreateBatchResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/tx';

type ResultProps = {
  response?: DeliverTxResponse;
  // response?: MsgCreateBatchResponse;
  error?: Error | string;
};

export default function Result({
  response,
  error,
}: ResultProps): React.ReactElement {
  if (error)
    return (
      <>
        <h1>Some error!</h1>
      </>
    );

  return (
    <>
      <h1>Success!</h1>
      <p>Batch denom: {response?.transactionHash}</p>
      <p>{JSON.stringify(response, null, 4)}</p>
    </>
  );
}
