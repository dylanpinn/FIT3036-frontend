// @flow
import * as React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Rectangle
} from 'react-google-maps';

type Props = {
  isMarkerShown?: boolean,
  rectangle?: boolean,
  rectangleOnDragEnd: (e: MouseEvent) => void,
  rectangleMounted: (ref: any) => void
};

const initialRectangle = {
  north: -37.9,
  south: -37.8,
  east: 145.1,
  west: 145.0
};

const defaultCenter = {
  lat: -37.911716,
  lng: 145.127197
};

const Map = withScriptjs(
  withGoogleMap((props: Props) => (
    <GoogleMap defaultZoom={11} defaultCenter={defaultCenter}>
      {props.isMarkerShown && <Marker position={defaultCenter} />}
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
