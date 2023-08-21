import React from 'react';
import { Formik } from 'formik';
import { render } from '@testing-library/react';
import Checkbox from '../index';

const onChangeFunc = jest.fn();
const setFieldTouchedFunc = jest.fn();
const fieldOnBlurFunc = jest.fn();

const Component = props => (
  <Formik>
    <Checkbox
      field={{
        value: false,
        onChange: jest.fn(),
        onBlur: fieldOnBlurFunc,
        name: 'Name',
      }}
      form={{
        touched: {},
        errors: {},
        setFieldTouched: setFieldTouchedFunc,
      }}
      id="someId"
      formId="formId"
      label="Some label"
      name="Some name"
      {...props}
    />
  </Formik>
);


describe('Checkbox renders', () => {
  it('should Checkbox renders', () => {
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Functions works', () => {
  it('should onChange work', () => {
    const { getByTestId } = render(<Component onChange={onChangeFunc} />);
    const checkboxElem = getByTestId('checkbox');
    checkboxElem.click();
    expect(onChangeFunc).toBeCalled();
    expect(setFieldTouchedFunc).toBeCalled();
  });
});

describe('Checkbox disable', () => {
  it('should Checkbox disable when disabled = true', () => {
    const { getByTestId } = render(<Component disabled={true} />);
    const checkboxElem = getByTestId('checkbox');
    expect(checkboxElem).toBeDisabled();
  });
});
