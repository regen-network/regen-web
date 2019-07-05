// @ts-ignore
import React, {Component} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import ReactMapGL from 'react-map-gl';

class Map extends Component {

  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  };

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport} onViewportChange={(viewport) => this.setState({viewport})}/>
    );
  }
}

storiesOf('ReactMapGL', module)
  .add('default', () => <Map />);
