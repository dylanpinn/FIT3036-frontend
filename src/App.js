// @flow
import * as React from 'react';
import Map from './Map';
import './App.css';
import type { Rectangle } from './types';
import type { Rectangle as RectangleComponent } from 'react-google-maps';

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
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Map
          rectangleMounted={this.rectangleMounted}
          rectangle={this.state.rectangle}
          rectangleOnDragEnd={this.onDragEnd}
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default App;
