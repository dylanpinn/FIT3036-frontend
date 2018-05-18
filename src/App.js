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

const roundNumber = numberToRound => {
  return Math.round(numberToRound * 100) / 100;
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
          south: bounds.f.f,
          north: bounds.f.b,
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

  calculateRoadArea = async () => {
    try {
      const response = await fetch('/roadArea', {
        body: JSON.stringify(this.state.rectangle),
        method: 'POST'
      });
      if (response.ok) {
        const data = await response.json();
        this.setState({ surfaceArea: data });
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
        <div className="main">
          <div className="map-wrapper">
            <Map
              rectangleMounted={this.rectangleMounted}
              rectangle={true}
              rectangleOnDragEnd={this.onDragEnd}
              googleMapURL={mapURL}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `800px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>

          <div className="information-wrapper">
            <h2>Instructions</h2>
            <p className="instructions">
              {/* TODO: Add instructions. */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              ornare mi quam, non efficitur urna venenatis malesuada. Donec quis
              ipsum pharetra tellus maximus dictum feugiat quis orci.
              Pellentesque efficitur sapien magna, quis placerat velit faucibus
              cursus. Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia Curae; Donec sagittis enim.
            </p>
            <div style={{ padding: '10px 0' }}>
              Total Area of Rectangle:<span>
                {' '}
                {roundNumber(this.state.totalArea)} m<sup>2</sup>
              </span>
            </div>

            <div style={{ padding: '10px 0' }}>
              <button onClick={this.calculateRoadArea}>Calculate Area</button>
            </div>

            <div style={{ padding: '10px 0' }}>
              Total Surface Area of roads in rectangle:
              <span>
                {' '}
                {roundNumber(this.state.surfaceArea)} m<sup>2</sup>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
