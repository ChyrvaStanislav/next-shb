/* eslint no-undef: 1, spaced-comment: 1 */

/**
 * Get browser information
 * @returns {{
 *  name: string,
 *  version: string,
 * }}
 */
export const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let tem = '';
  let M = ua.match(
    /(opera|chrome|safari|firefox|msie|iPhone OS|trident(?=\/))\/?\s*(\d+)/i
  ) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];

    return {
      name: 'ie',
      version: tem[1] || ''
    };
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge|Edg)\/(\d+)/);
    if (tem !== null) {
      return {
        name: tem[1] === 'OPR' ? 'opera' : 'edge',
        version: tem[2]
      };
    }
  }
  if (M[1] === 'iPhone OS') {
    return {
      name: 'safari',
      version: M[2]
    };
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) !== null) M.splice(1, 1, tem[1]); // eslint-disable-line

  return {
    name: M[0] ? M[0].toLowerCase() : 'unknown',
    version: M[1]
  };
};

const browserInfo = getBrowserInfo();

export const getBrowserName = () => browserInfo.name;
export const getBrowserVersion = () => browserInfo.version;
