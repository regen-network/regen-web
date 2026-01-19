import { useMemo, useState } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { ContentHash_Graph } from '@regen-network/api/regen/data/v2/types';
import { useQuery } from '@tanstack/react-query';
import { getDefaultAvatar } from 'legacy-pages/Dashboard/Dashboard.utils';

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

import { AccountType } from 'generated/graphql';
import { useLedger } from 'ledger';
import { useAuth } from 'lib/auth/auth';
import { convertIRIToHashQuery } from 'lib/queries/react-query/data/convertIRIToHashQuery/convertIRIToHashQuery';

import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';
import {
  ORG,
  UNNAMED,
  USER,
} from 'components/organisms/DashboardNavigation/DashboardNavigation.constants';
import { AccountOption } from 'components/organisms/DashboardNavigation/DashboardNavigation.types';
import { ProjectAccountSelector } from 'components/organisms/ProjectAccountSelector/ProjectAccountSelector';
import { useDaoOrganization } from 'hooks/useDaoOrganization';

import { signModalSchema } from './PostFlow.SignModal.schema';

type SignModalProps = {
  iri?: string;
  handleSign: (
    contentHash: ContentHash_Graph,
    signAs?: AccountOption['type'],
  ) => Promise<void>;
  published?: boolean;
  hasAddress: boolean;
} & RegenModalProps;

export const SignModal = ({
  iri,
  onClose,
  open,
  handleSign,
  published,
  hasAddress,
}: SignModalProps) => {
  const { _ } = useLingui();
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
  const { queryClient } = useLedger();
  const { data } = useQuery(
    convertIRIToHashQuery({
      client: queryClient,
      request: { iri: iri as string },
      enabled: !!queryClient && !!iri && published && hasAddress,
    }),
  );
  const { activeAccount } = useAuth();
  const dao = useDaoOrganization();

  const accounts = useMemo(() => {
    const opts: AccountOption[] = [];

    if (activeAccount) {
      opts.push({
        name: activeAccount.name || _(UNNAMED),
        address: activeAccount.addr || '',
        type: USER,
        image:
          activeAccount.image ||
          getDefaultAvatar({
            ...activeAccount,
            type: activeAccount.type ?? AccountType.User,
          }),
        displayName: _(msg`Personal`),
      });
    }

    if (dao?.address) {
      opts.push({
        name: dao.organizationByDaoAddress?.name || _(UNNAMED),
        address: dao.address,
        type: ORG,
        image: getDefaultAvatar({ type: AccountType.Organization }),
        displayName: _(msg`Organization`),
      });
    }

    return opts;
  }, [activeAccount, dao, _]);

  // Default to organization if available, otherwise personal
  const [selectedAddress, setSelectedAddress] = useState(
    () => dao?.address || activeAccount?.addr || '',
  );

  const selectedAccount = accounts.find(
    account => account.address === selectedAddress,
  );
  const showAccountSelector = accounts.length > 1;

  return (
    <Modal onClose={onClose} open={open}>
      <Form
        form={form}
        onSubmit={() =>
          data?.contentHash?.graph &&
          handleSign(data?.contentHash?.graph, selectedAccount?.type)
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
        {showAccountSelector && (
          <div className="mb-30">
            <ProjectAccountSelector
              label={_(msg`Sign as`)}
              accounts={accounts}
              selectedAddress={selectedAddress}
              onSelect={setSelectedAddress}
              menuPortal
            />
          </div>
        )}
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
            disabled={!verified || !isValid || !data?.contentHash?.graph}
          >
            <Trans>sign</Trans>
          </ContainedButton>
        </div>
      </Form>
    </Modal>
  );
};
