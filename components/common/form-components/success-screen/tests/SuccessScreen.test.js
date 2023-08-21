import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SuccessScreen from '../index';

const onFormClose = jest.fn();
const successScreenRenderButton = jest.fn();

const Component = props => (
  <SuccessScreen
    title="Some Title"
    subDescription1="Some Description 1"
    subDescription2="Some Description 2"
    formType="main-request"
    onFormClose={onFormClose}
    successScreenClassGA="successScreenClassGA"
    goToSolutions={true}
    {...props}
  />
);

describe('SuccessScreen renders', () => {
  it('should SuccessScreen renders', () => {
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should SuccessScreen renders without button', () => {
    const { asFragment } = render(<Component offButtonGroup={true} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should setTimeout window.open works', () => {
    jest.useFakeTimers();
    const { asFragment } = render(<Component solutionInfo={{ downloadLink: 'some-link.url' }} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('SuccessScreen functions', () => {
  it('should onFormClose works', () => {
    const { getByText } = render(<Component />);
    const button = getByText('Continue Exploring');
    fireEvent.click(button);

    expect(onFormClose).toBeCalled();
  });

  it('should successScreenRenderButton works', () => {
    render(<Component offButtonGroup={false} successScreenRenderButton={successScreenRenderButton} />);

    expect(successScreenRenderButton).toBeCalled();
  });
});
