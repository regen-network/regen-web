import React from 'react';
import { Grid, Box, SxProps } from '@mui/material';

import Card from './Card';
import OutlinedButton from '../buttons/OutlinedButton';
import { BlockContent, SanityBlockOr } from '../block-content';
import { Body, Title } from '../typography';
import type { Theme } from '~/theme/muiTheme';

const GreenTopIconCard: React.FC<{
  title: string;
  description: SanityBlockOr<string>;
  linkUrl: string;
  linkText: string;
  imgSrc: string;
  sx?: SxProps<Theme>;
}> = props => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: 'none',
        borderRadius: '9px',
        maxWidth: 370,
        height: '100%',
        ...props.sx,
      }}
    >
      <Box sx={{ backgroundColor: 'secondary.contrastText', py: 5 }}>
        <Box
          component="img"
          src={props.imgSrc}
          alt={
            typeof props.description === 'string'
              ? props.description
              : props.title
          }
          sx={{
            width: '100%',
            height: theme => theme.spacing(20),
            m: '0 auto',
          }}
        />
      </Box>

      <Box
        sx={{ display: 'flex', flexDirection: 'column', flex: 1, px: 5, py: 7 }}
      >
        <Title variant="h3" sx={{ mb: 4 }}>
          {props.title}
        </Title>
        <Body as="div">
          {typeof props.description === 'string' ? (
            props.description
          ) : (
            <BlockContent content={props.description} />
          )}
        </Body>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            mt: 4,
          }}
        >
          <OutlinedButton
            size="small"
            href={props.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.linkText}
          </OutlinedButton>
        </Box>
      </Box>
    </Card>
  );
};

export default GreenTopIconCard;
