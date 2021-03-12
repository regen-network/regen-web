import React from 'react';
import { graphql, useStaticQuery, navigate } from 'gatsby';
import { createStyles, withStyles, makeStyles, Theme, Typography, LinearProgress } from '@material-ui/core';
import clsx from 'clsx';

import BackgroundSection from '../../components/BackgroundSection';
import Section from 'web-components/src/components/section';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { FluidObject } from 'gatsby-image';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    // paddingTop: 0,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: theme.spacing(10),
    margin: theme.spacing(7, 0, 4),
  },
  description: {
    color: 'white',
    textAlign: 'center',
    maxWidth: theme.spacing(150),
    fontSize: theme.spacing(5),
    margin: theme.spacing(5, 0),
  },
}));

type InfoItem = {
  title: string;
  description: string;
  gitLink: string;
  icon: {
    publicURL: string;
  };
};

type QueryData = {
  background: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  text: {
    whatsNextSection: {
      title: string;
      description: string;
      infoItems: InfoItem[];
    };
  };
};

const WhatsNextSection: React.FC = () => {
  const {
    background: { childImageSharp },
    text: {
      whatsNextSection: { title, description, infoItems },
    },
  } = useStaticQuery<QueryData>(graphql`
    query {
      background: file(relativePath: { eq: "mainnet-whats-next.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: mainnetYaml {
        whatsNextSection {
          title
          description
          infoItems {
            title
            description
            gitLink
            icon {
              extension
              publicURL
            }
          }
        }
      }
    }
  `);
  const classes = useStyles();
  return (
    <BackgroundSection
      className={classes.root}
      linearGradient="linear-gradient(209.5deg, rgba(250, 235, 209, 0.8) 12.63%, rgba(125, 201, 191, 0.8) 44.03%, rgba(81, 93, 137, 0.8) 75.43%);"
      imageData={childImageSharp.fluid}
    >
      <div className={classes.main}>
        <Typography variant="h1" className={classes.title}>
          {title}
        </Typography>
        <Typography className={classes.description}>{description}</Typography>
      </div>
    </BackgroundSection>
  );
};

const useActionItemStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: theme.spacing(47),
    margin: theme.spacing(4),
  },
  img: {
    minWidth: '100%',
    maxHeight: theme.spacing(20),
  },
  title: {
    fontSize: theme.spacing(6),
    margin: theme.spacing(5, 0),
  },
  btn: {
    fontSize: theme.spacing(3),
    padding: theme.spacing(2, 4),
    marginTop: theme.spacing(5),
  },
  description: {
    color: theme.palette.info.dark,
  },
}));

/**
 * TODO: This is very similar to the `ImageItems` component, and they could probably be consolodated but when I first tried it was creating issues so I opted to re-create
 */
// const InfoItem: React.FC<InfoItem> = p => {
//   const classes = useActionItemStyles();
//   return (
//     <div className={classes.root}>
//       <img src={p.icon.publicURL} alt={p.description} className={classes.img} />
//       <Typography variant="h1" className={classes.title}>
//         {p.title}
//       </Typography>
//       <Typography className={classes.description}>{p.description}</Typography>
//       <ContainedButton className={classes.btn} onClick={() => (window.location.href = p.gitLink)}>
//         View on Github
//       </ContainedButton>
//     </div>
//   );
// };

export default WhatsNextSection;
