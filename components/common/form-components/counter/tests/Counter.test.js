import React from 'react';
import { render } from '@testing-library/react';
import Counter from '../index';

const Component = () => <Counter value="25" maxLength={150} className="someClass" />;

describe('Counter renders', () => {
  it('should Counter renders', () => {
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });
});
