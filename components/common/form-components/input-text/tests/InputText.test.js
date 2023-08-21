import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Formik } from 'formik';
import InputText from '../index';

const setFieldValue = jest.fn();
const onBlur = jest.fn();
const onChange = jest.fn();
const customChange = jest.fn();

const event = {
  target: {
    value: 'some value'
  }
};

const Component = props => (
  <Formik>
    <InputText
      field={{
        name: 'name',
        value: '',
        onBlur,
        onChange,
      }}
      form={{
        touched: {},
        errors: {},
        setFieldValue,
      }}
      type="text"
      placeholder="Some placeholder"
      formId="formId"
      label="Some label"
      classNameWrapper="someClass"
      customChange={customChange}
      {...props}
    />
  </Formik>
);

describe('InputText renders', () => {
  it('should InputText renders', () => {
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Events works', () => {
  it('should onBlur works', () => {
    const { getByTestId } = render(<Component />);
    const input = getByTestId('input-text');
    fireEvent.blur(input, event);

    expect(onBlur).toBeCalled();
    expect(setFieldValue).toBeCalled();
    expect(input.value).toBe('some value');
  });

  it('should onChange works', () => {
    const { getByTestId } = render(<Component />);
    const input = getByTestId('input-text');
    fireEvent.change(input, event);

    expect(onChange).toBeCalled();
    expect(customChange).toBeCalled();
  });
});


describe('Error display', () => {
  it('should Error message displays', () => {
    const { getByText } = render(<Component form={{
      touched: {
        name: true,
      },
      errors: {
        name: 'Some error'
      },
    }}
    />);

    const errorIcon = getByText('Some error');
    expect(errorIcon).toBeInTheDocument();
  });
});
