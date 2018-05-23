// @flow
import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Map from './components/Map';
import MapControl from './components/MapControl';
import Header from './components/Header';
import './styles/App.css';
import type { Rectangle, Coordinate } from './types';

type State = {
  rectangle?: Rectangle,
  totalArea: number,
  surfaceArea: number,
  lat: number,
  lng: number
};

const roundNumber = numberToRound => {
  return Math.round(numberToRound * 100) / 100;
};

class App extends React.Component<*, State> {
  constructor() {
    super();
    this.state = {
      lat: -37.911716,
      lng: 145.127197,
      totalArea: 0,
      surfaceArea: 0
    };
  }

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

  handleControlChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const value = Number(target.value);
    const name = target.name;

    this.setState({ [name]: value });
  };

  updateCenter = (center: Coordinate) => {
    this.setState({ lat: center.lat, lng: center.lng });
  };
  updateRect = (rectangle: Rectangle) => {
    this.setState({ rectangle });
  };

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Header title="FIT3036 - Computer Science Project" />
        <div className="main">
          <div className="map-wrapper">
            <Map
              center={{ lat: this.state.lat, lng: this.state.lng }}
              updateCenter={this.updateCenter}
              updateRect={this.updateRect}
              rectangle={this.state.rectangle}
            />
          </div>

          <div className="information-wrapper">
            <Typography variant="headline" gutterBottom>
              Instructions
            </Typography>
            {/* TODO: Add instructions. */}
            <Typography variant="body1" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              ornare mi quam, non efficitur urna venenatis malesuada. Donec quis
              ipsum pharetra tellus maximus dictum feugiat quis orci.
            </Typography>
            <div className="controls">
              <MapControl
                name="lat"
                value={this.state.lat}
                onChange={this.handleControlChange}
                labelText="Lattitude"
              />
              <MapControl
                name="lng"
                value={this.state.lng}
                onChange={this.handleControlChange}
                labelText="Longtitude"
              />
            </div>
            <Typography variant="body1" gutterBottom>
              Total Area of Rectangle:<span>
                {' '}
                {roundNumber(this.state.totalArea * 1000)} m<sup>2</sup>
              </span>
            </Typography>
            <div style={{ padding: '10px 0' }}>
              <Button onClick={this.calculateRoadArea} color="primary">
                Calculate Area
              </Button>
            </div>
            <Typography variant="body1" gutterBottom>
              Total Surface Area of roads in rectangle:
              <span>
                {' '}
                {roundNumber(this.state.surfaceArea * 1000)} m<sup>2</sup>
              </span>
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
