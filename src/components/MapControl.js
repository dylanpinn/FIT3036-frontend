// @flow
import * as React from 'react';

type Props = {
  name: string,
  value: number,
  labelText: string,
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void
};

const MapControl = ({ name, value, onChange, labelText }: Props) => (
  <div>
    <label htmlFor={name} data-testid="mapcontrol-label">
      {labelText}
    </label>
    <input
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
