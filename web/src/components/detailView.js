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
    {type: 'Planting', polygon: selectedPolygon, species: 'Wheat', date: "2018-08-01" },
    {type: 'Harvesting', polygon: selectedPolygon, species: 'Wheat', date: "2018-08-01" },
    {type: 'Cover crop', polygon: selectedPolygon, species: 'Rye', date: "2018-08-01" },
    {type: 'Tillage', polygon: selectedPolygon, date: "2018-08-01" }
  ];

  return (
    <div>
      { selectedPolygon ?
        <div>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Typography variant="title" style={{fontFamily: styles.title.fontFamily, fontSize: styles.title.fontSize, marginRight: "25px"}}>
              {"Plot Details"}
            </Typography>
            <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily, fontSize: styles.title.fontSize, marginRight: "16px"}}>
              {selectedPolygon.name}
            </Typography>
            <PolygonIcon polygon={selectedPolygon}/>
          </div>
          <div style={{textAlign: "center"}}>
            <List style={{width: "300px", margin: "0 auto"}}>
              {fakeEntryItems.map((entry) =>
                <EntryItem
                  entry={entry}
                  styles={styles}
                  key={entry.polygon.id} />
              )}
            </List>
          </div>
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
