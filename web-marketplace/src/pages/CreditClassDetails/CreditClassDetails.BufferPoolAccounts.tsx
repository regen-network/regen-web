import { Flex } from 'web-components/lib/components/box';
import { Body } from 'web-components/lib/components/typography';

import { getAccountUrl } from 'lib/block-explorer';
import { BufferPoolAccount } from 'lib/db/types/json-ld/credit-class-metadata';

import { LinkWithArrow } from 'components/atoms';
import { MetaDetail } from 'components/molecules';

type Props = {
  bufferPoolAccounts?: BufferPoolAccount[];
};

const BufferPoolAccounts: React.FC<Props> = ({ bufferPoolAccounts }) => {
  if (!bufferPoolAccounts) return null;

  const count = bufferPoolAccounts?.length;

  if (!count || count < 1) return null;

  return (
    <MetaDetail
      label="buffer pool accounts"
      customContent={
        <Flex flexDirection="column">
          {bufferPoolAccounts.map(account => (
            <Body key={account?.['schema:name']} size="xl" styleLinks={false}>
              <LinkWithArrow
                href={getAccountUrl(
                  account?.['regen:walletAddress'] ||
                    account?.['regen:address'],
                )}
                label={account?.['schema:name']}
              />
            </Body>
          ))}
        </Flex>
      }
    />
  );
};

export { BufferPoolAccounts };
