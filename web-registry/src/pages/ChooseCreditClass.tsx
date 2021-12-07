import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { useNavigate, useParams } from 'react-router-dom';

import { Theme } from 'web-components/lib/theme/muiTheme';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import ImageActionCard from 'web-components/lib/components/cards/ImageActionCard';
import { validate, getProjectPageBaseData } from '../lib/rdf';
import {
  useUpdateProjectByIdMutation,
  useAllCreditClassesQuery,
  useShaclGraphByUriQuery,
} from '../generated/graphql';

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
  item: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(91.75),
    },
  },
}));

const ChooseCreditClass: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { projectId } = useParams();

  const { data: creditClassesData } = useAllCreditClassesQuery();
  const { data: graphData } = useShaclGraphByUriQuery({
    variables: {
      uri: 'http://regen.network/ProjectPageShape',
    },
  });
  const [updateProject] = useUpdateProjectByIdMutation();

  async function handleSelection(
    creditClassId: string,
    creditClassUri: string,
  ): Promise<void> {
    if (graphData?.shaclGraphByUri?.graph) {
      const metadata = getProjectPageBaseData();
      metadata['http://regen.network/creditClass'] = {
        '@type': 'http://regen.network/CreditClass',
        '@id': creditClassUri,
      };
      const report = await validate(
        graphData.shaclGraphByUri.graph,
        metadata,
        'http://regen.network/ProjectPageCreditClassGroup',
      );
      if (report.conforms) {
        try {
          await updateProject({
            variables: {
              input: {
                id: projectId,
                projectPatch: {
                  creditClassId,
                  metadata,
                },
              },
            },
          });
          navigate(`/project-pages/${projectId}/basic-info`);
        } catch (e) {
          // TODO: Should we display the error banner here?
          // https://github.com/regen-network/regen-registry/issues/554
          // eslint-disable-next-line no-console
          console.log(e);
        }
      }
    }
  }

  return (
    <OnBoardingSection title="Choose a credit class">
      <Grid container justifyContent="center" className={classes.main}>
        {creditClassesData?.allCreditClasses?.nodes.map((c, i) =>
          !c?.standard && c?.creditClassVersionsById?.nodes?.[0] ? (
            <Grid key={i} item className={classes.item}>
              <ImageActionCard
                btnText="Choose credit class"
                className={classes.card}
                description={
                  c.creditClassVersionsById?.nodes[0].description || ''
                }
                imgSrc={c.creditClassVersionsById?.nodes[0].image}
                onClick={() => handleSelection(c.id, c.uri)}
                title={c.creditClassVersionsById?.nodes[0].name}
              />
            </Grid>
          ) : null,
        )}
      </Grid>
    </OnBoardingSection>
  );
};

export { ChooseCreditClass };
