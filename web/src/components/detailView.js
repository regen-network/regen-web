import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
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
              <div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <Typography variant="title" style={{fontFamily: styles.title.fontFamily, fontSize: styles.title.fontSize, marginRight: "25px"}}>
                    {"Plot Details"}
                  </Typography>
                  <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily, fontSize: styles.title.fontSize, marginRight: "25px"}}>
                    {polygon.name}
                  </Typography>
                  <PolygonIcon polygon={polygon}/>
                </div>
                <div style={{textAlign: "center"}}>
                  <List style={{width: "600px", margin: "0 auto"}}>
                    {entries && entries.length ? entries.map((entry) =>
                      <EntryItem
                        entry={entry}
                        styles={styles}
                        key={entry.id} />
                    ) :
                    <Typography variant="subheading" style={{fontFamily: styles.title.fontFamily, fontSize: styles.fontSize}}>
                      {"No records saved yet for this parcel."}
                    </Typography>
                  }
                  </List>
                </div>
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
	  <ListItem dense>
      <Typography style={{fontSize: styles.fontSize, fontFamily: styles.fontFamily}}>
        {`Event Type: ${entry.type}, Plant Type: ${entry.species}, Date: ${moment(entry.when).format("YYYY-MM-DD")}`}
      </Typography>
    </ListItem>
  );
}

export default DetailView;
