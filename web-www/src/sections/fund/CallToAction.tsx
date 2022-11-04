import React, { useState } from 'react';
import { Avatar, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Card from '@regen-network/web-components/lib/components/cards/Card';
import Modal from '@regen-network/web-components/lib/components/modal';
import Section from '@regen-network/web-components/lib/components/section';
import {
  Body,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import type { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import cx from 'clsx';
import { graphql, useStaticQuery } from 'gatsby';
import SanityImage from 'gatsby-plugin-sanity-image';

import type { FundCallToActionQuery } from '../../generated/graphql';

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    paddingTop: theme.spacing(22.25),
    paddingBottom: theme.spacing(22.25),
  },
  card: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: theme.palette.grey[100],
    borderRadius: '10px',
    background: theme.palette.grey[50],
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(8),
      height: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(8, 4),
    },
  },
  image: {
    maxWidth: '100%',
  },
  greenCircle: {
    backgroundColor: theme.palette.secondary.light,
    width: theme.spacing(28),
    height: theme.spacing(28),
    overflow: 'initial',
  },
  link: {
    cursor: 'pointer',
  },
  verticalSpacing: {
    marginBottom: theme.spacing(4),
  },
}));

const query = graphql`
  query fundCallToAction {
    sanityFundPage {
      callsToAction {
        image {
          ...Image
        }
        header
        _rawDescription
      }
    }
  }
`;

const CallToAction = (): JSX.Element => {
  const styles = useStyles();
  const [modalIframeLink, setModalIframeLink] = useState<string>('');
  const { sanityFundPage: data } = useStaticQuery<FundCallToActionQuery>(query);

  return (
    <Section className={styles.root}>
      <Grid container spacing={5}>
        {data?.callsToAction?.map(cta => {
          return (
            <Grid key={cta?.header || ''} item sm={6}>
              <Card className={styles.card}>
                <Avatar
                  className={cx(styles.greenCircle, styles.verticalSpacing)}
                >
                  <SanityImage
                    className={styles.image}
                    {...(cta?.image as any)}
                    alt="Icon"
                  />
                </Avatar>
                <Title variant="h4" mobileVariant="h4" align="center" mb={4}>
                  {cta?.header || ''}
                </Title>
                <Body as="div" size="xl" align="center">
                  <BlockContent
                    content={cta?._rawDescription}
                    onClickModalLink={(href: string) =>
                      setModalIframeLink(href)
                    }
                  />
                </Body>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Modal
        open={!!modalIframeLink}
        onClose={() => setModalIframeLink('')}
        isIFrame
      >
        <iframe title="cta-modal-iframe-link" src={modalIframeLink} />
      </Modal>
    </Section>
  );
};

export default CallToAction;
