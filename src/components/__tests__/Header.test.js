import React from 'react';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Header from '../Header';

describe('Header', () => {
  it('displays correct title', () => {
    const { getByTestId } = render(<Header title="test title" />);
    expect(getByTestId('header')).toHaveTextContent('test title');
  });
});
