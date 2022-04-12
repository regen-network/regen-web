import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Box } from '@mui/material';
import { Label } from 'web-components/lib/components/label';

import { LinkWithArrow } from '../atoms';

interface Props {
  label: string;
  name?: string;
  url?: string | null;
  creditClassId?: string; // on-chain credit class id (e.g. "C01")
  target?: '_blank' | '_self';
}

const ProjectTopLink: React.FC<Props> = ({
  label,
  name,
  url,
  creditClassId,
  target,
}) => {
  if (!label || !name) return null;

  const text = (
    <Box component="span" sx={{ fontColor: 'info.dark' }}>
      {name && ReactHtmlParser(name)}
      {creditClassId && name ? (
        <span> ({creditClassId})</span>
      ) : (
        <span>{creditClassId}</span>
      )}
    </Box>
  );
  return (
    <Box
      sx={{
        alignItems: 'baseline',
        pt: 1.75,
      }}
    >
      <Label component="span" sx={{ fontSize: { xs: '12px' }, mr: 2 }}>
        {label + ':'}
      </Label>
      <Box component="span" sx={{ fontSize: { xs: '14px', sm: '16px' } }}>
        {url ? (
          <LinkWithArrow
            sx={{ position: 'relative' }}
            href={url}
            label={text}
            target={target}
          />
        ) : (
          <>{text}</>
        )}
      </Box>
    </Box>
  );
};

export { ProjectTopLink };
