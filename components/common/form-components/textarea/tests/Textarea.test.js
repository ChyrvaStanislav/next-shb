import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Formik } from 'formik';
import Textarea from '../index';

const setFieldValue = jest.fn();
const onBlur = jest.fn();
const onChange = jest.fn();

const event = {
  target: {
    value: 'some value'
  }
};

const Component = props => (
  <Formik>
    <Textarea
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
      classNameWrapper="someClass"
      classNameTextarea="anotherClass"
      label="Some Label"
      required={true}
      {...props}
    />
  </Formik>
);

describe('Textarea renders', () => {
  it('should Textarea renders', () => {
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should Textarea renders with counter', () => {
    const { asFragment } = render(<Component isCounter={true} maxLength={125} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Events works', () => {
  it('should onBlur works', () => {
    const { getByTestId } = render(<Component />);
    const textarea = getByTestId('textarea');
    fireEvent.blur(textarea, event);

    expect(onBlur).toBeCalled();
    expect(setFieldValue).toBeCalled();
    expect(textarea.value).toBe('some value');
  });

  it('should onChange works', () => {
    const { getByTestId } = render(<Component />);
    const textarea = getByTestId('textarea');
    fireEvent.change(textarea, event);

    expect(onChange).toBeCalled();
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
