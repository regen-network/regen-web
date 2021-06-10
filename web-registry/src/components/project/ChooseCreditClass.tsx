import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import ImageActionCard from 'web-components/lib/components/cards/ImageActionCard';
import { validate, getProjectPageBaseData } from '../../lib/rdf';
import { useAllCreditClassesQuery, useShaclGraphByUriQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2, 0),
    },
  },
  main: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(4.75),
    },
  },
}));

const ChooseCreditClass: React.FC = () => {
  const classes = useStyles();

  const { data: creditClassesData } = useAllCreditClassesQuery();
  const { data: graphData } = useShaclGraphByUriQuery({
    variables: {
      uri: 'http://regen.network/ProjectPageShape',
    },
  });
  console.log(creditClassesData);

  async function handleSelection(uri: string): Promise<void> {
    if (graphData?.shaclGraphByUri?.graph) {
      const projectPageData = getProjectPageBaseData();
      projectPageData['regen:creditClass'] = {
        '@type': 'regen:CreditClass',
        '@id': uri,
      };
      const report = await validate(
        graphData.shaclGraphByUri.graph,
        projectPageData,
        'http://regen.network/ProjectPageCreditClassGroup',
      );
      if (report.conforms) {
        // Save data
        
      }
      console.log(report);
      for (const result of report.results) {
        // See https://www.w3.org/TR/shacl/#results-validation-result for details
        // about each property
        console.log(result.message);
        console.log(result.path);
        console.log(result.focusNode);
        console.log(result.severity);
        console.log(result.sourceConstraintComponent);
        console.log(result.sourceShape);
      }
    }
  }

  return (
    <OnBoardingSection title="Choose a credit class">
      <Grid container justify="center" className={classes.main}>
        {creditClassesData?.allCreditClasses?.nodes.map((c, i) =>
          c?.creditClassVersionsById?.nodes.length && c.creditClassVersionsById?.nodes[0] ? (
            <ImageActionCard
              key={i}
              className={classes.card}
              description={c.creditClassVersionsById?.nodes[0].description || ''}
              imgSrc={c.creditClassVersionsById?.nodes[0].image}
              onClick={() => handleSelection(c.uri)}
              title={c.creditClassVersionsById?.nodes[0].name}
            />
          ) : null,
        )}
      </Grid>
    </OnBoardingSection>
  );
};

export default ChooseCreditClass;
