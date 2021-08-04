import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { makeStyles, Theme } from '@material-ui/core';

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
  },
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& p:first-child': {
      marginTop: 0,
    },
    '& p:last-child': {
      marginBottom: 0,
    },
  },
}));

const CustomBlockContent: React.FC<{ content?: any }> = ({ content }) => {
  const styles = useStyles();
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
