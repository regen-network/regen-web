import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { makeStyles, Theme } from '@material-ui/core';

// const serializers = {
//   types: {
//     code: props => (
//       <pre data-language={props.node.language}>
//         <code>{props.node.code}</code>
//       </pre>
//     ),
//   },
// };

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
        <BlockContent blocks={content} />
      </div>
    );
  }
  return <></>;
};

export { CustomBlockContent as BlockContent };
