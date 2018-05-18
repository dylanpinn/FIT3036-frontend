import React from 'react';
import { render } from 'react-testing-library';
import 'dom-testing-library/extend-expect';

import MapControl from '../MapControl';

describe('MapControl', () => {
  const labelText = 'The Label Text';
  const value = 10;
  const name = 'testInput';
  const onChange = e => {
    return null;
  };

  it('displays correct labelText', () => {
    const { getByTestId } = render(
      <MapControl
        labelText={labelText}
        value={value}
        name={name}
        onChange={onChange}
      />
    );
    expect(getByTestId('mapcontrol-label')).toHaveTextContent(labelText);
  });

  it('displays correct value', () => {
    const { getByTestId } = render(
      <MapControl
        labelText={labelText}
        value={value}
        name={name}
        onChange={onChange}
      />
    );
    expect(getByTestId('mapcontrol-input')).toHaveAttribute(
      'value',
      String(value)
    );
  });

  it('displays correct name', () => {
    const { getByTestId } = render(
      <MapControl
        labelText={labelText}
        value={value}
        name={name}
        onChange={onChange}
      />
    );
    expect(getByTestId('mapcontrol-input')).toHaveAttribute('name', name);
  });
});
