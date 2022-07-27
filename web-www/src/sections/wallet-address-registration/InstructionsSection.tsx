import React from 'react';
import { makeStyles } from '@mui/styles';
import { graphql, useStaticQuery } from 'gatsby';

import Section from 'web-components/lib/components/section';
import { Body, Title } from 'web-components/lib/components/typography';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { BlockContent } from 'web-components/src/components/block-content';

import { WalletAddrRegInstructionsSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(21.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingTop: theme.spacing(17),
    },
  },
  title: {
    marginBottom: theme.spacing(8.5),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(6.75),
    },
  },
  body: {
    textAlign: 'center',
    marginBottom: theme.spacing(15),
    maxWidth: theme.spacing(225),
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(5.5),
    },
  },
}));

const query = graphql`
  query walletAddrRegInstructionsSection {
    sanityWalletAddressRegistrationPage {
      instructionSection {
        title
        _rawBody
      }
    }
  }
`;

const InstructionsSection = (): JSX.Element => {
  const { sanityWalletAddressRegistrationPage } =
    useStaticQuery<WalletAddrRegInstructionsSectionQuery>(query);
  const data = sanityWalletAddressRegistrationPage?.instructionSection;
  const styles = useStyles();
  return (
    <Section className={styles.section}>
      <Title variant="h3" align="center" sx={{ mb: [8.5, 6.75] }}>
        {data?.title}
      </Title>
      <Body
        as="div"
        size="xl"
        mobileSize="md"
        sx={{
          m: '0 auto',
          maxWidth: theme => theme.spacing(225),
          mb: [10, 12],
          textAlign: 'center',
        }}
      >
        <BlockContent content={data?._rawBody} />
      </Body>
    </Section>
  );
};

export default InstructionsSection;
