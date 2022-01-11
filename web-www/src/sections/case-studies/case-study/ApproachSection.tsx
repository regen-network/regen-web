import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { graphql, useStaticQuery } from 'gatsby';
import ReactHtmlParser from 'react-html-parser';
import Img, { FluidObject } from 'gatsby-image';

import Title from 'web-components/lib/components/title';
import Section from 'web-components/lib/components/section';
import Description from 'web-components/lib/components/description';
import { SanityCaseStudyApproachSection } from '../../../generated/graphql';
import { BlockContent, SanityBlockOr } from 'web-components/src/components/block-content';

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
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(21.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(12),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(17),
    },
  },
  titleWithDescription: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(4.5),
    },
  },
  cardTitle: {
    fontFamily: theme.typography.h1.fontFamily,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 800,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
      lineHeight: theme.spacing(5),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
      lineHeight: theme.spacing(5.75),
    },
  },
  cardDescription: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    '& ul, ol': {
      listStyle: 'none',
      marginLeft: theme.spacing(3),
    },
    '& li::before': {
      content: "'\\2022'",
      color: theme.palette.secondary.main,
      display: 'inline-block',
      width: '1em',
      marginLeft: '-1em',
      fontSize: theme.spacing(3),
    },
  },
  figureTitle: {
    lineHeight: '150%',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
      paddingTop: theme.spacing(3),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
      paddingTop: theme.spacing(4),
    },
  },
  description: {
    lineHeight: '150%',
    textAlign: 'center',
    maxWidth: theme.spacing(186.5),
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4.5),
      paddingBottom: theme.spacing(11),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(5.5),
      paddingBottom: theme.spacing(13.5),
    },
  },
  subHeader: {
    lineHeight: '140%',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(7),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(8),
    },
    '& p': {
      margin: 0,
    },
  },
  image: {
    borderRadius: '10px',
  },
  paragraph: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(3.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4.5),
    },
  },
}));

export const TitleWithParagraphs: React.FC<TitleWithParagraphsProps> = ({ title, paragraphs }) => {
  const styles = useStyles();
  return (
    <>
      <Title className={styles.subHeader} variant="h3">
        {title}
      </Title>
      <div>
        {paragraphs.map((p: Paragraph, i: number) => (
          <div key={i} className={i > 0 ? styles.paragraph : undefined}>
            <div className={styles.cardTitle}>{p.title}</div>
            <Description className={styles.cardDescription}>
              {typeof p.content === 'string' ? (
                ReactHtmlParser(p.content)
              ) : (
                <BlockContent content={p.content} />
              )}
            </Description>
          </div>
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
      {description && <Description className={classes.description}>{description}</Description>}
      <Grid container spacing={10}>
        <Grid item xs={12} md={6}>
          <Img className={classes.image} fluid={figureImage?.image?.asset?.fluid as FluidObject} />
          <Description className={classes.figureTitle}>
            <BlockContent content={_rawFigureTitle} />
          </Description>
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
