import React from 'react';
import { Box, Grid } from '@mui/material';

import { ButtonText, Title } from 'web-components/lib/components/typography';
import { Image } from 'web-components/lib/components/image';
import { DualImageSection } from '../../generated/sanity-graphql';

const LabeledImage = (props: {
  imgSrc?: string | null;
  text?: string | null;
  label?: string | null;
}): JSX.Element => (
  <Image backgroundImage src={props.imgSrc || ''}>
    <Box
      sx={{
        py: {
          xs: 30,
          sm: 60.5,
        },
        '&:first-child': {
          py: { xs: 34.25, sm: 60.5 },
        },
      }}
    >
      <Title
        sx={{
          fontSize: [80, 100],
          color: 'primary.main',
          textAlign: 'center',
          textShadow: theme => theme.shadows[4],
        }}
      >
        {props.text}
      </Title>
      <Box
        sx={{
          textAlign: 'center',
          pt: [1.5, 2.5],
        }}
      >
        <ButtonText
          sx={{
            color: 'primary.main',
            backgroundColor: 'secondary.main',
            borderRadius: '2px',
            display: 'inline-block',
            py: 1,
            px: 2.5,
          }}
        >
          {props.label}
        </ButtonText>
      </Box>
    </Box>
  </Image>
);

export const TwoImageSection: React.FC<{ content: DualImageSection }> = ({
  content,
}) => {
  return (
    <Grid container sx={{ position: 'relative' }}>
      <Box
        sx={theme => ({
          position: 'absolute',
          backgroundColor: 'primary.main',
          opacity: '0.8',
          borderRadius: '2px',
          boxShadow: theme.shadows[4],
          transform: 'translateX(-50%)',
          left: '50%',
          width: ['95%', 'auto'],
          p: [theme.spacing(3.5, 3), theme.spacing(2, 4)],
          top: [theme.spacing(5), theme.spacing(11)],
        })}
      >
        <ButtonText size="lg" mobileSize="sm" align="center" color="info.dark">
          {content?.title}
        </ButtonText>
      </Box>
      <Grid item xs={12} sm={6}>
        <LabeledImage
          imgSrc={content?.left?.image?.image?.asset?.url}
          text={content?.left?.boldText}
          label={content?.left?.label}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LabeledImage
          imgSrc={content?.right?.image?.image?.asset?.url}
          text={content?.right?.boldText}
          label={content?.right?.label}
        />
      </Grid>
    </Grid>
  );
};
