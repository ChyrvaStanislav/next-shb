import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Formik } from 'formik';
import Select from '../index';

const setFieldValue = jest.fn();
const onBlur = jest.fn();

const event = {
  target: {
    value: 'chocolate',
  }
};

const Component = props => (
  <Formik>
    <Select
      options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]}
      field={{
        name: 'name',
        value: '',
        onBlur,
      }}
      form={{
        touched: {},
        errors: {},
        setFieldValue,
      }}
      customPlaceholder="Some placeholder"
      formId="formId"
      label="Some Label"
      className="className"
      {...props}
    />
  </Formik>
);

describe('Select renders', () => {
  it('should Select renders', () => {
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Events works', () => {
  it('should onBlur works', () => {
    const { getByRole } = render(<Component />);
    const input = getByRole('combobox', { hidden: true });
    waitFor(() => {
      fireEvent.blur(input, event);
    }).finally(() => {
      expect(onBlur).toBeCalled();
    });
  });

  it('should onChange works', () => {
    const { getByRole } = render(<Component />);
    const input = getByRole('combobox', { hidden: true });
    expect(input).toBeVisible();
    waitFor(() => {
      fireEvent.change(input, event);
    }).finally(() => {
      expect(setFieldValue).toBeCalled();
    });
  });
});

describe('Values chose', () => {
  it('should correct value chose', () => {
    const { getByRole } = render(<Component />);
    const input = getByRole('combobox', { hidden: true });
    expect(input).toBeVisible();
    waitFor(() => {
      fireEvent.change(input, event);
    }).finally(() => {
      expect(input.value === 'chocolate').toBeTruthy();
    });
  });

  it('should wrong (not in options) value not chose', () => {
    const { getByRole } = render(<Component />);
    const input = getByRole('combobox', { hidden: true });
    expect(input).toBeVisible();
    waitFor(() => {
      fireEvent.change(input, { target: { value: 'Wrong' } });
    }).finally(() => {
      expect(input.value === '').toBeTruthy();
    });
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
