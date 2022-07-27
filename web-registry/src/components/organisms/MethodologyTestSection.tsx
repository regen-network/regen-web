import React from 'react';
import { makeStyles } from '@mui/styles';

import { BlockContent } from 'web-components/lib/components/block-content';
import { Body, Title } from 'web-components/lib/components/typography';
import { Theme } from 'web-components/lib/theme/muiTheme';

import testMethodologyImg from '../../assets/test-methodology.png';
import { Maybe, Scalars } from '../../generated/sanity-graphql';
import { BackgroundImgSection } from '../molecules/BackgroundImgSection';

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
}));

function MethodologyTestSection({ title, descriptionRaw }: Props): JSX.Element {
  const styles = useStyles();

  return (
    <BackgroundImgSection
      img={testMethodologyImg}
      classes={{ main: styles.main, section: styles.section }}
    >
      {title && (
        <Title variant="h2" sx={{ mb: 8, textAlign: 'center' }}>
          {title}
        </Title>
      )}
      <Body as="div" size="xl" align="center">
        <BlockContent content={descriptionRaw} />
      </Body>
    </BackgroundImgSection>
  );
}

export { MethodologyTestSection };
