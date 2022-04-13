import React from 'react';
import { makeStyles } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';
import { Title } from 'web-components/lib/components/typography';
import Description from 'web-components/lib/components/description';
import { BlockContent } from 'web-components/lib/components/block-content';

import { BackgroundImgSection } from '../molecules/BackgroundImgSection';
import testMethodologyImg from '../../assets/test-methodology.png';
import { Maybe, Scalars } from '../../generated/sanity-graphql';

type Props = {
  title?: string | null;
  descriptionRaw?: Maybe<Scalars['JSON']>;
};

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(30, 5),
    },
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
}));

function MethodologyTestSection({ title, descriptionRaw }: Props): JSX.Element {
  const styles = useStyles();

  return (
    <BackgroundImgSection
      img={testMethodologyImg}
      classes={{ main: styles.main, section: styles.section }}
    >
      {title && (
        <Title className={styles.title} variant="h2" align="center">
          {title}
        </Title>
      )}
      <Description className={styles.description} align="center">
        <BlockContent content={descriptionRaw} />
      </Description>
    </BackgroundImgSection>
  );
}

export { MethodologyTestSection };
