import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TagChip from '../index';

const Component = () => (
  <BrowserRouter>
    <TagChip
      label="Some label"
      link="/blog?category=some-category"
      className="some-class"
    />
  </BrowserRouter>
);

describe('TagChip snapshot', () => {
  test('should TagChip match snapshot', () => {
    const { asFragment } = render(<Component />);

    expect(asFragment()).toMatchSnapshot();
  });
});
