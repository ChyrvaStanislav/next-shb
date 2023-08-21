import handleError from './handleError';

/**
 * @param isInit {Boolean}
 */
const initMunchkin = (isInit) => {
  if (!isInit) {
    isInit = true; // eslint-disable-line
    Munchkin.init(process.env.MUNCHKIN_ID); // eslint-disable-line
  }
};

/**
 * @param isInit {Boolean}
 * @param timeout {Number}
 */
const injectMunchkin = (isInit, timeout) => {
  const munchkin = document.createElement('script');
  munchkin.src = '//munchkin.marketo.net/munchkin.js';
  munchkin.async = true;
  munchkin.type = 'text/javascript';
  munchkin.onerror = handleError;
  munchkin.onload = () => initMunchkin(isInit);

  setTimeout(() => {
    document.head.appendChild(munchkin);
  }, timeout);
};

export default injectMunchkin;
