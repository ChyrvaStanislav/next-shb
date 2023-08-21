import * as Yup from 'yup';
import { getToken } from '../../../../../v2_common/utils/cookieHelper';
import { phoneNumberSchema } from '../yup.util';
import {
  NAMES_REGEX,
  NAMES_REGEX_TEXT,
  ENGLISH_TEXT_NUMBERS_CHARACTERS_REGEX,
  EMPTY_FIRST_NAME_ERROR_TEXT,
  MIN_THREE_CHARACTERS_ERROR_TEXT,
  MAX_THIRTY_CHARACTERS_ERROR_TEXT,
  EMPTY_LAST_NAME_ERROR_TEXT,
  EMPTY_EMAIL_ERROR_TEXT,
  INCORRECT_EMAIL_ERROR_TEXT,
  BUSINESS_EMAIL_ERROR_TEXT, ENGLISH_ONLY_ERROR_TEXT,
  EMAIL_REGEX,
} from '../config';
import jwtDecode from 'jwt-decode';
import isPersonalEmail from '../../../../../v2_common/utils/isPersonalEmail';

const { accessToken } = getToken();
let tokenData;
try {
  tokenData = accessToken && jwtDecode(accessToken);
} catch (error) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(`jwtDecode error from contact-us form: ${error}`);
  }
}

const initialValues = {
  firstName: tokenData?.['given_name'] || '',
  lastName: tokenData?.['family_name'] || '',
  email: tokenData?.email || '',
  message: '',
  phone: '',
  confirm: false,
  captchaResponse: '',
};

const validationSchema = personalEmailsList => Yup.object().shape({
  firstName: Yup.string()
    .required(EMPTY_FIRST_NAME_ERROR_TEXT)
    .matches(NAMES_REGEX, NAMES_REGEX_TEXT)
    .min(3, MIN_THREE_CHARACTERS_ERROR_TEXT)
    .max(30, MAX_THIRTY_CHARACTERS_ERROR_TEXT),
  lastName: Yup.string()
    .required(EMPTY_LAST_NAME_ERROR_TEXT)
    .matches(NAMES_REGEX, NAMES_REGEX_TEXT)
    .min(3, MIN_THREE_CHARACTERS_ERROR_TEXT)
    .max(30, MAX_THIRTY_CHARACTERS_ERROR_TEXT),
  email: (personalEmailsList
    ? Yup.string()
      .required(EMPTY_EMAIL_ERROR_TEXT)
      .test(
        'emailRegExp',
        INCORRECT_EMAIL_ERROR_TEXT,
        value => EMAIL_REGEX.test(value)
      )
      .test(
        'isPersonalEmail',
        BUSINESS_EMAIL_ERROR_TEXT,
        value => isPersonalEmail(value, personalEmailsList)
      )
    : Yup.string()
      .test(
        'emailRegExp',
        INCORRECT_EMAIL_ERROR_TEXT,
        value => EMAIL_REGEX.test(value)
      )
      .required(EMPTY_EMAIL_ERROR_TEXT)),
  message: Yup.string().required('The message field is required.').matches(ENGLISH_TEXT_NUMBERS_CHARACTERS_REGEX, ENGLISH_ONLY_ERROR_TEXT),
  phone: phoneNumberSchema,
  confirm: Yup.bool().oneOf([true], 'Please agree with the Terms to send a request.'),
  captchaResponse: Yup.string().required('Please use captcha.'),
});

const validationSchemaInternal = Yup.object().shape({
  firstName: Yup.string()
    .required(EMPTY_FIRST_NAME_ERROR_TEXT)
    .matches(NAMES_REGEX, NAMES_REGEX_TEXT)
    .min(3, MIN_THREE_CHARACTERS_ERROR_TEXT)
    .max(30, MAX_THIRTY_CHARACTERS_ERROR_TEXT),
  lastName: Yup.string()
    .required(EMPTY_LAST_NAME_ERROR_TEXT)
    .matches(NAMES_REGEX, NAMES_REGEX_TEXT)
    .min(3, MIN_THREE_CHARACTERS_ERROR_TEXT)
    .max(30, MAX_THIRTY_CHARACTERS_ERROR_TEXT),
  email: Yup.string(),
  phone: phoneNumberSchema,
  message: Yup.string().required('The message field is required.').matches(ENGLISH_TEXT_NUMBERS_CHARACTERS_REGEX, ENGLISH_ONLY_ERROR_TEXT),
});

export {
  initialValues,
  validationSchema,
  validationSchemaInternal
};
