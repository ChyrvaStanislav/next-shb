/**
 * @param error {Object}
 */
const handleError = (error) => {
  throw new URIError(`The script ${error?.target?.src} didn't load correctly.`);
};

export default handleError;
