import React from 'react';
import { render } from '@testing-library/react';
import Recaptcha from '../index';

const setFieldValue = jest.fn();

const Component = () => (
  <Recaptcha
    formId="formId"
    label="Some label"
    field={{
      name: 'name',
      value: '',
    }}
    form={{
      touched: {},
      errors: {},
      setFieldValue
    }}
  />
);

const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules(); // Most important - it clears the cache
  process.env = { ...OLD_ENV }; // Make a copy
});

afterAll(() => {
  process.env = OLD_ENV; // Restore old environment
});

describe('Recaptcha renders', () => {
  it('should Recaptcha renders', () => {
    process.env.RECAPTCHA_KEY = '6Leta8IUAAAAAGc5AiKzXuv7qJaQjL_nM3rSDYpN';
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });
});
