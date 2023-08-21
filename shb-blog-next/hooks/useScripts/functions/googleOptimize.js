import handleError from './handleError';

/**
 * @param timeout {Number}
 */
const injectGoogleOptimize = (timeout) => {
  const googleOptimize = document.createElement('script');
  googleOptimize.src = 'https://www.googleoptimize.com/optimize.js?id=OPT-KGJPX33';
  googleOptimize.type = 'text/javascript';
  googleOptimize.async = true;
  googleOptimize.onerror = handleError;

  setTimeout(() => {
    document.head.appendChild(googleOptimize);
  }, timeout);
};

export default injectGoogleOptimize;
