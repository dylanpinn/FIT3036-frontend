import React from 'react';
import { render } from 'react-testing-library';
import 'dom-testing-library/extend-expect';

import Header from '../Header';

describe('Header', () => {
  it('displays correct title', () => {
    const { getByTestId } = render(<Header title="test title" />);
    expect(getByTestId('header')).toHaveTextContent('test title');
  });
});
