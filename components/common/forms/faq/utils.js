import * as Yup from 'yup';
import {
  ENGLISH_ONLY_ERROR_TEXT,
  ENGLISH_TEXT_NUMBERS_CHARACTERS_REGEX,
  NAMES_REGEX,
  MIN_THREE_CHARACTERS_ERROR_TEXT,
  MAX_SIXTY_CHARACTERS_ERROR_TEXT,
  EMPTY_FULL_NAME_ERROR_TEXT,
  EMPTY_EMAIL_ERROR_TEXT, INCORRECT_EMAIL_ERROR_TEXT,
  NAMES_REGEX_TEXT, EMAIL_REGEX,
} from 'v2_main/components/common/forms/config';

const initialValues = {
  requestorName: '',
  requestorEmail: '',
  question: '',
  confirm: false,
  captchaResponse: '',
};

const validationSchema = Yup.object().shape({
  requestorName: Yup.string()
    .required(EMPTY_FULL_NAME_ERROR_TEXT)
    .matches(NAMES_REGEX, NAMES_REGEX_TEXT)
    .min(3, MIN_THREE_CHARACTERS_ERROR_TEXT)
    .max(60, MAX_SIXTY_CHARACTERS_ERROR_TEXT),
  requestorEmail: Yup.string(),
  confirm: Yup.bool(),
  question: Yup.string()
    .required('The Comment field is required.')
    .matches(ENGLISH_TEXT_NUMBERS_CHARACTERS_REGEX, ENGLISH_ONLY_ERROR_TEXT),
  captchaResponse: Yup.string().required('Please use captcha.'),
});

const validationSchemaWithEmail = Yup.object().shape({
  requestorName: Yup.string()
    .required(EMPTY_FULL_NAME_ERROR_TEXT)
    .matches(NAMES_REGEX, NAMES_REGEX_TEXT)
    .min(3, MIN_THREE_CHARACTERS_ERROR_TEXT)
    .max(60, MAX_SIXTY_CHARACTERS_ERROR_TEXT),
  requestorEmail: Yup.string()
    .test(
      'emailRegExp',
      INCORRECT_EMAIL_ERROR_TEXT,
      value => EMAIL_REGEX.test(value)
    )
    .required(EMPTY_EMAIL_ERROR_TEXT),
  question: Yup.string()
    .required('The Comment field is required.')
    .matches(ENGLISH_TEXT_NUMBERS_CHARACTERS_REGEX, ENGLISH_ONLY_ERROR_TEXT),
  confirm: Yup.bool().notRequired(),
  captchaResponse: Yup.string().required('Please use captcha.'),
});

export {
  initialValues,
  validationSchema,
  validationSchemaWithEmail,
};
