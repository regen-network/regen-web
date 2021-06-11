import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Title from 'web-components/lib/components/title';
import { useAllProjectsQuery } from '../generated/graphql';

const ISSUE_CREDITS = gql`
  mutation IssueCredits($input: IssueCreditsInput!) {
    issueCredits(input: $input) {
      json
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

function CreditsIssue(): JSX.Element {
  const classes = useStyles();

  const [issueCredits, { data, loading, error }] = useMutation(ISSUE_CREDITS, { errorPolicy: 'ignore' });

  const { data: projectsData, loading: projectsLoading, error: projectsError } = useAllProjectsQuery({
    errorPolicy: 'ignore',
  });

  const [projectId, setProjectId] = useState('');
  const [units, setUnits] = useState(10);
  const [projectDeveloper, setProjectDeveloper] = useState(100);
  const [landSteward, setLandSteward] = useState(0);
  const [landOwner, setLandOwner] = useState(0);

  const handleProjectChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setProjectId(event.target.value as string);
  };

  if (projectsLoading) return <div>Loading projects...</div>;
  if (projectsError) return <div>Error! ${projectsError.message}</div>;

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
              projectsData.allProjects.nodes.map((node: any) => (
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
      {data && data.issueCredits && data.issueCredits.json && (
        <div>
          <p>Credit vintage id: {data.issueCredits.json.creditVintageId}</p>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Percentage</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.issueCredits.json.accountBalances.map(
                  (row: { name: string; percentage: number; amount: number }) => (
                    <TableRow key={row.name}>
                      <TableCell scope="row">
                        {row.name
                          .replace(/([A-Z])/g, ' $1')
                          .replace(/^./, (str: string) => str.toUpperCase())}
                      </TableCell>
                      <TableCell align="right">{row.percentage}</TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
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

export { CreditsIssue };
