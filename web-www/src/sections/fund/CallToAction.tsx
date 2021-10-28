import React, { useState } from 'react';
import { makeStyles, Theme, Link } from '@material-ui/core';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import Grid from '@material-ui/core/Grid';
import ReactHtmlParser from 'react-html-parser';

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
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: theme.palette.grey[100],
    borderRadius: '10px',
    background: theme.palette.grey[50],
    padding: theme.spacing(8),
    height: theme.spacing(89.75),
    justifyContent: 'space-between',
  },
  image: {
    maxHeight: theme.spacing(28),
    maxWidth: theme.spacing(28),
  },
  title: {
    lineHeight: '34.8px',
  },
  description: {
    fontSize: theme.typography.pxToRem(22),
  },
  link: {
    cursor: 'pointer',
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
            <Grid key={cta.header} item xs>
              <Card className={styles.card}>
                <Img className={styles.image} fixed={cta.image.childImageSharp.fixed} />
                <Title className={styles.title} variant="h4" align="center">
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
