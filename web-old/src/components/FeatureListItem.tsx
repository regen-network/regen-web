import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PolygonIcon from 'components/polygonIcon';
import useTheme from "@material-ui/core/styles/useTheme";
import {Feature, Polygon} from "geojson";

export interface Item {
  geometry: Polygon,
  id: string,
}

export interface FeatureListItemProps {
  item: Item,
  selected: boolean,
  toggleSelectThis: () => void,
  openSaveEntryModal: (item: Item) => void,
}

export default function FeatureListItem({item, selected, toggleSelectThis, openSaveEntryModal}: FeatureListItemProps) {
  const theme = useTheme();
  const style = selected ? {backgroundColor: theme.palette.primary.main} : {};

  return (
    <ListItem dense button style={style} key={item.id} onClick={toggleSelectThis}>
      <PolygonIcon polygon={item.geometry}/>
      <ListItemText
        disableTypography
        primary={<Typography style={{fontSize: "16px"}}>{"Unsaved Plot"}</Typography>}/>
      <Button
        href="#"
        style={{
          backgroundColor: theme.palette.common.black,
          fontFamily: theme.typography.fontFamily,
          color: theme.palette.common.white
        }}
        onClick={(e) => {
          e.stopPropagation();
          openSaveEntryModal(item);
        }}>
        Save
      </Button>
    </ListItem>
  );
}
