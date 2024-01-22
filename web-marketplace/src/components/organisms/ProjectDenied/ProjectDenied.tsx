import { Flex } from 'web-components/src/components/box';
import {
  Body,
  Subtitle,
  Title,
} from 'web-components/src/components/typography';
import { headerFontFamily } from 'web-components/src/theme/muiTheme';

import { Link } from 'components/atoms';

type Props = {
  address?: string | null;
  projectId?: string;
  isEdit?: boolean;
};

export const ProjectDenied = ({ address, projectId, isEdit }: Props) => {
  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      sx={{
        mt: 17.5,
        maxWidth: 560,
        mx: 'auto',
        px: 3.75,
        '& a': {
          color: 'secondary.main',
          fontWeight: 700,
          fontSize: { xs: 18, sm: 22 },
        },
      }}
    >
      <Title as="h1" variant="h3" sx={{ mb: { xs: 10, sm: 7.5 } }}>
        {`${isEdit ? 'Edit' : 'Create'} Project - Access Denied`}
      </Title>
      <Subtitle
        size="sm"
        sx={{
          mb: { xs: 4, sm: 3.375 },
          textTransform: 'uppercase',
          color: 'info.dark',
          fontWeight: 800,
          fontFamily: headerFontFamily,
          letterSpacing: 1,
          textAlign: 'center',
        }}
      >
        {'You must have access to the following address: '}
      </Subtitle>
      <Link
        href={`/profiles/${address}/portfolio`}
        sx={{
          mb: { xs: 4, sm: 4.375 },
          wordBreak: 'break-word',
          textAlign: 'center',
        }}
      >
        {address}
      </Link>
      <Body size="lg" sx={{ mb: 10, textAlign: 'center' }}>
        {'Please select this address in keplr in order to access this page.'}
      </Body>
      {isEdit && (
        <>
          <Subtitle
            size="sm"
            sx={{
              mb: { xs: 4, sm: 3.375 },
              textTransform: 'uppercase',
              color: 'info.dark',
              fontWeight: 800,
              fontFamily: headerFontFamily,
              letterSpacing: 1,
            }}
          >
            {'The project can still be viewed at:'}
          </Subtitle>
          <Link
            href={`/project/${projectId}`}
          >{`app.regen.network/project/${projectId}`}</Link>
        </>
      )}
    </Flex>
  );
};
