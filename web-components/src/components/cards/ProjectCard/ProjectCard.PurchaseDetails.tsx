import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Body, Label } from '../../typography';

export function PurchaseDetails({
  title,
  info,
  url,
}: {
  title: string;
  info: string;
  url?: string | null;
}): JSX.Element {
  const parsedInfo = ReactHtmlParser(info);
  return (
    <div>
      <Label color="info.dark" size="sm" mobileSize="sm">
        {title}:{' '}
      </Label>
      <Body size="sm" mobileSize="sm" display="inline">
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {parsedInfo}»
          </a>
        ) : (
          parsedInfo
        )}
      </Body>
    </div>
  );
}
