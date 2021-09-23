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

const CustomBlockContent: React.FC<{ content?: any; tooltipText?: string }> = ({ content, tooltipText }) => {
  const styles = useStyles();

  const serializers = {
    marks: {
      link: (props: any) => {
        const { mark, children } = props;
        const { blank, href } = mark;
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
        <BlockContent blocks={content} serializers={serializers} />
      </div>
    );
  }
  return <></>;
};

export { CustomBlockContent as BlockContent };
