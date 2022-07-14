import {
  MsgCreateProject,
  MsgCreateProjectResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/tx';
import { useCallback } from 'react';
import { MsgTakeValues } from 'web-components/lib/components/form/BasketTakeForm';
import { Item } from 'web-components/lib/components/modal/TxModal';
import {
  ProjectMetadataLD,
  VCSProjectMetadataLD,
} from '../../../generated/json-ld';
import { BasketTokens } from '../../../hooks/useBasketTokens';
import { SignAndBroadcastType } from '../../../hooks/useMsgClient';
import {
  generateIri,
  IriFromMetadataSuccess,
} from '../../../lib/metadata-graph';
import { useStateSetter } from '../../../types/react/use-state';

export interface MsgCreateProjectValues {}

type Props = {
  classId: string;
  admin: string;
  metadata: Partial<ProjectMetadataLD> | Partial<VCSProjectMetadataLD>;
  jurisdiction: string;
  referenceId?: string;
  signAndBroadcast: SignAndBroadcastType;
  // setBasketTakeTokens: useStateSetter<BasketTokens | undefined>;
  // setCardItems: useStateSetter<Item[] | undefined>;
  // setTxModalTitle: useStateSetter<string | undefined>;
};

type ReturnType = (values: MsgCreateProject) => Promise<void>;

const useProjectCreateSubmit = ({
  classId,
  admin,
  metadata,
  jurisdiction,
  referenceId,
  signAndBroadcast,
}: Props): ReturnType => {
  const projectCreateSubmit = useCallback(
    async (values: MsgCreateProject): Promise<void> => {
      if (!classId) return Promise.reject();

      let iriResponse:
        | IriFromMetadataSuccess<
            Partial<ProjectMetadataLD> | Partial<VCSProjectMetadataLD>
          >
        | undefined;

      try {
        iriResponse = await generateIri(metadata);
        if (!iriResponse) return;
      } catch (err) {
        throw new Error(err as string);
      }

      const msg = MsgCreateProject.fromPartial({
        classId,
        admin,
        metadata: iriResponse.iri,
        jurisdiction,
        referenceId,
      });

      const tx = {
        msgs: [msg],
        fee: undefined,
        // memo: values?.retirementNote,
      };

      await signAndBroadcast(tx, () => console.log('signAndBroadcast done'));

      // if (basket && amount) {
      //   setCardItems([
      //     {
      //       label: 'basket',
      //       value: { name: basket.name },
      //     },
      //     {
      //       label: 'amount',
      //       value: { name: parseInt(amount) / Math.pow(10, basket.exponent) },
      //     },
      //   ]);
      //   setTxModalTitle(basketTakeTitle);
      // }
    },
    [admin, classId, jurisdiction, metadata, referenceId, signAndBroadcast],
  );

  return projectCreateSubmit;
};

export { useProjectCreateSubmit };
