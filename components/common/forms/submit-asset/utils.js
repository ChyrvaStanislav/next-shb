import * as Yup from 'yup';
import { getToken } from 'v2_common/utils/cookieHelper';
import jwtDecode from 'jwt-decode';
import {
  NAMES_REGEX,
  NAMES_REGEX_TEXT,
  ENGLISH_TEXT_NUMBERS_CHARACTERS_REGEX,
  EMPTY_EMAIL_ERROR_TEXT,
  ALLOWED_ENGLISH_NUMBERS_AND_SPECIAL_CHARACTERS_REGEX,
  EMPTY_FIRST_NAME_ERROR_TEXT,
  EMPTY_LAST_NAME_ERROR_TEXT,
  INCORRECT_EMAIL_ERROR_TEXT,
  MIN_THREE_CHARACTERS_ERROR_TEXT,
  MAX_THIRTY_CHARACTERS_ERROR_TEXT,
  ALOWWED_ENGLISH_NUMBERS_AND_SPECIAL_CHARACTERS_ERROR_TEXT,
  EMPTY_ASSET_NAME_ERROR_TEXT,
  ENGLISH_ONLY_ERROR_TEXT,
  BUSINESS_EMAIL_ERROR_TEXT, EMAIL_REGEX,
} from 'v2_main/components/common/forms/config';
import isPersonalEmail from 'v2_common/utils/isPersonalEmail';
import { phoneNumberSchema } from 'v2_main/components/common/forms/yup.util';

const { accessToken } = getToken();
let tokenData;
try {
  tokenData = accessToken && jwtDecode(accessToken);
} catch (error) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(`jwtDecode error from submit-asset form: ${error}`);
  }
}

const initialValues = {
  firstName: tokenData?.['given_name'],
  lastName: tokenData?.['family_name'],
  email: tokenData?.email,
  message: '',
  phone: '',
  assetName: '',
  competencyCenter: ''
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
  message: Yup.string().notRequired().matches(ENGLISH_TEXT_NUMBERS_CHARACTERS_REGEX, ENGLISH_ONLY_ERROR_TEXT),
  phone: phoneNumberSchema,
  assetName: Yup.string()
    .required(EMPTY_ASSET_NAME_ERROR_TEXT)
    .matches(ALLOWED_ENGLISH_NUMBERS_AND_SPECIAL_CHARACTERS_REGEX, ALOWWED_ENGLISH_NUMBERS_AND_SPECIAL_CHARACTERS_ERROR_TEXT)
    .max(30, MAX_THIRTY_CHARACTERS_ERROR_TEXT),
  competencyCenter: Yup.string().required(),
});

const transformCompetencyCenter = (ccList, ccLabel) => {
  const cc = ccList.find(competencyCenter => competencyCenter.label === ccLabel);
  const persomalEmails = Array.from(cc.representatives.map(representative => representative.email));
  persomalEmails.push(cc.dlEmail?.email);

  const competencyCenter = {
    name: cc.label,
    emails: persomalEmails
  };

  return competencyCenter;
};

export {
  initialValues,
  validationSchema,
  transformCompetencyCenter
};
