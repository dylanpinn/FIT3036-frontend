// @flow
import * as React from 'react';
import Map from './Map';
import './App.css';
import type { Rectangle } from './types';
import type { Rectangle as RectangleComponent } from 'react-google-maps';

const GOOGLE_MAPS_API_KEY = 'AIzaSyC60FyPR7iVZWTMOjoWJdKrnRsM4MbTsUY';
type State = {
  rectangle?: Rectangle,
  totalArea: number,
  surfaceArea: number
};

class App extends React.Component<*, State> {
  rectangle: ?RectangleComponent;

  constructor() {
    super();
    this.state = {
      totalArea: 0,
      surfaceArea: 0
    };
  }

  rectangleMounted = (ref: RectangleComponent) => {
    this.rectangle = ref;
  };

  onDragEnd = (e: MouseEvent) => {
    if (this.rectangle) {
      const bounds = this.rectangle.getBounds();
      this.setState({
        rectangle: {
          north: bounds.f.f,
          south: bounds.f.b,
          east: bounds.b.f,
          west: bounds.b.b
        }
      });
      if (this.state.rectangle) {
        this.fetchArea(this.state.rectangle);
      }
    }
  };

  fetchArea = async (rectangle: Rectangle) => {
    try {
      const response = await fetch('/area', {
        body: JSON.stringify(rectangle),
        method: 'POST'
      });
      if (response.ok) {
        const data = await response.json();
        this.setState({ totalArea: data });
      }
    } catch (e) {
      console.error(e);
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
          rectangle={true}
          rectangleOnDragEnd={this.onDragEnd}
          googleMapURL={mapURL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `800px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />

        <div>
          Total Area of Rectangle:<span> {this.state.totalArea}</span>
        </div>

        <div>
          Total Surface Area of roads in rectangle:
          <span> {this.state.surfaceArea}</span>
        </div>
      </div>
    );
  }
}

export default App;
