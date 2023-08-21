// import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { TextEncoder } from 'util';
// import '@testing-library/jest-dom';
// import { render, screen } from '@testing-library/react';
// import testHOC from 'v2_main/components/common/forms/testUtils';
// import SolutionFormHandler, { SolutionFormContext } from '../handler';
// import solutionMock from './solutionMock';
//
// global.TextEncoder = TextEncoder;
//
// const open = true;
// const setOpen = jest.fn();
//
// const onDisableBody = jest.fn();
// const onEnableBody = jest.fn();
//
// const disableBody = () => {
//   onDisableBody();
// };
// const enableBody = () => {
//   onEnableBody();
// };
//
// jest.mock('v2_main/components/common/form-components/modal/utils.js', () => ({
//   disableBody, enableBody,
// }));
//
// jest.mock('v2_main/components/common/form-components/recaptcha', () => () => null);
// jest.mock('v2_main/components/common/form-components/checkbox', () => () => null);
// jest.mock('v2_main/components/common/cards/SolutionLogo', () => () => null);
//
// afterEach(() => {
//   setOpen.mockClear();
// });
//
// test('Default values', () => {
//   const Wrapper = testHOC(SolutionFormContext);
//   render(<Wrapper />);
//   expect(screen.queryByText('Open')).toBeNull();
// });
//
// test('Should provider pass values to the component', async () => {
//   const Wrapper = testHOC(SolutionFormContext);
//   render(<SolutionFormContext.Provider value={{ openForm: open, setOpenForm: setOpen }}><Wrapper /></SolutionFormContext.Provider>);
//   expect(await screen.findByText('Open')).toBeInTheDocument();
// });
//
// delete window.location;
// window.location = { search: '' };
//
// test('Should handler pass values to the component', async () => {
//   window.location.search = '?form=solution';
//   const Wrapper = testHOC(SolutionFormContext);
//   expect(screen.queryByText('Open')).not.toBeInTheDocument();
//   render(<Router><SolutionFormHandler solution={solutionMock}><Wrapper /></SolutionFormHandler></Router>);
//   expect(await screen.findByText('Open')).toBeInTheDocument();
// });
