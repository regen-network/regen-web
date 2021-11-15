import React, { useState } from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import { Link, Grid, Avatar } from '@mui/material';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import ReactHtmlParser from 'react-html-parser';
import cx from 'clsx';

import Card from 'web-components/lib/components/cards/Card';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import Section from 'web-components/src/components/section';
import Modal from 'web-components/src/components/modal';

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    paddingTop: theme.spacing(10),
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
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(8, 4),
    },
  },
  greenCircle: {
    backgroundColor: theme.palette.secondary.light,
    width: theme.spacing(28),
    height: theme.spacing(28),
    overflow: 'initial',
  },
  title: {
    lineHeight: '34.8px',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(24),
    },
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(22),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  link: {
    cursor: 'pointer',
  },
  verticalSpacing: {
    marginBottom: theme.spacing(4),
  },
}));

const CallToAction = (): JSX.Element => {
  const styles = useStyles();

  const data = useStaticQuery(graphql`
    query {
      text: fundYaml {
        calltoActionSection {
          callToActions {
            image {
              childImageSharp {
                fixed(quality: 90, width: 159) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
            header
            description
            descriptionWithModalLink {
              beginning
              linkText
              linkUrl
              end
            }
          }
        }
      }
    }
  `);

  const content = data.text.calltoActionSection;
  const [modalIframeLink, setModalIframeLink] = useState<string>('');

  return (
    <Section className={styles.root}>
      <Grid container spacing={5}>
        {content.callToActions.map((cta: any) => {
          return (
            <Grid key={cta.header} item sm={6}>
              <Card className={styles.card}>
                <Avatar className={cx(styles.greenCircle, styles.verticalSpacing)}>
                  <Img fixed={cta.image.childImageSharp.fixed} />
                </Avatar>
                <Title className={cx(styles.title, styles.verticalSpacing)} variant="h4" align="center">
                  {cta.header}
                </Title>
                <Description className={styles.description} align="center">
                  {cta.descriptionWithModalLink ? (
                    <>
                      {cta.descriptionWithModalLink.beginning}{' '}
                      <Link
                        className={styles.link}
                        onClick={() => setModalIframeLink(cta.descriptionWithModalLink.linkUrl)}
                      >
                        {cta.descriptionWithModalLink.linkText}
                      </Link>{' '}
                      {cta.descriptionWithModalLink.end}
                    </>
                  ) : (
                    ReactHtmlParser(cta.description)
                  )}
                </Description>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Modal open={!!modalIframeLink} onClose={() => setModalIframeLink('')} className={styles.modal}>
        <iframe title="cta-modal-iframe-link" src={modalIframeLink} />
      </Modal>
    </Section>
  );
};

export default CallToAction;
