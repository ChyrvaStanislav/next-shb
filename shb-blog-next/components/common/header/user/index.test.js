/* eslint-disable max-len */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { removeToken } from 'v2_common/utils/cookieHelper';
import '@testing-library/jest-dom';
import User from './index';


jest.mock('v2_common/utils/cookieHelper', () => ({
  getToken: jest.fn(() => ({
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vZXBhbS5jb20vY2xhaW1zL3BtY2lkIjoiMTIzNDU2NzgifQ.B9c5gT8xoAkQz950Kl4Ghtx0xgxjYFPibEv3GTNgfKo',
  })),
  removeToken: jest.fn(() => ({})),
}));

describe('Snapshot matching', () => {
  it('Should User match snapshot', () => {
    const { asFragment } = render(<User />);
    const elem = asFragment(<User />);
    expect(elem).toMatchSnapshot();
  });
});

describe('Avatar picture is shown', () => {
  it('Should render picture with correct src', () => {
    render(<User />);
    const img = screen.getByRole('img');

    expect(img.src).toBe('https://static.cdn.epam.com/avatar/2859d3f1e8714203e0a0cdcb09dba09b.jpg');
  });
});

describe('Functions work', () => {
  it('Open button works', () => {
    render(<User />);
    const btn = screen.getByRole('button');
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it('Logout works', () => {
    render(<User />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    const logoutBtn = screen.queryByText(/Logout/i);
    fireEvent.click(logoutBtn);
    expect(removeToken).toBeCalled();
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
  });

  // it('Blur works', () => {
  //   render(
  //     <div>
  //       <a href="/">test blur</a>
  //       <User />
  //     </div>
  //   );
  //   const btn = screen.getByRole('button');
  //   fireEvent.click(btn);
  //   fireEvent.focus(btn);
  //   expect(screen.queryByText(/Logout/i)).toBeInTheDocument();
  //   const a = screen.getByText('test blur');
  //   fireEvent.click(a);
  //   a.focus();
  //   expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
  // });
});
