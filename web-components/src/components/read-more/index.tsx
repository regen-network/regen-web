import React, { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import Fade from '@mui/material/Fade';
import { Theme } from '@mui/material/styles';
import ReactHtmlParser from 'html-react-parser';
import { makeStyles } from 'tss-react/mui';

import { ExpandButton } from '../buttons/ExpandButton';
import { Body } from '../typography';
import { TextSize } from '../typography/sizing';
import { Texts, truncate } from './truncate';

export interface ReadMoreProps {
  children: string;
  maxLength?: number;
  restMinLength?: number;
  classes?: {
    root?: string;
    textContainer?: string;
    description?: string;
    button?: string;
    expanded?: string;
  };
  applyExpandedClass?: number;
  sentenceBased?: boolean;
  size?: TextSize;
  mobileSize?: TextSize;
  component?: React.ElementType<any>;
  buttonClassName?: string;
}

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(7),
    width: 'inherit',
  },
  textContainer: {
    paddingTop: theme.spacing(4),
  },
}));

const ReadMore: React.FC<React.PropsWithChildren<ReadMoreProps>> = ({
  maxLength = 700,
  restMinLength = 300,
  children,
  classes,
  applyExpandedClass,
  size = 'xl',
  mobileSize,
  sentenceBased = true,
  component = 'p',
}) => {
  const { classes: styles, cx } = useStyles();
  const [expanded, setExpanded] = useState(false);
  const texts: Texts = truncate(
    children,
    maxLength,
    restMinLength,
    sentenceBased,
  );
  const Button: React.FC<React.PropsWithChildren<unknown>> = () => (
    <ExpandButton
      className={classes?.button}
      sx={{
        p: [0, 0],
        background: 'transparent',
        '&:before': {
          content: '""',
          display: 'inline-block',
          width: sentenceBased ? 4 : 0,
        },
      }}
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
        <Body component={component} size={size} mobileSize={mobileSize}>
          {ReactHtmlParser(texts.truncated)}
          {texts.rest && !expanded && !sentenceBased && '...'}
          {texts.rest && !expanded && <Button />}
        </Body>
        <Fade in={expanded} mountOnEnter unmountOnExit>
          <Box
            component={component}
            className={
              applyExpandedClass && texts.truncated.length < applyExpandedClass
                ? classes?.expanded
                : ''
            }
          >
            {sentenceBased && !texts.rest.startsWith('\n') && (
              <Body component={component} size={size} mobileSize={mobileSize}>
                {'\n'}
              </Body>
            )}
            {rest.map((text, i) => (
              <Body component={component} size={size} mobileSize={mobileSize}>
                {sentenceBased && rest && i === 0 && expanded && (
                  <>
                    <br />
                  </>
                )}
                {ReactHtmlParser(text)}
                {rest && i === rest.length - 1 && expanded && <Button />}
                {sentenceBased && rest && i !== rest.length - 1 && expanded && (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </Body>
            ))}
          </Box>
        </Fade>
      </div>
    </div>
  );
};

export default ReadMore;
