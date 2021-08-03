import React from 'react';
import BlockContent from '@sanity/block-content-to-react';

// const serializers = {
//   types: {
//     code: props => (
//       <pre data-language={props.node.language}>
//         <code>{props.node.code}</code>
//       </pre>
//     ),
//   },
// };

const CustomBlockContent: React.FC<{ content?: any }> = ({ content }) => {
  if (content) {
    return <BlockContent blocks={content} />;
  }
  return <></>;
};

export { CustomBlockContent as BlockContent };
