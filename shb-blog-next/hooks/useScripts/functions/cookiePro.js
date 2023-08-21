import { botRegExp } from 'v2_common/constants/regularExpressions';
import handleError from './handleError';

/**
 * @description This function configure cookiePro banner for mobile devices:
 * 1). Search cookiePro banner policy text paragraph (#onetrust-policy-text) until finds it;
 * 2). Work with <p id="onetrust-policy-text">,
 *     change tag <p> for <span> (for correct work on mobile iOs Safari),
 *     and add "display: -webkit-box" style;
 * 3). Add listener to expand policy text when clicked;
 */
const configurePolicyText = () => {
  try {
    const isPolicyTextExist = false;
    const isSettingsTextExist = false;

    const setPolicyTextFade = (id, isTextExist) => {
      setTimeout(() => {
        if (isTextExist) {
          return;
        }

        // const textElem = document.querySelector('#onetrust-policy-text');
        const textElem = document.querySelector(`#${id}`);
        if (!textElem) {
          setPolicyTextFade(id, isTextExist);
        } else {
          // eslint-disable-next-line no-param-reassign
          isTextExist = true;

          const spanElem = document.createElement('span');
          spanElem.style.setProperty('display', '-webkit-box', 'important');
          spanElem.classList.add('faded');
          spanElem.id = id;
          spanElem.innerHTML = textElem.innerHTML;
          spanElem.addEventListener('click', (e) => {
            e.stopPropagation();
            if (e.target === e.currentTarget) {
              if (e.target.style.display === '-webkit-box') {
                e.target.style.setProperty('display', 'block', 'important');
                spanElem.classList.remove('faded');
              } else {
                e.target.style.setProperty('display', '-webkit-box', 'important');
                spanElem.classList.add('faded');
              }
            }
          });

          textElem.parentNode.replaceChild(spanElem, textElem);
        }
      }, 50);
    };

    setPolicyTextFade('onetrust-policy-text', isPolicyTextExist);
    setPolicyTextFade('ot-pc-desc', isSettingsTextExist);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(`from setPolicy cookiePro: ${error}`);
    }
  }
};

/**
 * @param timeout {Number}
 */
const injectCookiePro = (timeout) => {
  const otSDKStub = document.createElement('script');
  otSDKStub.setAttribute('charset', 'UTF-8');
  otSDKStub.setAttribute('data-domain-script', '6f356320-5183-4daf-94bc-c6c376af42be');
  otSDKStub.setAttribute('async', 'true');
  otSDKStub.src = 'https://cookie-cdn.cookiepro.com/scripttemplates/otSDKStub.js';
  otSDKStub.type = 'text/javascript';
  otSDKStub.async = true;
  otSDKStub.onerror = handleError;
  otSDKStub.onload = configurePolicyText;

  setTimeout(() => {
    if (navigator?.userAgent && botRegExp.test(navigator?.userAgent?.toLowerCase())) {
      return;
    }

    document.head.appendChild(otSDKStub);
  }, timeout);
};

export default injectCookiePro;
