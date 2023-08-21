import { isEmpty } from 'lodash';

export const getToken = () => {
  let accessToken = null;
  let refreshToken = null;

  let entries = null;

  if (typeof window !== 'undefined') {
    entries = window.document.cookie.split(';');
  }

  entries?.forEach((entry) => {
    if (entry.includes('shubToken')) {
      // eslint-disable-next-line prefer-destructuring
      accessToken = entry.split('=')[1];
    }

    if (entry.includes('refreshToken')) {
      // eslint-disable-next-line prefer-destructuring
      refreshToken = entry.split('=')[1];
    }
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const setToken = (token, type = 'shubToken') => {
  window.document.cookie = `${type}=${window.encodeURIComponent(token)};path=/`;
};

export const removeToken = () => {
  window.document.cookie = 'shubToken=;path=/';
  window.document.cookie = 'refreshToken=;path=/';
};

export const isTokenExpired = ({ auth_time }) => { //eslint-disable-line
  const authDateTime = new Date(auth_time);
  const expired = authDateTime.setDate(authDateTime.getDate() + 1);

  return expired < +new Date();
};

export const getName = tokenData => (isEmpty(tokenData) ? 'JD' : tokenData.email.split('_').map(item => item[0].toUpperCase()).join(''));

/**
 * @description function from https://learn.javascript.ru/cookie
 * @param name {string}
 * @param value {string}
 * @param options {object}
 */
export const setCookie = (name, value, options = {}) => {
  const cookieOptions = {
    path: '/',
    ...options
  };

  if (cookieOptions.expires instanceof Date) {
    cookieOptions.expires = options.expires.toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  Object.keys(cookieOptions).forEach((optionKey) => {
    updatedCookie += `; ${optionKey}`;
    const optionValue = cookieOptions[optionKey];
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`;
    }
  });

  if (typeof document !== 'undefined') {
    document.cookie = updatedCookie;
  }
};

/**
 * @description function from https://learn.javascript.ru/cookie
 * @param name {string}
 */
export const getCookie = (name) => {
  if (typeof document !== 'undefined') {
    const matches = document.cookie.match(new RegExp(
      // eslint-disable-next-line
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
    ));

    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  return undefined;
};

/**
 * @description function from https://learn.javascript.ru/cookie
 * @param name {string}
 */
export const deleteCookie = (name) => {
  setCookie(name, '', {
    'max-age': -1
  });
};
