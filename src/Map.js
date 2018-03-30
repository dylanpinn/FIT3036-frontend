// @flow
import * as React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Rectangle
} from 'react-google-maps';
import type { Rectangle as RectangleType } from './types';

type Props = {
  isMarkerShown?: boolean,
  rectangle?: RectangleType,
  rectangleOnDragEnd: (e: MouseEvent) => void,
  rectangleMounted: (ref: any) => void
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
          bounds={props.rectangle}
          onDragEnd={props.rectangleOnDragEnd}
          ref={rectangle => props.rectangleMounted(rectangle)}
        />
      )}
    </GoogleMap>
  ))
);

export default Map;
