import { useNavigate } from 'react-router-dom';
import { Trans } from '@lingui/macro';

import { Flex } from 'web-components/src/components/box';
import { Title } from 'web-components/src/components/typography/Title';
import { cn } from 'web-components/src/utils/styles/cn';

import { usePathSection } from 'pages/ProfileEdit/hooks/usePathSection';
import { ProfileEditNav } from 'pages/ProfileEdit/ProfileEdit.Nav';
import WithLoader from 'components/atoms/WithLoader';

export const Orders = () => {
  const section = usePathSection();
  const navigate = useNavigate();

  const onNavClick = (sectionName: string): void => {
    const path = `/profile/edit/${sectionName.replace(' ', '-')}`;
    navigate(path);
  };

  return (
    <div className="bg-grey-100">
      <div className="flex flex-col justify-start items-center lg:items-start lg:flex-row lg:justify-evenly max-w-[946px] mx-auto p-10 lg:py-50 lg:px-15 min-h-screen">
        <ProfileEditNav
          section={section}
          onNavClick={onNavClick}
          className={cn(
            'flex-col lg:flex w-full lg:w-fit md:mr-50',
            section ? 'hidden' : 'flex',
          )}
        />
        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
          }}
          className="w-full lg:w-[560px]"
        >
          <Flex justifyContent="space-between" className="mb-25 w-full">
            <Title variant="h3">
              <Trans>My Orders</Trans>
            </Title>
          </Flex>
          <WithLoader isLoading={false} sx={{ mx: 'auto' }}>
            <div className="w-full py-40 px-10 md:py-50 md:px-40 rounded-md border border-grey-200 bg-grey-0">
              Orders content goes here
            </div>
          </WithLoader>
        </Flex>
      </div>
    </div>
  );
};
