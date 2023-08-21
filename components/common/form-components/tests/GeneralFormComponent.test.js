import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import GeneralFormComponent from '../index';

// eslint-disable-next-line react/prop-types
const renderMock = ({ setFormSent }) => (
  <>
    <h1>Some children</h1>
    <button type="button" onClick={() => setFormSent(true)}>setFormSent</button>
  </>
);


const onDisableBody = jest.fn();
const onEnableBody = jest.fn();
const disableBody = () => {
  onDisableBody();
};
const enableBody = () => {
  onEnableBody();
};

jest.mock('../modal/utils', () => ({
  disableBody, enableBody,
}));

const Component = (props) => {
  const [open, setOpen] = useState(true);

  return (
    <GeneralFormComponent
      open={open}
      setOpen={setOpen}
      title="Some Title"
      render={renderMock}
      successScreenConfig={{
        formType: 'main-request',
        title: 'SuccessScreen Title',
        subDescriptionFirst: 'subDescriptionFirst',
        subDescriptionSecond: 'subDescriptionSecond',
      }}
      successScreenRenderButton={null}
      successScreenClassGA="successScreenClassGA"
      {...props}
    />
  );
};

describe('GeneralFormComponent renders', () => {
  it('should GeneralFormComponent renders', () => {
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });
});


describe('setFormSent works', () => {
  it('should setFormSent works', () => {
    const { getByText } = render(<Component />);
    const button = getByText('setFormSent');
    fireEvent.click(button);

    expect(getByText('SuccessScreen Title')).toBeInTheDocument();
  });
});
