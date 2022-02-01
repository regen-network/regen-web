import ReactHtmlParser from 'react-html-parser';
import { ReactElement } from 'react';

export function parseText(
  content: string | JSX.Element,
): ReactElement[] | JSX.Element {
  return typeof content === 'string' ? ReactHtmlParser(content) : content;
}
