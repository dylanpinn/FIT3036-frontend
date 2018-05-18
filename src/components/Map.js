// @flow
import * as React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Rectangle,
  Circle
} from 'react-google-maps';
import type { Coordinate } from '../types';
import type {
  Rectangle as RectangleComponent,
  GoogleMap as MapComponent,
  Circle as CircleComponent
} from 'react-google-maps';

type Props = {
  rectangle?: boolean,
  rectangleOnDragEnd: (e: MouseEvent) => void,
  onMapChange: (e: any) => void,
  rectangleMounted: (ref: any) => void,
  circleMounted: (ref: any) => void,
  mapMounted: (ref: any) => void,
  circlecenter: Coordinate,
  center: Coordinate
};
const GOOGLE_MAPS_API_KEY = 'AIzaSyC60FyPR7iVZWTMOjoWJdKrnRsM4MbTsUY';

class Map extends React.Component<Props> {
  rectangle: ?RectangleComponent;
  map: ?MapComponent;
  circle: ?CircleComponent;

  rectangleMounted = (ref: RectangleComponent) => {
    this.rectangle = ref;
  };

  mapMounted = (ref: MapComponent) => {
    this.map = ref;
  };

  circleMounted = (ref: MapComponent) => {
    this.circle = ref;
  };

  onDragEnd = () => {
    clearTimeout(this.timer);
    let _this = this;
    this.timer = setTimeout(function() {
      if (_this.map) {
        const bounds = _this.map.getCenter();
        const lat = bounds.lat();
        const lng = bounds.lng();
        _this.props.updateCenter({ lat, lng });
        // this.setState({ center: { lat, lng } });
        // console.log(this.state);
        // this.setState({ lat: latCir, lng: lngCir });
        // this.setState({ latCir, lngCir });
        if (_this.circle) {
          const bounds = _this.circle.getBounds();
          const rectangle = {
            south: bounds.f.f,
            north: bounds.f.b,
            east: bounds.b.f,
            west: bounds.b.b
          };
          _this.props.updateRect(rectangle);
          console.log(rectangle);
        }
      }
    }, 500);
    // if (
    //   JSON.stringify(rectangle) !== JSON.stringify(this.state.rectangle)
    // ) {
    //   console.log(rectangle);
    //   this.setState({
    //     rectangle
    //   });
    // }
    // Calculate rectangle bounds.
    // if (this.rectangle) {
    //   const bounds = this.rectangle.getBounds();
    //   this.setState({
    //     rectangle: {
    //       south: bounds.f.f,
    //       north: bounds.f.b,
    //       east: bounds.b.f,
    //       west: bounds.b.b
    //     }
    //   });
    //   if (this.state.rectangle) {
    //     this.fetchArea(this.state.rectangle);
    //   }
    // }
  };

  shouldComponentUpdate(nextProps: Props) {
    return true;
    if (
      JSON.stringify(this.props.rectangle) ===
      JSON.stringify(nextProps.rectangle)
    ) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${GOOGLE_MAPS_API_KEY}&libraries=geometry,drawing,places`;
    return (
      <div>
        <RenderMap
          googleMapURL={mapURL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `500px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          rectangleMounted={this.rectangleMounted}
          circleMounted={this.circleMounted}
          onMapChange={this.onDragEnd}
          mapMounted={this.mapMounted}
          center={this.props.center}
          rectangle={this.props.rectangle}
        />
      </div>
    );
  }
}

const RenderMap = withScriptjs(
  withGoogleMap((props: Props) => (
    <GoogleMap
      defaultZoom={14}
      center={props.center}
      onBoundsChanged={props.onMapChange}
      ref={map => props.mapMounted(map)}
      {...props}
    >
      <Rectangle
        draggable={false}
        bounds={props.rectangle}
        ref={rectangle => props.rectangleMounted(rectangle)}
      />
      <Circle
        visible={true}
        center={props.center}
        radius={1000}
        ref={circle => props.circleMounted(circle)}
      />
    </GoogleMap>
  ))
);

export default Map;
