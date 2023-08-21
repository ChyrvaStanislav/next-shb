// import React from 'react';
// import { TextEncoder } from 'util';
// import '@testing-library/jest-dom';
// import { render, screen } from '@testing-library/react';
// import testHOC from 'v2_main/components/common/forms/testUtils';
// import CVFormHandler, { CVFormContext } from '../handler';
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
//
// afterEach(() => {
//   setOpen.mockClear();
// });
//
// test('Default values', () => {
//   const Wrapper = testHOC(CVFormContext);
//   render(<Wrapper />);
//   expect(screen.queryByText('Open')).toBeNull();
// });
//
// test('Should provider pass values to the component', () => {
//   const Wrapper = testHOC(CVFormContext);
//   render(<CVFormContext.Provider value={{ openForm: open, setOpenForm: setOpen }}><Wrapper /></CVFormContext.Provider>);
//   expect(screen.getByText('Open')).toBeInTheDocument();
// });
//
// test('Should handler pass values to the component', async () => {
//   const Wrapper = testHOC(CVFormContext);
//   expect(screen.queryByText('Open')).not.toBeInTheDocument();
//   render(<CVFormHandler solution={solutionMock}><Wrapper /></CVFormHandler>);
//   expect(await screen.findByText('Open')).toBeInTheDocument();
// });
