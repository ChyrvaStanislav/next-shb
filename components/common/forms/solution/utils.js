import * as Yup from 'yup';
import { getToken } from 'v2_common/utils/cookieHelper';
import jwtDecode from 'jwt-decode';
import { isEmpty } from 'lodash';
import { phoneNumberSchema } from 'v2_main/components/common/forms/yup.util';
import {
  getLogoPath,
  NAMES_REGEX,
  NAMES_REGEX_TEXT,
  ENGLISH_TEXT_NUMBERS_CHARACTERS_REGEX,
  EMPTY_FIRST_NAME_ERROR_TEXT,
  MIN_THREE_CHARACTERS_ERROR_TEXT,
  MAX_THIRTY_CHARACTERS_ERROR_TEXT,
  EMPTY_LAST_NAME_ERROR_TEXT, EMPTY_EMAIL_ERROR_TEXT,
  INCORRECT_EMAIL_ERROR_TEXT,
  BUSINESS_EMAIL_ERROR_TEXT,
  ENGLISH_ONLY_ERROR_TEXT, EMAIL_REGEX,
} from 'v2_main/components/common/forms/config';
import isPersonalEmail from 'v2_common/utils/isPersonalEmail';

const { accessToken } = getToken();
let tokenData;
try {
  tokenData = accessToken && jwtDecode(accessToken);
} catch (error) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(`jwtDecode error from solution form: ${error}`);
  }
}
const isSolutionOpenAndNoESG = solution => solution?.labels?.isOpenSource && !solution?.tags?.find(tag => tag.id === 'esg');

const initialValues = {
  firstName: tokenData?.['given_name'] || '',
  lastName: tokenData?.['family_name'] || '',
  email: tokenData?.email || '',
  message: '',
  phone: '',
  commercialUsage: undefined,
  captchaResponse: '',
  confirm: false,
  selectedPackage: [],
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
  commercialUsage: Yup.string().required('Business Usage is expected'),
  captchaResponse: Yup.string().required('Please use captcha'),
  confirm: Yup.bool().oneOf([true], 'Please agree with the Terms to send a request'),
});

const validationSchemaNoRadio = personalEmailsList => Yup.object().shape({
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
  confirm: Yup.bool().oneOf([true], 'Please agree with the Terms to send a request'),
  captchaResponse: Yup.string().required('Please use captcha'),
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
  message: Yup.string().notRequired().matches(ENGLISH_TEXT_NUMBERS_CHARACTERS_REGEX, ENGLISH_ONLY_ERROR_TEXT),
  phone: phoneNumberSchema,
  commercialUsage: Yup.string().required('Business Usage is expected'),
});

const validationSchemaInternalNoRadio = Yup.object().shape({
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
  message: Yup.string().notRequired().matches(ENGLISH_TEXT_NUMBERS_CHARACTERS_REGEX, ENGLISH_ONLY_ERROR_TEXT),
  phone: phoneNumberSchema,
});

const getBundledSolutionInfo = (packageSolutions) => {
  const bundledSolutionsData = [];
  packageSolutions.forEach(solution => bundledSolutionsData.push({
    solutionName: solution.name,
    solutionLogo: getLogoPath(solution),
    id: solution._meta.deliveryId,
    solutionUrl: `${window.location.origin}/solution/${solution._meta.deliveryKey}`,
    downloadLink: solution.downloadLink,
    shortDescription: solution.shortDescription
  }));

  return bundledSolutionsData;
};

const getSolutionInfo = (solutionInfo, packageSolutions) => ({
  solutionName: solutionInfo.name,
  solutionLogo: getLogoPath(solutionInfo),
  id: solutionInfo._meta.deliveryId,
  solutionUrl: `${window.location.origin}/solution/${solutionInfo._meta.deliveryKey}`,
  bundledSolutions: packageSolutions?.length > 0 ? getBundledSolutionInfo(packageSolutions) : undefined,
  downloadLink: solutionInfo.downloadLink,
  shortDescription: solutionInfo.shortDescription
});

const showCommercialUsage = (solution, packageSolutions) => {
  if (packageSolutions) {
    return isSolutionOpenAndNoESG(solution)
      && packageSolutions
        .filter(item => item.checked)
        .every(item => item.isOpenAndNoESG);
  }

  return isSolutionOpenAndNoESG(solution);
};

const initialShowCommercialUsage = (solution, packageSolutions) => {
  if (packageSolutions) {
    return isSolutionOpenAndNoESG(solution)
      && packageSolutions.every(item => item.isOpenAndNoESG);
  }

  return isSolutionOpenAndNoESG(solution);
};

const chooseValidationSchema = (solution, packageSolutions, mode, personalEmailsList = null) => {
  if (mode === 'external') {
    return !showCommercialUsage(solution, packageSolutions) ? validationSchemaNoRadio(personalEmailsList) : validationSchema(personalEmailsList);
  }

  return !showCommercialUsage(solution, packageSolutions) ? validationSchemaInternalNoRadio : validationSchemaInternal;
};

/**
 * Collect data from values and push event to dataLayer in format:
 * 1. value "Blank" for each empty field
 * 2. value "Error" for each field, filled with mistakes
 * 3. value "Success" for each correctly filled input field
 *
 * @param values {object} - from Formik
 * @param errors {object} - from Formik
 * @param touched {object} - from Formik
 * @param solutionName {string}
 * @param packageSolutions {Array|undefined} - array of solutions in case of "request package" form submition
 */
const pushSubmitDataToDataLayer = (values, errors, touched, solutionName, packageSolutions, checkboxPackageList) => {
  try {
    const statedValues = Object.entries(values).reduce((acc, elem) => {
      const fieldName = elem[0];
      const fieldValue = elem[0] === 'phone' ? JSON.parse(elem[1]).phoneNumber : elem[1];

      if (fieldName === 'selectedPackage' && !packageSolutions) {
        return acc;
      }

      if (errors[fieldName] && touched[fieldName]) {
        acc[fieldName] = 'ERROR';

        return acc;
      }

      if (!fieldValue || fieldValue?.length === 0) {
        acc[fieldName] = 'BLANK';

        return acc;
      }

      acc[fieldName] = 'SUCCESS';

      return acc;
    }, {});

    const resultString = JSON.stringify(statedValues)
      .replace(/["{}]/g, '')
      .replace(/,/g, ' | ');

    const eventObject = {
      event: 'solution_form_values',
      sf_solution_name: solutionName,
      sf_values: resultString,
    };

    const packageList = checkboxPackageList && checkboxPackageList?.filter(item => item.checked)?.map(item => item.label);

    if (window.dataLayer && window.dataLayer.push) {
      window.dataLayer.push(eventObject);

      if (packageList && !isEmpty(packageList)) {
        window.dataLayer.push({ package_list: packageList?.join(', ') });
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(`from pushSubmitDataToDataLayer: ${error}`);
    }
  }
};

export {
  initialValues,
  getSolutionInfo,
  validationSchemaNoRadio,
  validationSchemaInternalNoRadio,
  chooseValidationSchema,
  showCommercialUsage,
  isSolutionOpenAndNoESG,
  initialShowCommercialUsage,
  pushSubmitDataToDataLayer,
};
