import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { withTheme } from '@material-ui/core/styles';
import PolygonIcon from './polygonIcon';

const FeatureList = withTheme()(({ features, selected, polygons, toggleSelect, theme, styles, openSaveEntryModal }) => {

  // remove optimistic saved feature (if any) from features
  let unsavedFeatures = [];
  features.forEach((feature) => {
    if (!feature.saved) {
      unsavedFeatures.push(feature);
    }
  });

  return (
    <div>
      {features && unsavedFeatures.length ?
        <List>
          <Typography variant="title" style={{fontFamily: styles.title.fontFamily, fontSize: styles.title.fontSize, margin: "25px"}}>
            {"New Plots"}
          </Typography>
          {unsavedFeatures.map((feature) =>
            <FeatureListItem
              item={feature}
              theme={theme}
              selected={selected[feature.id]}
              key={feature.id}
              styles={styles}
              openSaveEntryModal={openSaveEntryModal}
              toggleSelectThis={() => {
                toggleSelect(feature.id);
              }}
            />
          )}
        </List>
        : <Typography variant="subheading" style={{fontFamily: styles.title.fontFamily, fontSize: "16px", margin: "25px 25px 0"}}>
            {"Add a new parcel by drawing a shape outlining its boundaries on the map."}
          </Typography>
      }
      <Divider style={{marginTop: "15px"}} />
      {polygons && polygons.length ?
        <List>
          <Typography variant="title" style={{fontFamily: styles.title.fontFamily, fontSize: styles.title.fontSize, margin: "25px"}}>
            {"Saved Plots"}
          </Typography>
          {polygons && polygons.map((polygon) =>
            <SavedFeatureItem key={polygon.id} item={polygon} theme={theme} selected={selected[polygon.id]} styles={styles}
              toggleSelectThis={() => {
                toggleSelect(polygon.id);
              }}
            />
          )}
        </List>
        : ""
      }
      <Divider />
    </div>
  );
});

const SavedFeatureItem = ({ item, selected, toggleSelectThis, theme, styles }) => {
  const style = selected ? {backgroundColor: theme.palette.primary.main} : {};
  return (
	  <ListItem dense button style={style} onClick={toggleSelectThis}>
      <PolygonIcon polygon={item}/>
      <ListItemText
        disableTypography
        primary={<Typography style={{fontSize: styles.fontSize}}>{item.name}</Typography>} />
    </ListItem>
  );
}

const FeatureListItem = ({ item, selected, toggleSelectThis, theme, styles, openSaveEntryModal }) => {
  const style = selected ? {backgroundColor: theme.palette.primary.main} : {};

  return (
     <ListItem dense button style={style} key={item.id} onClick={toggleSelectThis}>
        <PolygonIcon polygon={item.geometry}/>
        <ListItemText
          disableTypography
          primary={<Typography style={{fontSize: styles.fontSize}}>{"Unsaved Plot"}</Typography>} />
        <Button
          style={{
            backgroundColor: styles.primaryColor.backgroundColor,
            fontFamily: styles.fontFamily,
            color: styles.primaryColor.color}}
          onClick={(e) => {
            e.stopPropagation();
            openSaveEntryModal(item);
          }}>
          Save
        </Button>
      </ListItem>
  );
}

export default FeatureList;
