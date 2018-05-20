// @flow
import * as React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Rectangle,
  Circle
} from 'react-google-maps';
import type { Coordinate, Rectangle as RectangleType } from '../types';
import type {
  Rectangle as RectangleComponent,
  GoogleMap as MapComponent,
  Circle as CircleComponent
} from 'react-google-maps';

type Props = {
  rectangle: ?RectangleType,
  center: Coordinate,
  updateCenter: (c: Coordinate) => void,
  updateRect: (r: RectangleType) => void
};
const GOOGLE_MAPS_API_KEY = 'AIzaSyC60FyPR7iVZWTMOjoWJdKrnRsM4MbTsUY';

class Map extends React.Component<Props> {
  rectangle: ?RectangleComponent;
  map: ?MapComponent;
  circle: ?CircleComponent;
  timer: ?TimeoutID;

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
    if (this.timer) {
      clearTimeout(this.timer);
    }
    let _this = this;
    this.timer = setTimeout(function() {
      if (_this.map) {
        const bounds = _this.map.getCenter();
        const lat = bounds.lat();
        const lng = bounds.lng();
        _this.props.updateCenter({ lat, lng });
        if (_this.circle) {
          const bounds = _this.circle.getBounds();
          const rectangle = {
            north: bounds.f.f,
            south: bounds.f.b,
            east: bounds.b.f,
            west: bounds.b.b
          };
          _this.props.updateRect(rectangle);
        }
      }
    }, 500);
  };

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

type RenderMapProps = {
  center: Coordinate,
  rectangle: ?RectangleType,
  onMapChange: () => void,
  mapMounted: (r: MapComponent) => void,
  rectangleMounted: (r: RectangleComponent) => void,
  circleMounted: (r: CircleComponent) => void
};

const RenderMap = withScriptjs(
  withGoogleMap((props: RenderMapProps) => (
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
        visible={false}
        center={props.center}
        radius={1000}
        ref={circle => props.circleMounted(circle)}
      />
    </GoogleMap>
  ))
);

export default Map;
