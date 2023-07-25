import { Flex } from 'web-components/lib/components/box';
import SmallArrowIcon from 'web-components/lib/components/icons/SmallArrowIcon';
import { Body } from 'web-components/lib/components/typography';

import { getAccountUrl } from 'lib/block-explorer';
import { BufferPoolAccount } from 'lib/db/types/json-ld/credit-class-metadata';

import { Link } from 'components/atoms';
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
            <Link
              sx={{
                display: 'flex',
                color: 'secondary.main',
              }}
              href={getAccountUrl(
                account?.['regen:walletAddress'] || account?.['regen:address'],
              )}
              target="_blank"
            >
              <Body size="xl" key={account?.['schema:name']}>
                {account?.['schema:name']}
                <SmallArrowIcon
                  sx={{
                    mb: 0.3,
                    height: 9,
                    width: 13,
                    ml: 2,
                    display: 'inline',
                  }}
                />
              </Body>
            </Link>
          ))}
        </Flex>
      }
    />
  );
};

export { BufferPoolAccounts };
