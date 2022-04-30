import React from 'react';
import { Box, SxProps } from '@mui/material';
import ReactHtmlParser from 'react-html-parser';

import { Body, Title } from '../typography';
import { BlockContent, SanityBlockOr } from '../block-content';
import { Theme } from '~/theme/muiTheme';

type Props = {
  title: string;
  body?: SanityBlockOr<string>; // accepts an HTML string or an array of sanity BlockContent
  sx?: {
    root?: SxProps<Theme>;
    title?: SxProps<Theme>;
    body?: SxProps<Theme>;
  };
};

export function TitleBody({ title, body, sx }: Props): JSX.Element {
  return (
    <Box
      sx={{
        position: 'relative',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...sx?.root,
      }}
    >
      <Title align="center" variant="h2" pb={[3.25, 7.75]} sx={sx?.title}>
        {title}
      </Title>
      <Body size="xl" as="div" sx={sx?.body}>
        {typeof body === 'string' ? (
          ReactHtmlParser(body)
        ) : (
          <BlockContent content={body} />
        )}
      </Body>
    </Box>
  );
}
