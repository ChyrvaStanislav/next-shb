const HTMLRegExp = /<(“[^”]*”|'[^’]*’|[^'”>])*>/gi;

/**
 * @description remove HTML tags from string (used in forms to prevent HTML injections);
 * delete double and single quotes (quotes lead to JSON errors in backend);
 * trim;
 * @param value {string}
 * @param notTrim {boolean} - used to define trim. We should trim only on "blur" event, (not on "change")
 */
const removeHTML = (value, notTrim = false) => (notTrim
  ? value.replace(HTMLRegExp, '').replace(/"|“|”/gi, '')
  : value.replace(HTMLRegExp, '').replace(/"|“|”/gi, '').trim());

export default removeHTML;
