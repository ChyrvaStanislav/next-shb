import * as Yup from 'yup';
import {
  ENGLISH_ONLY_ERROR_TEXT,
  ALLOWED_ENGLISH_NUMBERS_AND_SPECIAL_CHARACTERS_REGEX,
  ALOWWED_ENGLISH_NUMBERS_AND_SPECIAL_CHARACTERS_ERROR_TEXT_2,
  ALOWWED_ENGLISH_AND_SPECIAL_CHARACTERS_ERROR_TEXT,
  ENGLISH_TEXT_NUMBERS_CHARACTERS_REGEX,
  NAMES_REGEX,
  MIN_THREE_CHARACTERS_ERROR_TEXT,
  MAX_SIXTY_CHARACTERS_ERROR_TEXT,
} from 'v2_main/components/common/forms/config';

const initialValues = {
  requestorName: '',
  headline: '',
  isAnonymous: false,
  captchaResponse: '',
  reviewText: '',
};

const validationSchema = Yup.object().shape({
  rate: Yup.number()
    .required('Please choose rate.'),
  requestorName: Yup.string()
    .required('Please enter your name or submit review as anonymous.')
    .matches(NAMES_REGEX, ALOWWED_ENGLISH_AND_SPECIAL_CHARACTERS_ERROR_TEXT)
    .min(3, MIN_THREE_CHARACTERS_ERROR_TEXT)
    .max(30, MAX_SIXTY_CHARACTERS_ERROR_TEXT),
  headline: Yup.string()
    .min(3, MIN_THREE_CHARACTERS_ERROR_TEXT)
    .max(100, 'Write maximum 100 characters.')
    .matches(ALLOWED_ENGLISH_NUMBERS_AND_SPECIAL_CHARACTERS_REGEX, ALOWWED_ENGLISH_NUMBERS_AND_SPECIAL_CHARACTERS_ERROR_TEXT_2),
  reviewText: Yup.string()
    .max(3000, 'Write maximum 3000 characters.')
    .matches(ENGLISH_TEXT_NUMBERS_CHARACTERS_REGEX, ENGLISH_ONLY_ERROR_TEXT),
  isAnonymous: Yup.bool().notRequired(),
  captchaResponse: Yup.string().required('Please use captcha.'),
});

const validationSchemaAnonymous = Yup.object().shape({
  rate: Yup.number()
    .required('Please choose rate.'),
  headline: Yup.string()
    .min(3, MIN_THREE_CHARACTERS_ERROR_TEXT)
    .max(100, 'Write maximum 100 characters.')
    .matches(ALLOWED_ENGLISH_NUMBERS_AND_SPECIAL_CHARACTERS_REGEX, ALOWWED_ENGLISH_AND_SPECIAL_CHARACTERS_ERROR_TEXT),
  reviewText: Yup.string()
    .max(3000, 'Write maximum 3000 characters.')
    .matches(ENGLISH_TEXT_NUMBERS_CHARACTERS_REGEX, ENGLISH_ONLY_ERROR_TEXT),
  isAnonymous: Yup.bool().notRequired(),
  captchaResponse: Yup.string().required('Please use captcha.'),
});

export {
  initialValues,
  validationSchema,
  validationSchemaAnonymous,
};
