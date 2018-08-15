import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import * as turf from '@turf/turf';

class PolygonIcon extends React.Component {

  render() {
    const { theme, polygon } = this.props;
    let coordinates = "";
    let turfCollection = [];

    polygon.coordinates[0].forEach((point) => {
      coordinates += `${point[0]},${point[1]} `;
      let turfPoint = turf.point(point);
      turfCollection.push(turfPoint);
    });

    var line = turf.lineString(polygon.coordinates[0]);
    var bbox = turf.bbox(line);
    var boxWidth = bbox[2] - bbox[0];
    var boxHeight = bbox[3] - bbox[1];
    var boxSize = boxWidth > boxHeight ? boxWidth : boxHeight;
    var boxCenter = boxSize / 2;

    const viewbox = `${bbox[0]} ${bbox[3]} ${boxWidth} ${boxHeight}`;
    const translate = `translate(${boxCenter} ${boxCenter})`;

    const styles = {
      color: theme.palette.accent.yellow
    };

    return (
      <div>
        <svg viewBox={viewbox} width="50" height="50" overflow="visible" xmlns="http://www.w3.org/2000/svg">
          <polygon points={coordinates} transform={""}
                fill={styles.color} stroke="none" />
        </svg>
      </div>
    );
  }
}

export default withTheme()(PolygonIcon);
