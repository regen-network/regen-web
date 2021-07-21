import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ReactHtmlParser from 'react-html-parser';

import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';

import { BackgroundImgSection } from '../molecules/BackgroundImgSection';
import testMethodologyImg from '../../assets/test-methodology.png';
import { Methodology } from '../../mocks/cms-duplicates';

type Props = {
  methodology: Methodology;
};

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(8, 5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(17.75),
    },
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(236.5),
    },
  },
  title: {
    marginBottom: theme.spacing(8),
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(22),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
}));

function MethodologyTestSection({ methodology }: Props): JSX.Element {
  const styles = useStyles();

  return (
    <BackgroundImgSection img={testMethodologyImg} classes={{ main: styles.main, section: styles.section }}>
      <Title className={styles.title} variant="h2" align="center">
        {methodology.testMethodologyTitle}
      </Title>
      <Description className={styles.description} align="center">
        {ReactHtmlParser(methodology.testMethodologyDescription)}
      </Description>
    </BackgroundImgSection>
  );
}

export { MethodologyTestSection };
