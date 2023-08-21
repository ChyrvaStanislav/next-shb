import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react';
import Modal from '../index';

const onClose = jest.fn();
const onDisableBody = jest.fn();
const onEnableBody = jest.fn();
const disableBody = () => {
  onDisableBody();
};
const enableBody = () => {
  onEnableBody();
};

jest.mock('../utils', () => ({
  disableBody, enableBody,
}));


const Component = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(state => !state);
  };

  return (
    <>
      <button type="button" onClick={handleClick}>Click</button>
      <Modal open={isOpen} setOpen={setIsOpen} onClose={onClose} {...props}>
        <h1>Children</h1>
      </Modal>
    </>
  );
};

describe('Modal renders', () => {
  it('should Modal renders when closed', () => {
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });
});


describe('Modal functionality', () => {
  it('should Modal open', () => {
    const { getByText } = render(<Component />);
    const button = getByText('Click');
    fireEvent.click(button);

    expect(document.querySelector('.open')).toBeInTheDocument();
  });

  it('should Modal close', () => {
    const { getByText } = render(<Component />);
    const button = getByText('Click');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(document.querySelector('.open')).not.toBeInTheDocument();
  });

  it('should onClose on section work', () => {
    const { getByText, getByTestId } = render(<Component />);
    const button = getByText('Click');
    const section = getByTestId('section');
    fireEvent.click(button);
    expect(document.querySelector('.open')).toBeInTheDocument();

    fireEvent.mouseDown(section);
    expect(document.querySelector('.open')).not.toBeInTheDocument();
    expect(onClose).toBeCalled();
  });
});


describe('Enable & Disable body', () => {
  it('should enableBody calls', () => {
    const { getByText } = render(<Component />);
    const button = getByText('Click');
    fireEvent.click(button);

    expect(onDisableBody).toBeCalled();
  });

  it('should disableBody calls', () => {
    const { getByText } = render(<Component />);
    const button = getByText('Click');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(onEnableBody).toBeCalled();
  });
});
