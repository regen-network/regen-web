import React from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withTheme } from '@material-ui/core/styles';
import PolygonIcon from './polygonIcon';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import * as moment from 'moment';

const GET_ENTRIES = gql`
  query FindEntries($polygon: JSON!) {
    findEntries(polygon: $polygon) {
      nodes {
        when
        type
        unit
        point
        comment
        species
        numericValue
        id
      }
      totalCount
    }
  }
`;

const DetailView = withTheme()(({ features, selected, polygons, theme, styles }) => {

  let polygon = null;
  const combinedFeatures = polygons ? polygons.concat(features) : features;

  if (combinedFeatures && combinedFeatures.length) {
    combinedFeatures.forEach((feature) => {
      if (selected[feature.id]) {
        polygon = feature.geometry || feature;
      }
    });
  }

  return (
    <div>
      { polygon ?
        <Query query={GET_ENTRIES} variables={{ polygon }}>
          {({loading, error, data}) => {

            const entries = data && data.findEntries && data.findEntries.nodes;

            return (
              <div style={{margin: "25px auto", textAlign: "center"}}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <Typography variant="title" style={{fontFamily: styles.title.fontFamily, fontSize: styles.title.fontSize, marginRight: "25px"}}>
                    {"Plot Details"}
                  </Typography>
                  <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily, fontSize: styles.title.fontSize, marginRight: "25px"}}>
                    {polygon.name}
                  </Typography>
                  <PolygonIcon polygon={polygon}/>
                </div>
                <Paper style={{margin: "0 auto 100px", width: "90%"}}>
                  {entries && entries.length ?
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Event</TableCell>
                          <TableCell>Crop</TableCell>
                          <TableCell>Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {entries.map((entry) =>
                        <EntryItem
                          entry={entry}
                          styles={styles}
                          key={entry.id} />
                      )}
                      </TableBody>
                    </Table>
                    :
                    <Typography variant="subheading" style={{fontFamily: styles.title.fontFamily, fontSize: styles.fontSize}}>
                      {"No records saved yet for this parcel."}
                    </Typography>
                  }
                </Paper>
              </div>
          )}}
        </Query>
        : null
      }
    </div>
  );
});

const EntryItem = ({ entry, styles }) => {
  return (
    <TableRow key={entry.id}>
      <TableCell component="th" scope="row">
        {entry.type}
      </TableCell>
      <TableCell>{entry.species}</TableCell>
      <TableCell>{moment(entry.when).format("YYYY-MM-DD")}</TableCell>
    </TableRow>
  );
}

export default DetailView;
