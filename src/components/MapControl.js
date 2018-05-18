// @flow
import * as React from 'react';
import TextField from '@material-ui/core/TextField';

type Props = {
  name: string,
  value: number,
  labelText: string,
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void
};

const MapControl = ({ name, value, onChange, labelText }: Props) => (
  <div>
    <TextField
      label={labelText}
      value={value}
      onChange={onChange}
      type="number"
      data-testid="mapcontrol-input"
      name={name}
      id={name}
    />
  </div>
);

export default MapControl;
