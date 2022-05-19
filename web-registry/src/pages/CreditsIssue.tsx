import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DatePicker } from '@mui/lab';
import ReactHtmlParser from 'react-html-parser';

import { Theme } from 'web-components/lib/theme/muiTheme';
import { Title } from 'web-components/lib/components/typography';
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
  datePicker: {
    display: 'inline-block',
  },
}));

// TODO Migrate to use Formik and custom input components
function CreditsIssue(): JSX.Element {
  const classes = useStyles();

  const [issueCredits, { data, loading, error }] = useMutation(ISSUE_CREDITS, {
    errorPolicy: 'ignore',
  });

  const {
    data: projectsData,
    loading: projectsLoading,
    error: projectsError,
  } = useAllProjectsQuery({
    errorPolicy: 'ignore',
  });

  const [projectId, setProjectId] = useState('');
  const [units, setUnits] = useState(10);
  const [startDate, setStartDate] = useState<Date | undefined | null>(
    undefined,
  );
  const [endDate, setEndDate] = useState<Date | undefined | null>(undefined);
  const [creditClassVersionId, setCreditClassVersionId] = useState<
    string | undefined
  >(undefined);
  const [creditClassVersionCreatedAt, setCreditClassVersionCreatedAt] =
    useState<string | undefined>(undefined);
  const [methodologyVersionId, setMethodologyVersionId] = useState<
    string | undefined
  >(undefined);
  const [methodologyVersionCreatedAt, setMethodologyVersionCreatedAt] =
    useState<string | undefined>(undefined);
  const [projectDeveloper, setProjectDeveloper] = useState(100);
  const [landSteward, setLandSteward] = useState(0);
  const [landOwner, setLandOwner] = useState(0);

  const handleProjectChange = (event: SelectChangeEvent<string>): void => {
    const projectId = event.target.value;
    setProjectId(projectId);
    const project = projectsData?.allProjects?.nodes?.find(
      node => node?.id === projectId,
    );
    setCreditClassVersionId(project?.creditClassByCreditClassId?.id);
    setMethodologyVersionId(
      project?.creditClassByCreditClassId?.methodologyByMethodologyId?.id,
    );
  };

  const handleCreditClassVersionChange = (
    event: SelectChangeEvent<string>,
  ): void => {
    setCreditClassVersionCreatedAt(event.target.value);
  };

  const handleMethodologyVersionChange = (
    event: SelectChangeEvent<string>,
  ): void => {
    setMethodologyVersionCreatedAt(event.target.value);
  };

  const creditClassVersionOptions = [];
  const methodologyVersionOptions = [];
  if (projectsData?.allProjects?.nodes && projectId) {
    const project = projectsData.allProjects.nodes.find(
      node => node?.id === projectId,
    );
    const node = project;
    if (node?.creditClassByCreditClassId) {
      const creditClassVersions =
        node.creditClassByCreditClassId.creditClassVersionsById?.nodes;
      if (creditClassVersions) {
        for (let j = 0; j < creditClassVersions.length; j++) {
          const cVersion = creditClassVersions[j];
          if (cVersion) {
            creditClassVersionOptions.push({
              label: `${cVersion.name} ${cVersion.version}`,
              value: cVersion.createdAt,
            });
          }
        }
      }
      const methodologyVersions =
        node.creditClassByCreditClassId.methodologyByMethodologyId
          ?.methodologyVersionsById?.nodes;
      if (methodologyVersions) {
        for (let k = 0; k < methodologyVersions.length; k++) {
          const mVersion = methodologyVersions[k];
          if (mVersion) {
            methodologyVersionOptions.push({
              label: `${mVersion.name} ${mVersion.version}`,
              value: mVersion.createdAt,
            });
          }
        }
      }
    }
  }

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
                  creditClassVersionId,
                  creditClassVersionCreatedAt,
                  methodologyVersionId,
                  methodologyVersionCreatedAt,
                  startDate,
                  endDate,
                  initialDistribution: {
                    // '@type': 'http://regen.network/CreditVintage', TODO this is now set on the backend, but that's creating issues in credits transfer so leaving this for reference
                    'http://regen.network/projectDeveloperDistribution':
                      projectDeveloper / 100,
                    'http://regen.network/landStewardDistribution':
                      landSteward / 100,
                    'http://regen.network/landOwnerDistribution':
                      landOwner / 100,
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
            {projectsData?.allProjects?.nodes.map(node => {
              if (node) {
                return (
                  <MenuItem key={node.id} value={node.id}>
                    {node.metadata?.['schema:name']}
                  </MenuItem>
                );
              }
              return null;
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="credit-class-version-select-label">
            Credit Class Version
          </InputLabel>
          <Select
            labelId="credit-class-version-select-label"
            id="credit-class-version-select"
            value={creditClassVersionCreatedAt}
            onChange={handleCreditClassVersionChange}
            disabled={!projectId}
          >
            {creditClassVersionOptions.map(node => (
              <MenuItem key={node.label} value={node.value}>
                {ReactHtmlParser(node.label)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="methodology-version-select-label">
            Methodology Version
          </InputLabel>
          <Select
            labelId="methodology-version-select-label"
            id="methodology-version-select"
            value={methodologyVersionCreatedAt}
            onChange={handleMethodologyVersionChange}
            disabled={!projectId}
          >
            {methodologyVersionOptions.map(node => (
              <MenuItem key={node.label} value={node.value}>
                {ReactHtmlParser(node.label)}
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
        <div className={classes.datePicker}>
          <InputLabel id="project-select-label">Start Date</InputLabel>
          <DatePicker
            renderInput={params => <TextField {...params} />}
            openTo="year"
            className={classes.input}
            toolbarPlaceholder="Click to choose a date"
            views={['year', 'month']}
            value={startDate}
            onChange={date => setStartDate(date)}
            InputProps={{ disableUnderline: true }}
          />
        </div>
        <div className={classes.datePicker}>
          <InputLabel id="project-select-label">End Date</InputLabel>
          <DatePicker
            renderInput={params => <TextField {...params} />}
            openTo="year"
            className={classes.input}
            toolbarPlaceholder="Click to choose a date"
            views={['year', 'month']}
            value={endDate}
            onChange={date => setEndDate(date)}
            InputProps={{ disableUnderline: true }}
          />
        </div>
        <TextField
          className={classes.input}
          required
          type="number"
          value={units}
          onChange={e => setUnits(parseFloat(e.target.value))}
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
                  (row: {
                    name: string;
                    percentage: number;
                    amount: number;
                  }) => (
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
