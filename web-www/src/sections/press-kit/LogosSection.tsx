import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import ContainedButton from '@regen-network/web-components/lib/components/buttons/ContainedButton';
import RegenIcon from '@regen-network/web-components/lib/components/icons/RegenIcon';
import Section from '@regen-network/web-components/lib/components/section';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';

import { PresskitLogosSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(8),
    },
  },
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(34.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(20),
    },
  },
  logo: {
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(65),
      height: theme.spacing(29),
      marginTop: theme.spacing(13.75),
      marginBottom: theme.spacing(7.5),
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(43.5),
      height: theme.spacing(19.4),
      marginTop: theme.spacing(12),
      marginBottom: theme.spacing(5),
    },
  },
}));

const query = graphql`
  query presskitLogosSection {
    sanityPresskitPage {
      logosSection {
        header
        buttonText
        buttonLink
      }
    }
  }
`;

const LogosSection = (): JSX.Element => {
  const styles = useStyles();
  const { sanityPresskitPage } =
    useStaticQuery<PresskitLogosSectionQuery>(query);
  const data = sanityPresskitPage?.logosSection;

  return (
    <Section
      title={data?.header || ''}
      classes={{ root: styles.root, title: styles.title }}
    >
      <Grid container alignItems="center" direction="column">
        <RegenIcon className={styles.logo} />
        <ContainedButton href={data?.buttonLink || ''}>
          {data?.buttonText}
        </ContainedButton>
      </Grid>
    </Section>
  );
};

export default LogosSection;
