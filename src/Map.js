// @flow
import * as React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Rectangle
} from 'react-google-maps';

type Coordinate = {
  lat: number,
  lng: number
};

type Props = {
  rectangle?: boolean,
  rectangleOnDragEnd: (e: MouseEvent) => void,
  rectangleMounted: (ref: any) => void,
  centre: Coordinate
};

const initialRectangle = {
  north: -37.9,
  south: -37.8,
  east: 145.1,
  west: 145.0
};

const Map = withScriptjs(
  withGoogleMap((props: Props) => (
    <GoogleMap defaultZoom={11} center={props.centre}>
      {props.rectangle && (
        <Rectangle
          draggable={true}
          bounds={initialRectangle}
          onDragEnd={props.rectangleOnDragEnd}
          ref={rectangle => props.rectangleMounted(rectangle)}
        />
      )}
    </GoogleMap>
  ))
);

export default Map;
