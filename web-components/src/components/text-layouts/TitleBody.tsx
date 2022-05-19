import React from 'react';
import { Box, SxProps } from '@mui/material';
import ReactHtmlParser from 'react-html-parser';

import { Body, Title } from '../typography';
import { BlockContent, SanityBlockOr } from '../block-content';
import { Theme } from '~/theme/muiTheme';
import { TextSize } from '../typography/sizing';

type Props = {
  title: string;
  body?: SanityBlockOr<string>; // accepts an HTML string or an array of sanity BlockContent
  /** Pass a single value to take default responsive styles, or a 2-tuple for `[mobile, desktop]`  */
  bodySize?: TextSize | [TextSize, TextSize];
  sx?: {
    root?: SxProps<Theme>;
    title?: SxProps<Theme>;
    body?: SxProps<Theme>;
  };
};

/** Vertically aligned, centered Title and Body components with normalized spacing */
export function TitleBody({ title, body, bodySize, sx }: Props): JSX.Element {
  const [_bodySizeMobile, _bodySize]: [TextSize, TextSize] = Array.isArray(
    bodySize,
  )
    ? bodySize
    : ['lg', 'xl'];

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
      <Body
        size={_bodySize}
        mobileSize={_bodySizeMobile}
        as="div"
        sx={sx?.body}
      >
        {typeof body === 'string' ? (
          ReactHtmlParser(body)
        ) : (
          <BlockContent content={body} />
        )}
      </Body>
    </Box>
  );
}
