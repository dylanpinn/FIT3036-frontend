import React from 'react';
import { render } from 'react-testing-library';

import Map from '../Map';

describe('Map', () => {
  it('renders without errors', () => {
    render(<Map rectangle={null} center={{ lat: 10, lng: 12 }} />);
  });
});
