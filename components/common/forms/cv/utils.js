import * as Yup from 'yup';
import {
  getLogoPath,
  ENGLISH_TEXT_NUMBERS_CHARACTERS_REGEX,
  NAMES_REGEX,
  NAMES_REGEX_TEXT,
  EMPTY_EMAIL_ERROR_TEXT,
  ALLOWED_ENGLISH_AND_SPECIAL_CHARACTERS_REGEX,
  EMPTY_FIRST_NAME_ERROR_TEXT,
  EMPTY_LAST_NAME_ERROR_TEXT,
  INCORRECT_EMAIL_ERROR_TEXT,
  MIN_THREE_CHARACTERS_ERROR_TEXT,
  MAX_THIRTY_CHARACTERS_ERROR_TEXT,
  ENGLISH_ONLY_ERROR_TEXT,
  BUSINESS_EMAIL_ERROR_TEXT, EMAIL_REGEX,
} from 'v2_main/components/common/forms/config';
import isPersonalEmail from 'v2_common/utils/isPersonalEmail';
import { phoneNumberSchema } from 'v2_main/components/common/forms/yup.util';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
  phone: '',
  confirm: false,
  captchaResponse: '',
  vacancy: '',
  file: null,
};

const FILE_SIZE = 2000000;
const SUPPORTED_FORMATS = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];

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
  message: Yup.string().notRequired().matches(ENGLISH_TEXT_NUMBERS_CHARACTERS_REGEX, ENGLISH_ONLY_ERROR_TEXT),
  file: Yup.mixed()
    .required('Please upload CV file')
    .test('fileSize', 'Upload failed. Please use file up to 2MB size.',
      value => (value ? value.size <= FILE_SIZE : false))
    .test('fileType', 'Upload failed. Please use file in .pdf or .doc format.',
      value => (value ? SUPPORTED_FORMATS.includes(value.type) : false)),
  phone: phoneNumberSchema,
  confirm: Yup.bool().oneOf([true], 'Please agree with the Terms to send a request.'),
  captchaResponse: Yup.string().required('Please use captcha.'),
  vacancy: Yup.string().required('Please choose the vacancy.').matches(ALLOWED_ENGLISH_AND_SPECIAL_CHARACTERS_REGEX, 'Vacancy should be in English.'),
});


const getSolutionInfo = solutionInfo => ({
  solutionName: solutionInfo.name,
  solutionLogo: getLogoPath(solutionInfo),
  id: solutionInfo._meta.deliveryId,
  shortDescription: solutionInfo.shortDescription,
  solutionUrl: `${window.location.origin}/solution/${solutionInfo._meta.deliveryKey}`
});

function getByteArray(file) {
  const fileReader = new FileReader();
  if (!file) {
    return Promise.resolve();
  }

  return new Promise(((resolve, reject) => {
    fileReader.readAsArrayBuffer(file);
    // eslint-disable-next-line func-names
    fileReader.onload = function (ev) {
      const array = new Uint8Array(ev.target.result);
      const fileByteArray = [];
      for (let i = 0; i < array.length; i += 1) {
        fileByteArray.push(array[i]);
      }
      resolve(fileByteArray);
    };
    fileReader.onerror = reject;
  }));
}

export {
  initialValues,
  validationSchema,
  getSolutionInfo,
  getByteArray
};
