/**
 * Used in yup schema for email;
 * @param value {string} - input value from yup
 * @param personalEmailsList - array of email templates from CMS
 * @return {boolean}
 */
const isPersonalEmail = (value, personalEmailsList) => {
  let result = false;
  if (!value) return !result;

  personalEmailsList.forEach((email) => {
    if (value.includes(email)) {
      result = true;
    }
  });

  return !result;
};

export default isPersonalEmail;
