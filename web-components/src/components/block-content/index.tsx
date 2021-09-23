import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { makeStyles, Theme } from '@material-ui/core';
import cx from 'clsx';
import Tooltip from '../tooltip';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& p:first-child': {
      marginTop: 0,
    },
    '& p:last-child': {
      marginBottom: 0,
    },
  },
  underline: {
    color: theme.palette.info.contrastText,
    borderBottom: `3px dashed ${theme.palette.info.contrastText}`,
  },
  tooltip: {
    cursor: 'pointer',
  },
}));

const UnderlineTooltip: React.FC = (props: any) => {
  const styles = useStyles();

  return (
    <Tooltip arrow placement="top" title={props.title} className={cx(props.title && styles.tooltip)}>
      <span className={styles.underline}>{props.children}</span>
    </Tooltip>
  );
};

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
