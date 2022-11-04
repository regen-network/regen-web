import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import FAQ, {
  FAQProps,
} from '@regen-network/web-components/lib/components/faq';
import Section from '@regen-network/web-components/lib/components/section';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { navigate, PageProps } from 'gatsby';

import SEO from '../components/seo';

interface Props extends PageProps, FAQProps {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(13.75),
      paddingBottom: theme.spacing(30),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(7.5),
      paddingBottom: theme.spacing(20),
      position: 'relative',
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(12),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(7.5),
    },
  },
}));

const FAQPage = ({ categories, location, header }: Props): JSX.Element => {
  const classes = useStyles();

  const [questionId, setQuestionId] = useState<string | undefined>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.substr(1);
      if (hash) {
        setQuestionId(hash);
      }
    }
  }, []);

  return (
    <>
      <SEO
        location={location}
        title="FAQ"
        description="Explore Regen Network’s frequently asked questions"
      />
      <div className={classes.root}>
        <Section
          title="FAQ"
          titleVariant="h1"
          classes={{ title: classes.title }}
          className={classes.section}
        >
          <FAQ
            header={header}
            questionId={questionId}
            categories={categories}
            navigate={navigate}
          />
        </Section>
      </div>
    </>
  );
};

export default FAQPage;
