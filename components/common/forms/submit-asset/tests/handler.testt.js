// import React from 'react';
// import { TextEncoder } from 'util';
// import '@testing-library/jest-dom';
// import { render, screen } from '@testing-library/react';
// import testHOC from 'v2_main/components/common/forms/testUtils';
// import SubmitAssetFormHandler, { SubmitAssetFormContext } from '../handler';
// import ccList from './ccList';
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
// jest.mock('v2_main/components/common/form-components/input-text', () => () => null);
//
// afterEach(() => {
//   setOpen.mockClear();
// });
//
// test('Default values', () => {
//   const Wrapper = testHOC(SubmitAssetFormContext);
//   render(<Wrapper />);
//   expect(screen.queryByText('Open')).toBeNull();
// });
//
// test('Should provider pass values to the component', () => {
//   const Wrapper = testHOC(SubmitAssetFormContext);
//   render(<SubmitAssetFormContext.Provider value={{ openForm: open, setOpenForm: setOpen }}><Wrapper /></SubmitAssetFormContext.Provider>);
//   expect(screen.getByText('Open')).toBeInTheDocument();
// });
//
// test('Should handler pass values to the component', async () => {
//   const Wrapper = testHOC(SubmitAssetFormContext);
//   expect(screen.queryByText('Open')).not.toBeInTheDocument();
//   render(<SubmitAssetFormHandler ccList={ccList}><Wrapper /></SubmitAssetFormHandler>);
//   expect(await screen.findByText('Open')).toBeInTheDocument();
// });
