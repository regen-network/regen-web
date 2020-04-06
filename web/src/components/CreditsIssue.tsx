import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Title from 'web-components/lib/components/title';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(5),
  },
  ownershipTitle: {
    paddingTop: theme.spacing(5),
    fontSize: '1.5rem',
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
}));

export default function CreditsIssue(): JSX.Element {
  const classes = useStyles();
  const [issueCredits, { data, loading, error }] = useMutation(ISSUE_CREDITS, { errorPolicy: 'ignore' });
  const [projectId, setProjectId] = useState('562393f2-77dd-11ea-8513-a0999b1d07df');
  const [issuerPartyId, setIssuerPartyId] = useState('f977af8a-77dc-11ea-8513-a0999b1d07df');
  const [units, setUnits] = useState(10);
  const [projectDeveloper, setProjectDeveloper] = useState(60);
  const [landSteward, setLandSteward] = useState(0);
  const [landOwner, setLandOwner] = useState(0);

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
        <TextField
          className={classes.input}
          required
          value={projectId}
          onChange={e => setProjectId(e.target.value)}
          label="Project id"
        />
        <TextField
          className={classes.input}
          required
          value={issuerPartyId}
          onChange={e => setIssuerPartyId(e.target.value)}
          label="Issuer id"
        />
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
            required
            type="number"
            value={projectDeveloper}
            onChange={e => setProjectDeveloper(parseInt(e.target.value))}
            label="Project Developer"
          />
          <TextField
            className={classes.input}
            required
            type="number"
            value={landSteward}
            onChange={e => setLandSteward(parseInt(e.target.value))}
            label="Land Steward"
          />
          <TextField
            className={classes.input}
            required
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
