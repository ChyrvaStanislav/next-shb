import React from 'react';
import { render } from '@testing-library/react';
import HintIcon from '../index';

const Component = () => <HintIcon />;

describe('HintIcon renders', () => {
  it('should HintIcon renders', () => {
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });
});
