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
  lng: number,
  buttonDisabled: boolean
};

const roundNumber = numberToRound => {
  return Math.round(numberToRound * 100) / 100;
};

// This sets the API endpoint for development and production.
const apiEndpoint = () => {
  let apiEndpoint = '/';
  if (process.env.NODE_ENV === 'production') {
    apiEndpoint =
      'https://lufe1ov341.execute-api.ap-southeast-2.amazonaws.com/dev/';
  }
  return apiEndpoint;
};

class App extends React.Component<*, State> {
  constructor() {
    super();
    this.state = {
      lat: -37.911716,
      lng: 145.127197,
      totalArea: 0,
      surfaceArea: 0,
      buttonDisabled: false
    };
  }

  // Call the area API and set the result.
  fetchArea = async (rectangle: Rectangle) => {
    try {
      const response = await fetch(`${apiEndpoint()}area`, {
        body: JSON.stringify(rectangle),
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        this.setState({ totalArea: data });
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Call the road area API and save the result.
  calculateRoadArea = async () => {
    try {
      this.setState({ buttonDisabled: true });
      const response = await fetch(`${apiEndpoint()}roadArea`, {
        body: JSON.stringify(this.state.rectangle),
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        this.setState({ surfaceArea: data, buttonDisabled: false });
      }
    } catch (e) {
      this.setState({ buttonDisabled: false });
      console.error(e);
    }
  };

  // Handle Latitude and Longitude input changes.
  handleControlChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const value = Number(target.value);
    const name = target.name;

    this.setState({ [name]: value });
  };

  // Update the centre of the map.
  updateCenter = (center: Coordinate) => {
    this.setState({ lat: center.lat, lng: center.lng });
  };

  // Update the overlay rectangle.
  updateRect = (rectangle: Rectangle) => {
    this.fetchArea(rectangle);
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
            <Typography variant="body1">
              Either drag the map around until the square is over the required
              area, or use the Latitude &amp; Longitude inputs to specify the
              area.
            </Typography>
            <div className="controls">
              <MapControl
                name="lat"
                value={this.state.lat}
                onChange={this.handleControlChange}
                labelText="Latitude"
              />
              <MapControl
                name="lng"
                value={this.state.lng}
                onChange={this.handleControlChange}
                labelText="Longitude"
              />
            </div>
            <Typography variant="body1" gutterBottom>
              Total Area of Rectangle:<span>
                {' '}
                {roundNumber(this.state.totalArea)} km<sup>2</sup>
              </span>
            </Typography>
            <div style={{ padding: '10px 0' }}>
              <Button
                onClick={this.calculateRoadArea}
                color="primary"
                variant="raised"
                disabled={this.state.buttonDisabled}
              >
                Calculate Area
              </Button>
            </div>
            <Typography variant="body1" gutterBottom>
              Total Surface Area of roads in rectangle:
              <span>
                {' '}
                {roundNumber(this.state.surfaceArea)} km<sup>2</sup>
              </span>
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
