import React from 'react';
import { makeStyles } from '@mui/styles';
import { graphql, StaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import clsx from 'clsx';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Title from 'web-components/lib/components/title';
import NewsletterForm from 'web-components/lib/components/form/NewsletterForm';

interface Props {
  image?: object;
  altContent?: Content;
  classes?: {
    root?: string;
    title?: string;
  };
}

interface Content {
  header?: string;
  description?: string;
  buttonText?: string;
  inputText?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(50)} ${theme.spacing(46.25)}`,
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      padding: `${theme.spacing(50)} ${theme.spacing(30)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(21.25)} ${theme.spacing(4)}`,
    },
  },
  title: {
    color: theme.palette.primary.main,
    textAlign: 'center',
  },
  description: {
    color: theme.palette.primary.main,
    textAlign: 'center',
    fontWeight: 800,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(7.5),
      paddingBottom: theme.spacing(6.25),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(4),
    },
  },
}));

const EmailSubmitSection = ({ image, altContent, classes }: Props): JSX.Element => {
  const styles = useStyles({});
  return (
    <StaticQuery
      query={graphql`
        {
          text: sharedYaml {
            newsletterSection {
              header
              description
            }
          }
          desktop: file(relativePath: { eq: "regen-handshake.png" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      `}
      render={data => {
        const imageData = image || data.desktop.childImageSharp.fluid;
        const content: Content = altContent || data.text.newsletterSection;

        return (
          <BackgroundImage Tag="section" fluid={imageData} backgroundColor={`#040e18`}>
            <div className={clsx(styles.root, classes?.root)} id="newsletter-signup">
              <Title className={clsx(styles.title, classes?.title)} variant="h2">
                {content?.header}
              </Title>
              <Title variant="h6" className={styles.description}>
                {content?.description}
              </Title>
              <NewsletterForm
                apiUri={process.env.GATSBY_API_URI}
                submitLabel={content?.buttonText}
                inputPlaceholder={content?.inputText}
              />
            </div>
          </BackgroundImage>
        );
      }}
    />
  );
};

export default EmailSubmitSection;
