// import React from 'react';
// import { TextEncoder } from 'util';
// import '@testing-library/jest-dom';
// import { render, screen } from '@testing-library/react';
// import testHOC from 'v2_main/components/common/forms/testUtils';
// import ContactUsFormHandler, { ContuctUsFormContext } from '../handler';
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
//   const Wrapper = testHOC(ContuctUsFormContext);
//   render(<Wrapper />);
//   expect(screen.queryByText('Open')).toBeNull();
// });
//
// test('Should provider pass values to the component', () => {
//   const Wrapper = testHOC(ContuctUsFormContext);
//   render(<ContuctUsFormContext.Provider value={{ openForm: open, setOpenForm: setOpen }}><Wrapper /></ContuctUsFormContext.Provider>);
//   expect(screen.getByText('Open')).toBeInTheDocument();
// });
//
// test('Should handler pass values to the component', async () => {
//   const Wrapper = testHOC(ContuctUsFormContext);
//   expect(screen.queryByText('Open')).not.toBeInTheDocument();
//   render(<ContactUsFormHandler><Wrapper /></ContactUsFormHandler>);
//   expect(await screen.findByText('Open')).toBeInTheDocument();
// });
