/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';
import { getPhoneNubmerData } from '../form-components/country-select/util';

export const phoneNumberSchema = Yup.string()
  .test('phoneNumber', 'Invalid Cellphone number.', (value) => {
    const phoneRegExp = /^\+?[0-9\s]+$/;
    const {
      code,
      phoneNumber
    } = getPhoneNubmerData(value);

    if (phoneNumber === '') return true;

    return phoneRegExp.test(code + phoneNumber);
  })
  .test('phoneNumber', 'Maximum 15 digits are allowed.', (value) => {
    const { code, phoneNumber } = getPhoneNubmerData(value);
    const number = (code + phoneNumber).replace(/\s+/g, '');
    // - 1 to ignore '+' in the beginning
    if (phoneNumber === '') return true;
    if (number.length && (number.length - 1) > 15) return false;

    return true;
  })
  .test('phoneNumber', 'Minimum 10 digits are allowed.', (value) => {
    const {
      code,
      phoneNumber
    } = getPhoneNubmerData(value);
    if (phoneNumber === '') return true;
    const number = (code + phoneNumber).replace(/\s+/g, '');
    // - 1 to ignore '+' in the beginning
    if (number.length && (number.length - 1) < 10) return false;

    return true;
  });

export const engModeValidationSchema = Yup.object().shape({});


