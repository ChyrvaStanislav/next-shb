/* eslint-disable react/style-prop-object */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CategoryLink from '../CategoryLink';

const category = {
  meta: {
    title: 'Data Analytics Articles | EPAM SolutionsHub',
    description: 'Read useful articles about Data Analytics.'
  },
  label: 'Analytics',
  id: 'analytics',
};

const setCategory = jest.fn();
const setMeta = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

const Component = (props) => (
  <BrowserRouter>
    <CategoryLink style="some-styles" setMeta={setMeta} setCategory={setCategory} category={category} {...props} />
  </BrowserRouter>
);

describe('CategoryLink snapshots', () => {
  test('should NOT active CategoryLink match snapshot', () => {
    const { asFragment } = render(<Component />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('should active CategoryLink match snapshot', () => {
    const { asFragment } = render(<Component isActive={true} />);

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('CategoryLink functions work', () => {
  test('should setMeta triggered with meta data', () => {
    render(<Component />);
    fireEvent.click(screen.getByTestId('category-link'));

    expect(setMeta).toBeCalledWith({
      title: 'Data Analytics Articles | EPAM SolutionsHub',
      description: 'Read useful articles about Data Analytics.'
    });
  });

  test('should setCategory triggered with id', () => {
    render(<Component />);
    fireEvent.click(screen.getByTestId('category-link'));

    expect(setCategory).toBeCalledWith('analytics');
  });
});
