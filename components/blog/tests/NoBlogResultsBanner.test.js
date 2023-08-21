import React from 'react';
import { render } from '@testing-library/react';
import NoBlogResultsBanner from '../NoBlogResultsBanner';

describe('BlogFilter snapshots', () => {
  test('should BlogFilter match snapshot', () => {
    const { asFragment } = render(<NoBlogResultsBanner searchText="123456789" />);

    expect(asFragment()).toMatchSnapshot();
  });
});

