// @flow
import * as React from 'react';
import Map from './Map';
import './App.css';
import type { Rectangle } from './types';
import type { Rectangle as RectangleComponent } from 'react-google-maps';

const GOOGLE_MAPS_API_KEY = 'AIzaSyC60FyPR7iVZWTMOjoWJdKrnRsM4MbTsUY';
type State = {
  rectangle: Rectangle
};

class App extends React.Component<*, State> {
  rectangle: ?RectangleComponent;

  constructor() {
    super();
    this.state = {
      rectangle: {
        north: -37.9,
        south: -37.8,
        east: 145.1,
        west: 145.0
      }
    };
  }

  rectangleMounted = (ref: RectangleComponent) => {
    this.rectangle = ref;
  };

  onDragEnd = (e: MouseEvent) => {
    if (this.rectangle) {
      console.log(this.rectangle.getBounds());
    }
  };

  render() {
    const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${GOOGLE_MAPS_API_KEY}&libraries=geometry,drawing,places`;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">FIT3036 - Computer Science Project</h1>
        </header>
        <Map
          rectangleMounted={this.rectangleMounted}
          rectangle={this.state.rectangle}
          rectangleOnDragEnd={this.onDragEnd}
          googleMapURL={mapURL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `800px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />

        <div>Total Area of Rectangle:</div>

        <div>Total Surface Area of roads in rectangle:</div>
      </div>
    );
  }
}

export default App;
