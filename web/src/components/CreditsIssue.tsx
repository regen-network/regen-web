import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Title from 'web-components/lib/components/title';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const ISSUE_CREDITS = gql`
  mutation IssueCredits($input: IssueCreditsInput!) {
    issueCredits(input: $input) {
      creditVintage {
        id
        issuerId
        projectId
        units
      }
    }
  }
`;

const ALL_PROJECTS = gql`
  {
    allProjects {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(5),
  },
  ownershipTitle: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(4),
    fontSize: '1.3rem',
  },
  input: {
    padding: theme.spacing(1),
  },
  form: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  button: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function CreditsIssue(): JSX.Element {
  const classes = useStyles();

  const [issueCredits, { data, loading, error }] = useMutation(ISSUE_CREDITS, { errorPolicy: 'ignore' });
  const { data: projectsData, loading: projectsLoading, error: projectsError } = useQuery(ALL_PROJECTS, {
    errorPolicy: 'ignore',
  });

  const [projectId, setProjectId] = useState('');
  const issuerPartyId: string = '6ffb7c4e-797d-11ea-8513-a0999b1d07df'; // XXX hardcoded for testing purposes
  const [units, setUnits] = useState(10);
  const [projectDeveloper, setProjectDeveloper] = useState(60);
  const [landSteward, setLandSteward] = useState(0);
  const [landOwner, setLandOwner] = useState(0);

  const handleProjectChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setProjectId(event.target.value as string);
  };

  if (projectsLoading) return <div>'Loading projects...'</div>;
  if (projectsError) return <div>`Error! ${projectsError.message}`</div>;

  return (
    <div className={classes.root}>
      <Title variant="h1">Issue Credits</Title>
      <form
        className={classes.form}
        onSubmit={async e => {
          e.preventDefault();
          try {
            await issueCredits({
              variables: {
                input: {
                  projectId,
                  issuerPartyId,
                  units,
                  initialDistribution: {
                    projectDeveloper: projectDeveloper / 100,
                    landSteward: landSteward / 100,
                    landOwner: landOwner / 100,
                  },
                },
              },
            });
          } catch (e) {}
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl className={classes.formControl}>
          <InputLabel id="project-select-label">Project</InputLabel>
          <Select
            labelId="project-select-label"
            id="project-select"
            value={projectId}
            onChange={handleProjectChange}
          >
            {projectsData &&
              projectsData.allProjects &&
              projectsData.allProjects.edges.map(({ node }: any) => (
                <MenuItem key={node.id} value={node.id}>
                  {node.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {/*<TextField
          className={classes.input}
          required
          value={issuerPartyId}
          onChange={e => setIssuerPartyId(e.target.value)}
          label="Issuer id"
        />*/}
        <TextField
          className={classes.input}
          required
          type="number"
          value={units}
          onChange={e => setUnits(parseInt(e.target.value))}
          label="Units"
        />
        <div className={classes.ownershipTitle}>Ownership breakdown (%):</div>
        <div>
          <TextField
            className={classes.input}
            type="number"
            value={projectDeveloper}
            onChange={e => setProjectDeveloper(parseInt(e.target.value))}
            label="Project Developer"
          />
          <TextField
            className={classes.input}
            type="number"
            value={landSteward}
            onChange={e => setLandSteward(parseInt(e.target.value))}
            label="Land Steward"
          />
          <TextField
            className={classes.input}
            type="number"
            value={landOwner}
            onChange={e => setLandOwner(parseInt(e.target.value))}
            label="Land Owner"
          />
        </div>
        <Button className={classes.button} variant="contained" type="submit">
          Issue
        </Button>
      </form>
      {loading && <div>Loading...</div>}
      {data && <code>{JSON.stringify(data, null, 1)}</code>}
      {error && (
        <div>
          Error:
          {error.graphQLErrors.map(({ message }, i) => (
            <span key={i}> {message}</span>
          ))}
        </div>
      )}
    </div>
  );
}
