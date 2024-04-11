import React, { useMemo, useState } from 'react';
import Fade from '@mui/material/Fade';
import { Theme } from '@mui/material/styles';
import ReactHtmlParser from 'html-react-parser';
import { makeStyles } from 'tss-react/mui';

import { ExpandButton } from '../buttons/ExpandButton';
import { Body } from '../typography';
import { Texts, truncate } from './truncate';

export interface ReadMoreProps {
  children: string;
  maxLength?: number;
  restMinLength?: number;
  classes?: {
    root?: string;
    textContainer?: string;
    description?: string;
    expanded?: string;
  };
  applyExpandedClass?: number;
}

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(7),
    width: 'inherit',
  },
  textContainer: {
    paddingTop: theme.spacing(4),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    border: 'none',
    marginLeft: theme.spacing(4),
  },
  buttonLabel: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  text: {
    '&:after': {
      content: '""',
      display: 'inline-block',
      width: theme.spacing(1),
    },
  },
}));

const ReadMore: React.FC<React.PropsWithChildren<ReadMoreProps>> = ({
  maxLength = 700,
  restMinLength = 300,
  children,
  classes,
  applyExpandedClass,
}) => {
  const { classes: styles, cx } = useStyles();
  const [expanded, setExpanded] = useState(false);
  const texts: Texts = truncate(children, maxLength, restMinLength);
  const Button: React.FC<React.PropsWithChildren<unknown>> = () => (
    <ExpandButton
      sx={{ p: [0, 0] }}
      onClick={() => setExpanded(!expanded)}
      expanded={expanded}
    />
  );
  const rest = useMemo(
    () => texts.rest.split('\n').filter(text => !!text),
    [texts],
  );

  return (
    <div className={cx(styles.root, classes?.root)}>
      <div className={cx(styles.textContainer, classes?.textContainer)}>
        <Body size="xl" mobileSize="md">
          <span className={styles.text}>
            {ReactHtmlParser(texts.truncated)}
          </span>
          {texts.rest && !expanded && <Button />}
        </Body>
        <Fade in={expanded} mountOnEnter unmountOnExit>
          {/* https://mui.com/guides/migration-v4/#cannot-read-property-scrolltop-of-null */}
          <div
            className={
              applyExpandedClass && texts.truncated.length < applyExpandedClass
                ? classes?.expanded
                : ''
            }
          >
            {!texts.rest.startsWith('\n') && (
              <Body size="xl" mobileSize="md">
                {'\n'}
              </Body>
            )}
            {rest.map((text, i) => (
              <Body size="xl" mobileSize="md">
                {rest && i === 0 && expanded && (
                  <>
                    <br />
                  </>
                )}
                <span className={styles.text}>{ReactHtmlParser(text)}</span>
                {rest && i === rest.length - 1 && expanded && <Button />}
                {rest && i !== rest.length - 1 && expanded && (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </Body>
            ))}
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default ReadMore;
