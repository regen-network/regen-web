import { useFormState, useWatch } from 'react-hook-form';
import { Trans } from '@lingui/macro';
import { ContentHash_Graph } from '@regen-network/api/lib/generated/regen/data/v1/types';
import { useQuery } from '@tanstack/react-query';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { TextButton } from 'web-components/src/components/buttons/TextButton';
import Card from 'web-components/src/components/cards/Card';
import CheckboxLabel from 'web-components/src/components/inputs/new/CheckboxLabel/CheckboxLabel';
import Modal, { RegenModalProps } from 'web-components/src/components/modal';
import {
  Body,
  Subtitle,
  Title,
} from 'web-components/src/components/typography';

import { useLedger } from 'ledger';
import { convertIRIToHashQuery } from 'lib/queries/react-query/data/convertIRIToHashQuery/convertIRIToHashQuery';

import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { signModalSchema } from './PostFlow.SignModal.schema';

type SignModalProps = {
  iri?: string;
  handleSign: (contentHash: ContentHash_Graph) => Promise<void>;
} & RegenModalProps;

export const SignModal = ({
  iri,
  onClose,
  open,
  handleSign,
}: SignModalProps) => {
  const form = useZodForm({
    schema: signModalSchema,
    defaultValues: {
      verified: false,
    },
    mode: 'onBlur',
  });
  const { isValid } = useFormState({
    control: form.control,
  });
  const verified = useWatch({
    control: form.control,
    name: 'verified',
  });
  const { dataClient } = useLedger();
  const { data } = useQuery(
    convertIRIToHashQuery({
      client: dataClient,
      request: { iri },
      enabled: !!dataClient && !!iri,
    }),
  );

  return (
    <Modal onClose={onClose} open={open}>
      <Form
        form={form}
        onSubmit={() =>
          data?.contentHash?.graph && handleSign(data?.contentHash?.graph)
        }
      >
        <Title variant="h4" align="center">
          <Trans>Attach a signature</Trans>
        </Title>
        <Card className="p-50 mt-50 mb-30">
          <Body
            size="lg"
            className="font-bold text-grey-700 after:font-normal after:content-['(optional)'] after:text-grey-400 after:ml-[4px] after:text-sm sm:after:text-base"
          >
            <Trans>Sign this post</Trans>
          </Body>
          <Body size="sm" className="pt-3 pb-10">
            <Trans>
              This is comparable to signing a legal document and implies you
              believe the contents are accurate.
            </Trans>
          </Body>
          <CheckboxLabel
            checked={verified}
            label={
              <Subtitle className="text-grey-500">
                <Trans>
                  I verify this data is accurate to the best of my knowledge
                </Trans>
              </Subtitle>
            }
            {...form.register('verified')}
          />
        </Card>
        <div className="flex gap-40 justify-end">
          <TextButton
            textSize="sm"
            className="text-grey-400 hover:text-grey-300"
            onClick={onClose}
          >
            <Trans>skip this step</Trans>
          </TextButton>
          <ContainedButton
            type="submit"
            disabled={!isValid || !data?.contentHash?.graph}
          >
            <Trans>sign</Trans>
          </ContainedButton>
        </div>
      </Form>
    </Modal>
  );
};
