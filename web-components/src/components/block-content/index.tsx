import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { makeStyles } from '@material-ui/core';

import { UnderlineTooltip } from '../tooltip/UnderlineTooltip';

const useStyles = makeStyles(() => ({
  root: {
    '& p:first-child': {
      marginTop: 0,
    },
    '& p:last-child': {
      marginBottom: 0,
    },
  },
}));

const CustomBlockContent: React.FC<{
  className?: string;
  content?: any;
  tooltipText?: string;
  onClickModalLink?: (href: string) => any;
}> = ({ onClickModalLink, content, tooltipText, className }) => {
  const styles = useStyles();

  const serializers = {
    marks: {
      link: (props: any) => {
        const { mark, children } = props;
        const { blank, href, modal } = mark;
        // the CMS has a field for opening links from portable text in a modal,
        // but the behavior requires a callback to handle
        if (modal && onClickModalLink) {
          return (
            <a
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
      underline: (props: any) => <UnderlineTooltip {...props} title={tooltipText} />,
    },
  };

  if (content) {
    return (
      <div className={styles.root}>
        <BlockContent className={className} blocks={content} serializers={serializers} />
      </div>
    );
  }
  return <></>;
};

export { CustomBlockContent as BlockContent };
