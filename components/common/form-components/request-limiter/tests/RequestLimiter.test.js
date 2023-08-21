import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import RequestLimiter from '../index';

const onFormClose = jest.fn();

const Component = props => <RequestLimiter {...props} onFormClose={onFormClose} />;

describe('RequestLimiter renders', () => {
  it('should RequestLimiter renders', () => {
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should RequestLimiter renders with type', () => {
    const { asFragment } = render(<Component type="subscribe" />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('RequestLimiter functions', () => {
  it('should onFormClose works', () => {
    const { getByText } = render(<Component />);
    const button = getByText('Continue Exploring');
    fireEvent.click(button);

    expect(onFormClose).toBeCalled();
  });
});
