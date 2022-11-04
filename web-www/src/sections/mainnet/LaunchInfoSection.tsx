import React from 'react';
import { Box, Grid, LinearProgress, Theme } from '@mui/material';
import { createStyles, makeStyles, withStyles } from '@mui/styles';
import ContainedButton from '@regen-network/web-components/lib/components/buttons/ContainedButton';
import Section from '@regen-network/web-components/lib/components/section';
import {
  Body,
  Label,
  Subtitle,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { getFormattedDate } from '@regen-network/web-components/lib/utils/format';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import { graphql, useStaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import SanityImage from 'gatsby-plugin-sanity-image';

import {
  MainnetLaunchInfoSectionQuery,
  SanityMainnetActionItem,
} from '../../generated/graphql';

const StyledLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: theme.spacing(5),
      borderRadius: 2,
    },
    colorPrimary: {
      backgroundColor: theme.palette.info.light,
    },
    bar: {
      background:
        'linear-gradient(81.77deg, rgba(79, 181, 115, 0.7) 0%, rgba(35, 142, 73, 0.7) 73.42%);',
    },
  }),
)(LinearProgress);

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    [theme.breakpoints.up('sm')]: {
      minWidth: '40%',
      maxHeight: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
      maxHeight: theme.spacing(50),
    },
  },
  card: {
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '5px',
    margin: theme.spacing(17, 0),
    display: 'flex',
    flex: '1',
    [theme.breakpoints.up('sm')]: {
      flexFlow: 'row nowrap',
    },
    [theme.breakpoints.down('sm')]: {
      flexFlow: 'row wrap',
    },
  },
}));

const query = graphql`
  query mainnetLaunchInfoSection {
    sanityMainnetPage {
      launchDate
      launchInfoSection {
        title
        image {
          ...fluidCustomImageFields_withWebp
        }
        cardTitle
        _rawCardBody
        actionItems {
          title
          linkText
          linkUrl
          description
          icon {
            imageAlt
            image {
              ...Image
            }
          }
        }
      }
    }
  }
`;

const LaunchInfoSection: React.FC = () => {
  const { sanityMainnetPage } =
    useStaticQuery<MainnetLaunchInfoSectionQuery>(query);
  const data = sanityMainnetPage?.launchInfoSection;
  const styles = useStyles();
  return (
    <Section sx={{ root: { pb: 7 } }}>
      <Title variant="h1" align="center">
        {data?.title}
      </Title>
      <Grid container justifyContent="center" sx={{ my: 7 }}>
        {data?.actionItems?.map((item, i) => (
          <ActionItem key={i} {...(item as SanityMainnetActionItem)} />
        ))}
      </Grid>

      <div className={styles.card}>
        <Img
          className={styles.image}
          fluid={data?.image?.image?.asset?.fluid as FluidObject}
        />
        <Grid container direction="column" sx={{ py: 10, px: [4.5, 10] }}>
          <Title variant="h3">{data?.cardTitle}</Title>
          <Subtitle size="lg" color="info.main" my={4}>
            Release date:{' '}
            {getFormattedDate(sanityMainnetPage?.launchDate, {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </Subtitle>
          <Body as="div" size="xl">
            <BlockContent content={data?._rawCardBody} />
          </Body>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              flexGrow: 1,
            }}
          >
            <Label size="xs" sx={{ mt: 11, mb: 4 }}>
              100% complete
            </Label>
            <StyledLinearProgress variant="determinate" value={100} />
          </Box>
        </Grid>
      </div>
    </Section>
  );
};

/**
 * TODO: This is very similar to the `ImageItems` component, and they could probably be consolodated but when I first tried it was creating issues so I opted to re-create
 */
const ActionItem: React.FC<SanityMainnetActionItem> = props => {
  return (
    <Box
      sx={theme => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        my: 10,
        mx: 4,
        maxWidth: theme.spacing(90),
        [theme.breakpoints.only('md')]: {
          maxWidth: theme.spacing(70),
        },
      })}
    >
      <SanityImage
        {...(props.icon?.image as any)}
        alt={props.icon?.imageAlt}
        style={{ height: '5rem' }}
        // className={styles.img}
      />
      <Title variant="h4" my={5}>
        {props.title}
      </Title>
      <Body size="lg">{props.description}</Body>
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <ContainedButton
          size="small"
          href={props.linkUrl || ''}
          disabled={!props.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mt: 5 }}
        >
          {props.linkUrl ? props.linkText : 'Coming Soon'}
        </ContainedButton>
      </Box>
    </Box>
  );
};

export default LaunchInfoSection;
