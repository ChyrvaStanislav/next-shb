import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { Formik } from 'formik';
import InputFile from '../index';

const setFieldValue = jest.fn();
const setFieldTouchedFunc = jest.fn();

const Component = props => (
  <Formik>
    <InputFile
      field={{
        name: 'Name',
      }}
      form={{
        touched: {},
        errors: {},
        validateField: () => {},
      }}
      id="someId"
      formId="formId"
      label="Some label"
      name="Some name"
      setFieldValue={setFieldValue}
      setFieldTouched={setFieldTouchedFunc}
      {...props}
    />
  </Formik>
);

describe('InputFile renders', () => {
  it('should InputFile renders', () => {
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Upload files', () => {
  let file;

  beforeEach(() => {
    file = new File(['(⌐□_□)'], 'some-file.pdf', { type: 'application/pdf' });
  });

  it('should file uploaded', async () => {
    const { getByTestId } = render(<Component />);
    const input = getByTestId('input-file');
    await waitFor(() => fireEvent.change(input, {
      target: { files: [file] },
    }));

    expect(input.files[0].name).toBe('some-file.pdf');
    expect(input.files.length).toBe(1);
  });

  it('should file info displayed', async () => {
    const { getByTestId, getByText } = render(<Component />);
    const input = getByTestId('input-file');
    await waitFor(() => fireEvent.change(input, {
      target: { files: [file] },
    }));

    const fileNameMessage = getByText('some-file.pdf');
    expect(fileNameMessage).toBeInTheDocument();
  });
});

describe('Function works', () => {
  let file;

  beforeEach(() => {
    file = new File(['(⌐□_□)'], 'some-file.pdf', { type: 'application/pdf' });
  });

  it('should setFieldValue', async () => {
    const { getByTestId } = render(<Component />);
    const input = getByTestId('input-file');
    await waitFor(() => fireEvent.change(input, {
      target: { files: [file] },
    }));

    expect(setFieldValue).toBeCalled();
  });

  it('should setFieldTouchedFunc', async () => {
    const { getByTestId } = render(<Component />);
    const input = getByTestId('input-file');
    await waitFor(() => fireEvent.change(input, {
      target: { files: [file] },
    }));

    expect(setFieldTouchedFunc).toBeCalled();
  });
});
