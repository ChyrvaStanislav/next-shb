import uniqId from 'uniqid';
import { getToken, setCookie } from './cookieHelper';

/**
 * @description get counter value from cookie
 * TextEncoder and uniqId are used to make the view of counter "key: value" pair non-human.
 * Example: before: "formSubmitCounter: 1", after: "_102.111.114.109.83.117.98.109.105.116.67.111.117.110.116.101.114: 1ktk1tor5";
 * @param solutionName {string|null} - if exist - get cookie for specific solution
 * @return {string|null}
 */
const getFormSubmitCounter = (solutionName = null) => {
  try {
    const encoder = new TextEncoder();

    const encodedFormId = `_${encoder.encode(solutionName || 'formSubmitCounter').join('.')}`; // encode 'formSubmitCounter'
    const entries = window?.document?.cookie?.split(';');
    const formSubmitCounter = entries?.find(entry => entry?.includes(encodedFormId)); // find encoded key in cookie

    if (formSubmitCounter) {
      const value = formSubmitCounter.split('=')?.[1];

      return value?.toString()?.[0]; // return only first letter
    }

    return null;
  } catch (error) {
    throw new Error(`getFormSubmitCounter: ${error}`);
  }
};

/**
 * @description encode counter "key: value" pair and write it to cookie.
 * 1.) If first time - write it to cookie;
 * 2.) If counter less then maxCount - increment counter and save changes to cookie;
 * 3.) If iterated counter === maxCount - set form disabled state to true;
 *
 * @param maxCount {Number}
 * @param setIsDisabled {Function}
 * @param specificSolutionDisabledName {string|null} - if exist - write cookie for specific solution
 */
export const setFormSubmitCounter = (maxCount = 5, setIsDisabled = null, specificSolutionDisabledName = null) => {
  try {
    const counter = getFormSubmitCounter(specificSolutionDisabledName);
    const encoder = new TextEncoder();
    const encodedFormId = `_${encoder.encode(specificSolutionDisabledName || 'formSubmitCounter').join('.')}`;

    // cookies will expire the next day or after 3 days
    const tomorrow = new Date(new Date());
    const submitTimeout = specificSolutionDisabledName ? 3 : 1;
    tomorrow.setDate(tomorrow.getDate() + submitTimeout);
    tomorrow.setHours(0, 0, 30, 0);

    if (!counter) {
      const value = `1${uniqId()}`;
      setCookie(encodedFormId, value, {
        expires: tomorrow,
      });

      return;
    }

    if (+counter < +maxCount) {
      const value = `${+counter + 1}${uniqId()}`;
      setCookie(encodedFormId, value, {
        expires: tomorrow,
      });
    }

    if (+counter + 1 === +maxCount && typeof setIsDisabled === 'function') {
      setIsDisabled(true);
    }
  } catch (error) {
    throw new Error(`setFormSubmitCounter: ${error}`);
  }
};

/**
 * @description check if the max count of submissions is reached (only for external users)
 * @param maxCount {Number}
 * @return {boolean}
 */
export const isFormSubmitDisabled = (maxCount = 5) => {
  const { accessToken } = getToken();
  const counter = getFormSubmitCounter();

  return +counter >= maxCount && !accessToken;
};

/**
 * @description check if the max count of specific solution submissions is reached (only for external users)
 * @param specificSolutionDisabledName {string}
 * @param specificSolutionLimit {number}
 * @return {boolean}
 */
export const isSpecificSolutionSubmitDisabled = (specificSolutionDisabledName, specificSolutionLimit = 1) => {
  const { accessToken } = getToken();
  const counter = getFormSubmitCounter(specificSolutionDisabledName);

  return +counter >= +specificSolutionLimit && !accessToken;
};
