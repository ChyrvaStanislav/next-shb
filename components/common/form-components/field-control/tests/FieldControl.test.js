import React from 'react';
import { render } from '@testing-library/react';
import FieldControl from '../index';

const Component = props => (
  <FieldControl
    formId="Form Id"
    field={{
      name: 'someName'
    }}
    form={{
      touched: {
        someName: false,
      },
      errors: {
        someName: '',
      }
    }}
    className="someClass"
    label="Some label"
    {...props}
  >
    <input name="children" value="children" onChange={() => {}} />
  </FieldControl>
);

describe('FieldControl renders', () => {
  it('should FieldControl renders', () => {
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });
});


describe('Error message', () => {
  it('should Error message shows', () => {
    const { getByText } = render(<Component form={{
      touched: {
        someName: true,
      },
      errors: {
        someName: 'ERROR',
      }
    }}
    />);

    const errorMessage = getByText('ERROR');
    expect(errorMessage).toBeInTheDocument();
  });
});
