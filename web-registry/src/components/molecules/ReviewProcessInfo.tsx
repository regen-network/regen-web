import React from 'react';
import cx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Title from 'web-components/lib/components/title';
import { BlockContent } from 'web-components/lib/components/block-content';
import Description from 'web-components/lib/components/description';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { Label } from 'web-components/lib/components/label';

import { ReviewSectionFieldsFragment, Maybe } from '../../generated/sanity-graphql';
import { onBtnClick } from '../../lib/button';

const useStyles = makeStyles(theme => ({
  root: {
    '& > div': {
      padding: theme.spacing(3, 0),
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(2, 0),
      },
      '&:first-of-type': {
        paddingTop: 0,
      },
      '&:last-of-type': {
        paddingBottom: 0,
      },
    },
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
  disclaimerTop: {
    color: theme.palette.info.dark,
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(18),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  timespan: {
    color: theme.palette.secondary.main,
    letterSpacing: '1px',
    fontSize: theme.typography.pxToRem(18),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  description: {
    fontSize: theme.typography.pxToRem(22),
    lineHeight: theme.typography.pxToRem(33),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(18),
      lineHeight: theme.typography.pxToRem(27),
    },
  },
  disclaimerBottom: {
    fontSize: theme.typography.pxToRem(12),
    paddingTop: theme.spacing(2),
    color: theme.palette.info.dark,
  },
}));

const ReviewProcessInfo: React.FC<{
  className?: string;
  reviewSection?: Maybe<ReviewSectionFieldsFragment>;
  openModal: (link: string) => void;
}> = props => {
  const styles = useStyles();
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      className={cx(styles.root, props.className)}
    >
      {props.reviewSection?.disclaimerTop && (
        <div>
          <Typography className={styles.disclaimerTop}>{props.reviewSection?.disclaimerTop}</Typography>
        </div>
      )}
      <div>
        <Title variant="h2" align="center" className={styles.title}>
          {props.reviewSection?.title}
        </Title>
      </div>
      {props.reviewSection?.timespan && (
        <div>
          <Label className={styles.timespan}>{props.reviewSection?.timespan}</Label>
        </div>
      )}
      <div>
        <Description className={styles.description} align="center">
          <BlockContent content={props.reviewSection?.descriptionRaw} />
        </Description>
      </div>
      {props.reviewSection?.button && (
        <div>
          <ContainedButton onClick={() => onBtnClick(props.openModal, props.reviewSection?.button)}>
            {props.reviewSection.button.buttonText}
          </ContainedButton>
        </div>
      )}
      {props.reviewSection?.disclaimerBottom && (
        <div>
          <Typography className={styles.disclaimerBottom}>{props.reviewSection?.disclaimerBottom}</Typography>
        </div>
      )}
    </Box>
  );
};

export { ReviewProcessInfo };
