import jwtDecode from 'jwt-decode';
import { getToken, setToken } from './cookieHelper';
import ApiController from '../api';

const KEY_PREV_LINK = 'prevLink';

const setPrevLink = () => {
  const url = window.location.href;

  localStorage.setItem(KEY_PREV_LINK, url);
};

const getPrevLink = () => localStorage.getItem(KEY_PREV_LINK);

const existPrevLink = () => !!localStorage.getItem(KEY_PREV_LINK);

const goToPrevLink = () => {
  if (existPrevLink()) {
    const url = getPrevLink();

    localStorage.removeItem(KEY_PREV_LINK);
    window.location.assign(url);
  }
};

// eslint-disable-next-line consistent-return
function getNumberMillisecondsToTokenExpired() {
  try {
    const { accessToken, refreshToken } = getToken();

    if (!accessToken || !refreshToken) {
      return {
        numberMillisecondsToTokenExpired: 0,
        numberMillisecondsToRefreshTokenExpired: 0,
      };
    }

    const authToken = jwtDecode(accessToken);
    const { exp } = authToken;
    const numberMillisecondsToTokenExpired = (exp * 1000) - Date.now();
    const numberMillisecondsToRefreshTokenExpired = (jwtDecode(refreshToken).exp * 1000) - Date.now();

    return {
      numberMillisecondsToTokenExpired,
      numberMillisecondsToRefreshTokenExpired
    };
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(`from getNumberMillisecondsToTokenExpired: ${error}`);
    }
  }
}

const fetchRefreshToken = (setErrorCode, succesessCallback = () => { }, setLoader = () => {}) => {
  const { accessToken, refreshToken } = getToken();
  if (!accessToken || !refreshToken) {
    setLoader(false);

    return;
  }

  const {
    numberMillisecondsToRefreshTokenExpired
  } = getNumberMillisecondsToTokenExpired();

  if (numberMillisecondsToRefreshTokenExpired > 0) {
    ApiController.refreshToken(refreshToken)
      .then((result) => {
        const newAccessToken = result?.data['access_token'];
        const newRefreshToken = result?.data['refresh_token'];

        setToken(newAccessToken, 'shubToken');
        setToken(newRefreshToken, 'refreshToken');
        succesessCallback(result);
      })
      .catch((err) => {
        setErrorCode(err.response.status);
      });
  }
};

const setIntervalForRefreshToken = (setErrorCode, succesessCallback = () => { }) => {
  const NUMBER_ATTEMPTS = 2;
  let attempt = 0;

  const id = setInterval(() => {
    const { refreshToken } = getToken();
    const {
      numberMillisecondsToTokenExpired,
      numberMillisecondsToRefreshTokenExpired
    } = getNumberMillisecondsToTokenExpired();

    if (numberMillisecondsToTokenExpired - (1000 * 60 * 10) <= 0 && numberMillisecondsToRefreshTokenExpired > 0 && !document.hidden) {
      ApiController.refreshToken(refreshToken)
        .then((result) => {
          const newAccessToken = result?.data['access_token'];
          const newRefreshToken = result?.data['refresh_token'];
          attempt = 0;
          setToken(newAccessToken, 'shubToken');
          setToken(newRefreshToken, 'refreshToken');
          succesessCallback(result);
        })
        .catch((err) => {
          if (attempt < NUMBER_ATTEMPTS) {
            attempt += 1;
          } else {
            attempt = 0;
            setErrorCode(err.response.status);
          }
        });
    }
  }, 1000 * 60);

  return id;
};

// eslint-disable-next-line consistent-return
const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);

    return (exp * 1000) - Date.now() <= 0;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(`Error from isTokenExpired: ${error}`);
    }
  }
};

const isAuthTokenExpired = () => {
  const { accessToken } = getToken();

  return isTokenExpired(accessToken);
};

// eslint-disable-next-line consistent-return
const isRefreshTokenExpired = () => {
  try {
    const { refreshToken } = getToken();

    return isTokenExpired(refreshToken);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(`from isRefreshTokenExpired: ${error}`);
    }
  }
};

// eslint-disable-next-line consistent-return
const isTokenExist = () => {
  try {
    const { accessToken } = getToken();

    return Boolean(accessToken);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(`from isTokenExist: ${error}`);
    }
  }
};

export {
  setPrevLink,
  goToPrevLink,
  existPrevLink,
  getPrevLink,
  fetchRefreshToken,
  isAuthTokenExpired,
  isRefreshTokenExpired,
  isTokenExist,
  setIntervalForRefreshToken,
  getNumberMillisecondsToTokenExpired,
  KEY_PREV_LINK,
};
