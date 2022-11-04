import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Section from '@regen-network/web-components/lib/components/section';
import {
  Body,
  Label,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import {
  BlockContent,
  SanityBlockOr,
} from '@regen-network/web-components/lib/components/block-content';
import { graphql, useStaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import { SanityCaseStudyApproachSection } from '../../../generated/graphql';

interface Paragraph {
  title: string | Element;
  content: SanityBlockOr<string>;
}

interface TitleWithParagraphsProps {
  title: string | JSX.Element;
  paragraphs: Paragraph[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(21.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(12),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(17),
    },
  },
  titleWithDescription: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(4.5),
    },
  },
  image: {
    borderRadius: '10px',
  },
}));

export const TitleWithParagraphs: React.FC<TitleWithParagraphsProps> = ({
  title,
  paragraphs,
}) => {
  return (
    <>
      <Title variant="h3" sx={{ mb: [6, 7] }}>
        {title}
      </Title>
      <div>
        {paragraphs.map((p: Paragraph, i: number) => (
          <Box key={i} sx={{ mb: [7, 10] }}>
            <Label sx={{ fontSize: [16, 18], mb: [2, 4] }}>{p.title}</Label>
            <Body as="div" size="lg" sx={{ mt: [4] }}>
              {typeof p.content === 'string' ? (
                ReactHtmlParser(p.content)
              ) : (
                <BlockContent content={p.content} />
              )}
            </Body>
          </Box>
        ))}
      </div>
    </>
  );
};

const query = graphql`
  query CaseStudyApproachSection {
    sanityCaseStudiesPage {
      approachSection {
        header
        subheader
        details
        results
        next
      }
    }
  }
`;

const ApproachSection: React.FC<SanityCaseStudyApproachSection> = ({
  description,
  _rawDetails,
  _rawResults,
  _rawNext,
  _rawFigureTitle,
  figureImage,
}) => {
  const classes = useStyles();
  const data = useStaticQuery(query);
  const content = data?.sanityCaseStudiesPage?.approachSection;
  return (
    <Section
      classes={{
        root: classes.root,
        title: description ? classes.titleWithDescription : classes.title,
      }}
      title={content.header}
    >
      {description && (
        <>
          <Body
            size="xl"
            mobileSize="md"
            sx={{
              m: '0 auto',
              maxWidth: theme => theme.spacing(186.5),
              textAlign: 'center',
              pb: [11, 13.5],
            }}
          >
            {description}
          </Body>
        </>
      )}
      <Grid container spacing={10}>
        <Grid item xs={12} md={6}>
          <Img
            className={classes.image}
            fluid={figureImage?.image?.asset?.fluid as FluidObject}
          />
          <Body as="div" size="sm" sx={{ pt: [3, 4], color: 'info.dark' }}>
            <BlockContent content={_rawFigureTitle} />
          </Body>
        </Grid>
        <Grid item xs={12} md={6}>
          <TitleWithParagraphs
            title={content.subheader}
            paragraphs={[
              { title: content.details, content: _rawDetails || [] },
              { title: content.results, content: _rawResults || [] },
              { title: content.next, content: _rawNext || [] },
            ]}
          />
        </Grid>
      </Grid>
    </Section>
  );
};

export default ApproachSection;
