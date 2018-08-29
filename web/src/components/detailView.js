import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import PolygonIcon from './polygonIcon';

const DetailView = withTheme()(({ features, selected, polygons, theme, styles }) => {

  let selectedPolygon = null;
  const combinedFeatures = polygons ? polygons.concat(features) : features;

  if (combinedFeatures && combinedFeatures.length) {
    combinedFeatures.forEach((feature) => {
      if (selected[feature.id]) {
        selectedPolygon = feature;
      }
    });
  }

  const fakeEntryItems = [
    {type: 'Planting', polygon: selectedPolygon, species: 'Wheat', happenedAt: "2018-08-01" },
    {type: 'Harvesting', polygon: selectedPolygon, species: 'Wheat', happenedAt: "2018-08-01" },
    {type: 'Cover crop', polygon: selectedPolygon, species: 'Rye', happenedAt: "2018-08-01" },
    {type: 'Tillage', polygon: selectedPolygon, happenedAt: "2018-08-01" }
  ];

  return (
    <div>
      { selectedPolygon ?
        <div>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily, fontSize: styles.title.fontSize, marginRight: "25px"}}>
              {selectedPolygon.name}
            </Typography>
            <PolygonIcon polygon={selectedPolygon}/>
          </div>
          <List>
            {fakeEntryItems.map((entry) =>
              <EntryItem
                entry={entry}
                styles={styles}
                key={entry.polygon.id} />
            )}
          </List>
        </div>
        : null
      }
    </div>
  );
});

const EntryItem = ({ entry, styles }) => {
  return (
	  <ListItem dense>
      <ListItemText
        disableTypography
        primary={<Typography style={{fontSize: styles.fontSize}}>{entry.type} {entry.species} {entry.date}</Typography>} />
    </ListItem>
  );
}

export default DetailView;
