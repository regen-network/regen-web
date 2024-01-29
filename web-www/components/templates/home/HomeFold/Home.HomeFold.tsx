import { Box } from '@mui/material';
import clsx from 'clsx';

import { Body, Title } from 'web-components/src/components/typography/index';

import { useHomeFoldStyles } from './Home.HomeFold.styles';

import { HomeFoldSectionFieldsFragment } from '@/generated/sanity-graphql';

type Props = {
  className?: string;
  homeFoldData?: HomeFoldSectionFieldsFragment['homeFoldSection'];
};

export const HomeFoldSection = ({ className, homeFoldData }: Props) => {
  const { classes } = useHomeFoldStyles();
  const bgImage =
    homeFoldData?.image?.image?.asset?.url ?? homeFoldData?.image?.imageHref;

  return (
    <Box
      sx={[
        {
          background: `url(${bgImage})`,
          backgroundPosition: 'bottom center',
          backgroundSize: 'cover',
          paddingTop: { xs: 23.75, sm: 60 },
          height: { xs: 550, sm: 864 },
        },
      ]}
      className={clsx(classes.root, className)}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div className={classes.backgroundGradient}></div>
        <Title
          align="center"
          color="primary"
          variant="h1"
          sx={{
            mx: 'auto',
            maxWidth: '80%',
            mb: 3,
          }}
        >
          {homeFoldData?.title}
        </Title>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Body
            color="primary"
            size="xl"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '1.125rem', sm: '1.62rem' },
              maxWidth: { xs: '90%', sm: 650 },
              textShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            {homeFoldData?.body}
          </Body>
        </Box>
      </Box>
    </Box>
  );
};
