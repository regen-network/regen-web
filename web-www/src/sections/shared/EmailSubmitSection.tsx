import React from 'react';
import { makeStyles } from '@mui/styles';
import NewsletterForm from '@regen-network/web-components/lib/components/form/NewsletterForm';
import {
  Label,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import clsx from 'clsx';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import { EmailSubmitSectionQuery } from '../../generated/graphql';

interface Props {
  image?: object;
  altContent?: Content;
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
    [theme.breakpoints.down('sm')]: {
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
    desktop: file(relativePath: { eq: "regen-handshake.png" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;

const EmailSubmitSection: React.FC<Props> = ({ image, altContent }) => {
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
      <div className={clsx(styles.root)} id="newsletter-signup">
        <Title
          variant="h2"
          mobileVariant="h3"
          sx={{ color: 'primary.main', textAlign: 'center' }}
        >
          {altContent?.header || content?.title}
        </Title>
        <Label
          as="div"
          sx={{
            color: 'primary.main',
            textAlign: 'center',
            pt: [5, 7.5],
            pb: [4, 6.25],
          }}
        >
          {altContent?.description ? (
            altContent.description
          ) : (
            <BlockContent content={content?._rawBody} />
          )}
        </Label>
        <NewsletterForm
          apiUri={process.env.GATSBY_API_URI}
          submitLabel={altContent?.buttonText}
          inputPlaceholder={altContent?.inputText}
        />
      </div>
    </BackgroundImage>
  );
};

export default EmailSubmitSection;
