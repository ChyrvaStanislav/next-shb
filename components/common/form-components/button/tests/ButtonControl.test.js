import React from 'react';
import { Formik, Form } from 'formik';
import { render } from '@testing-library/react';
import ButtonControll from '../ButtonControl';

const Component = props => (
  <Formik
    initialValues={{
      commercialUsage: false,
    }}
    isInitialValid={true}
  >
    <ButtonControll {...props} />
  </Formik>
);

const onClickCancel = jest.fn();

describe('Link renders', () => {
  it('should ButtonControl renders', () => {
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should Preloader renders', () => {
    const { asFragment } = render(<Component loading={true} />);
    expect(asFragment).toMatchSnapshot();
  });
});

describe('Disable and hide submit button', () => {
  it('should submit button hidden when isSubmitHidden', () => {
    const { queryByText } = render(<Component isSubmitHidden={true} />);
    const buttonControlElem = queryByText('Send');
    expect(buttonControlElem).not.toBeInTheDocument();
  });

  it('should submit button disabled when toShowRadioButtons & commercialUsage', () => {
    const ComponentWithForm = () => (
      <Formik initialValues={{
        commercialUsage: false,
      }}
      >
        <Form>
          <ButtonControll toShowRadioButtons={true} />
        </Form>
      </Formik>
    );
    const { container } = render(<ComponentWithForm />);
    const submitButtonByTagName = container.querySelector('.disabled');
    expect(submitButtonByTagName).toBeInTheDocument();
  });

  it('should submit button disabled when loading', () => {
    const { container } = render(<Component loading={true} />);
    const submitButtonByTagName = container.querySelector('.disabled');
    expect(submitButtonByTagName).toBeInTheDocument();
  });

  it('should submit button disabled when form isValid = false', () => {
    const ComponentWithForm = () => (
      <Formik
        isInitialValid={false}
      >
        <Form>
          <ButtonControll />
        </Form>
      </Formik>
    );
    const { container } = render(<ComponentWithForm />);
    const submitButtonByTagName = container.querySelector('.disabled');
    expect(submitButtonByTagName).toBeInTheDocument();
  });
});


describe('Cancel onClick', () => {
  it('should cancel onClick works', () => {
    const { queryByText } = render(<Component onClickCancel={onClickCancel} />);
    const cancelButton = queryByText('Cancel');
    cancelButton.click();
    expect(onClickCancel).toBeCalled();
  });
});
