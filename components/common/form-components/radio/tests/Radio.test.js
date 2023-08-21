import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Formik } from 'formik';
import RadioGroup from '../RadioGroup';

const Component = props => (
  <Formik>
    <RadioGroup
      data={['Yes', 'No']}
      name="commercialUsage"
      label="I plan to use this solution for my business, rather than academic or personal needs"
      selectedNoLabel="Please note: if you leave this solution for commercial use, you will receive support from EPAM."
      toShowNoLabel={true}
      icon={true}
      formId="formId"
      required={true}
      selectedValue="Yes"
      {...props}
    />
  </Formik>
);

describe('RadioGroup renders', () => {
  it('should RadioGroup renders', () => {
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should RadioGroup with selected value "No" renders', () => {
    const { asFragment } = render(<Component selectedValue="No" />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Default selected', () => {
  it('should default selected works', () => {
    render(<Component />);
    const input = document.querySelector('#formId-Yes');
    expect(input.checked).toBeTruthy();
  });

  it('should default non-selected works', () => {
    render(<Component />);
    const input = document.querySelector('#formId-No');
    expect(input.checked).not.toBeTruthy();
  });
});

describe('Checked on "click"', () => {
  it('should checked/unchecked on "click"', () => {
    render(<Component />);
    const input = document.querySelector('#formId-Yes');
    waitFor(() => fireEvent.click(input)).finally(() => {
      expect(input.checked).not.toBeTruthy();
      waitFor(() => fireEvent.click(input)).finally(() => {
        expect(input.checked).toBeTruthy();
      });
    });
  });
});
