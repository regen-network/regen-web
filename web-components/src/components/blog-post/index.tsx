import React from 'react';
import { Box } from '@mui/material';

import { Body, Title } from '../typography';
import OutlinedButton from '../buttons/OutlinedButton';
import { BlockContent, SanityBlockOr } from '../block-content';

export interface BlogPostProps {
  header: string;
  description: SanityBlockOr<string>; // optional array for sanity block content
  img: JSX.Element;
  url: string;
}

const BlogPost: React.FC<BlogPostProps> = ({
  header,
  description,
  img,
  url,
}) => {
  return (
    <div>
      <Box
        sx={theme => ({
          '& img': {
            width: '100%',
            borderRadius: '10px',
            border: `1px solid ${theme.palette.info.light}`,
            height: [theme.spacing(50.75), theme.spacing(63)],
          },
        })}
      >
        {img}
      </Box>
      <Title variant="h5" sx={{ pt: [3.25, 5], pb: [2, 3] }}>
        {header}
      </Title>
      <Body pb={5.75} as="div">
        {typeof description == 'string' ? (
          description
        ) : (
          <BlockContent content={description} />
        )}
      </Body>
      <OutlinedButton
        size="small"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        read more
      </OutlinedButton>
    </div>
  );
};

export default BlogPost;
