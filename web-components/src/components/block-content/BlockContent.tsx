import React from 'react';
import BlockContent from '@sanity/block-content-to-react';

import { UnderlineTooltip } from '../tooltip/UnderlineTooltip';
import { Box, SxProps, Theme } from '@mui/material';

export type SanityBlockContent = any[] | any; // copied from Sanity's types
export type SanityBlockOr<T> = T | SanityBlockContent;

const CustomBlockContent: React.FC<{
  className?: string;
  content: SanityBlockContent;
  tooltipText?: string;
  noYMargin?: boolean;
  /** we can't pass `sx` directly, so use wrapper to target elements */
  sxWrap?: SxProps<Theme>;
  onClickModalLink?: (href: string) => any;
}> = ({
  onClickModalLink,
  content,
  tooltipText,
  className,
  sxWrap = [],
  noYMargin = false,
}) => {
  const serializers = {
    marks: {
      link: (props: any) => {
        const { mark, children } = props;
        const { blank, href, modal } = mark;
        // the CMS has a field for opening links from portable text in a modal,
        // but the behavior requires a callback to handle
        if (modal && onClickModalLink) {
          return (
            <a // eslint-disable-line
              href="#"
              onClick={e => {
                e.preventDefault();
                onClickModalLink(href);
              }}
            >
              {children}
            </a>
          );
        }
        return blank ? (
          <a href={href} target="_blank" rel="noreferrer noopener">
            {children}
          </a>
        ) : (
          <a href={href}>{children}</a>
        );
      },
      underline: (props: any) => (
        <UnderlineTooltip {...props} title={tooltipText} />
      ),
    },
  };

  if (content) {
    return (
      <Box
        sx={[
          !!noYMargin && {
            '& p:first-child': {
              marginTop: 0,
            },
            '& p:last-child': {
              marginBottom: 0,
            },
          },
          ...(Array.isArray(sxWrap) ? sxWrap : [sxWrap]),
        ]}
      >
        <BlockContent
          className={className}
          blocks={content}
          serializers={serializers}
        />
      </Box>
    );
  }
  return <></>;
};

export function blocksToText(blocks: SanityBlockContent): string {
  return blocks.map((block: { children: { text: string }[] }) =>
    block.children.map(child => child.text).join(''),
  );
}

export { CustomBlockContent as BlockContent };
