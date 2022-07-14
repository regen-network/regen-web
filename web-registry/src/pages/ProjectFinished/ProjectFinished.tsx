import React from 'react';
// import { useParams } from 'react-router-dom';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import { Title } from 'web-components/lib/components/typography';
import { CardItem } from 'web-components/lib/components/modal/TxModal';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';

import { OnboardingFormTemplate } from '../../components/templates';
import { Link } from '../../components/atoms';
import { Box } from '@mui/system';

const ProjectFinished: React.FC = () => {
  // const { projectId } = useParams();

  return (
    <OnboardingFormTemplate activeStep={2} title="Project has been created!">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <OnBoardingCard>
          <Title variant="h5">Create Project</Title>
          <CardItem
            label="project id"
            value={{
              name: 'C02-007',
            }}
            linkComponent={Link}
          />
          <CardItem
            label="hash"
            value={{
              name: 'xyz123',
              url: `#`, // TODO
            }}
            linkComponent={Link}
          />
        </OnBoardingCard>
        <OutlinedButton
          sx={{ margin: '0 auto' }}
          href={'/projects/projectId/TODO'}
        >
          see project page
        </OutlinedButton>
      </Box>
    </OnboardingFormTemplate>
  );
};

export { ProjectFinished };
