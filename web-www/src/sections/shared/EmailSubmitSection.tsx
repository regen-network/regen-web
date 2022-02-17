import React from 'react';
import { makeStyles } from '@mui/styles';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import clsx from 'clsx';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Title from 'web-components/lib/components/title';
import { BlockContent } from 'web-components/src/components/block-content';
import { EmailSubmitSectionQuery } from '../../generated/graphql';

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
    zIndex: 1,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(50)} ${theme.spacing(46.25)}`,
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      padding: `${theme.spacing(50)} ${theme.spacing(30)}`,
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(21.25)} ${theme.spacing(4)}`,
    },
  },
  title: {
    color: theme.palette.primary.main,
    textAlign: 'center',
  },
  gradient: {
    height: '100%',
    zIndex: -1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      background:
        'linear-gradient(180deg, rgba(255, 249, 238, 0.74) 0%, rgba(255, 249, 238, 0) 27.6%), linear-gradient(194.2deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%)',
    },
    [theme.breakpoints.down('sm')]: {
      background:
        'linear-gradient(180deg, rgba(255, 249, 238, 0.74) 0%, rgba(255, 249, 238, 0) 27.6%), linear-gradient(194.2deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%)',
    },
    opacity: 0.8,
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
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3.5),
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(4),
    },
  },
}));

const query = graphql`
  query emailSubmitSection {
    sanitySharedSections {
      newsletter {
        title
        _rawBody
      }
    }
    desktop: file(relativePath: { eq: "lush-and-misty-forest.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;

const EmailSubmitSection: React.FC<Props> = ({
  image,
  altContent,
  classes,
}) => {
  const styles = useStyles();
  const data = useStaticQuery<EmailSubmitSectionQuery>(query);
  const content = data.sanitySharedSections?.newsletter;
  const imageData = image || data.desktop?.childImageSharp?.fluid;
  return (
    <BackgroundImage
      Tag="section"
      fluid={imageData as any}
      backgroundColor={`#040e18`}
    >
      <div className={styles.gradient} />
      <div className={clsx(styles.root, classes?.root)} id="newsletter-signup">
        <Title className={clsx(styles.title, classes?.title)} variant="h2">
          {altContent?.header || content?.title}
        </Title>
        <Title variant="h6" className={styles.description}>
          {altContent?.description ? (
            altContent.description
          ) : (
            <BlockContent content={content?._rawBody} />
          )}
        </Title>
        {/* <NewsletterForm
          apiUri={process.env.GATSBY_API_URI}
          submitLabel={altContent?.buttonText}
          inputPlaceholder={altContent?.inputText}
        /> */}
      </div>
    </BackgroundImage>
  );
};

export default EmailSubmitSection;
