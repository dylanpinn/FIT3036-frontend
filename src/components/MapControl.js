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
    <label htmlFor={name}>{labelText}</label>
    <input value={value} onChange={onChange} type="number" />
  </div>
);

export default MapControl;
