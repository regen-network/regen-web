import { ReactElement } from 'react';
import ReactHtmlParser from 'html-react-parser';

export function parseText(
  content: string | JSX.Element,
): ReactElement[] | JSX.Element | string {
  return typeof content === 'string' ? ReactHtmlParser(content) : content;
}
