import { useState, useEffect, useContext } from 'react';
import ApiController from '../../v2_common/api';
import { getToken, removeToken } from '../../v2_common/utils/cookieHelper';
import { setPrevLink, setIntervalForRefreshToken } from '../../v2_common/utils/auth';
import { addPath } from '../../v2_common/utils/history';
import { getAuthLink } from '../../v2_common/api/auth/authHelper';
// import HandlerErrorContext from 'v2_main/components/handler-error/context';
// import AppContext from 'v2_main/context/appContext';
// import ContentLoadedContext from 'v2_main/components/handler-content-loaded/context';

const useApi = (callback, pageId, mode) => {
  const { accessToken } = getToken();
  // const { setGlobalError } = useContext(HandlerErrorContext);
  // const { setIsContentLoaded } = useContext(ContentLoadedContext);
  // const { globalVariables, setGlobalVariables } = useContext(AppContext);
  const [readyData, setReadyData] = useState({
    data: {},
    loading: true,
    isAuthorized: !!accessToken,
  });

  const [pathData, setPathData] = useState({ pathname: null, search: null })

  useEffect(() => {
    const {
      pathname,
      search,
    } = window.location;

    setPathData({ pathname, search })
  }, [])

  const {
    pathname,
    search,
  } = pathData;

  useEffect(() => {
    addPath(`${pathname}${search}`);
  }, [pathname, search]);

  useEffect(() => {
    let unmountComponent = false;
    // setIsContentLoaded(false);

    if (!readyData.loading) {
      setReadyData(prevState => ({
        ...prevState,
        loading: true,
      }));
    }

    callback(
      pageId,
      accessToken,
      {}
    )
      .then((res) => {
        if (!unmountComponent) {
          const data = mode === 'part' ? res.data : res.data.content;

          setReadyData(prevState => ({
            ...prevState,
            data,
            loading: false,
          }));
          // setIsContentLoaded(true);

          // save globalVariables to AppContext

          // if ((data?.globalVariables || data?.content?.globalVariables) && !globalVariables) {
          //   setGlobalVariables(data?.globalVariables || data?.content?.globalVariables);
          // }
        }
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          removeToken();
          setPrevLink();
          window.location.assign(getAuthLink());
        }
        if (!unmountComponent) {
          // setGlobalError(err?.response?.status || 400);
          setReadyData(prevState => ({
            ...prevState,
            loading: false,
          }));
        }
      });

    // const timerIdForRefreshToken = setIntervalForRefreshToken(setGlobalError);

    return () => {
      unmountComponent = true;
      // clearInterval(timerIdForRefreshToken);
    };
  }, [pageId]);

  return readyData;
};

export const getPage = pageId => useApi.call(
  null,
  getToken().accessToken ? ApiController.getInternalPage : ApiController.getPage,
  pageId,
  'page'
);

export const getPart = pageId => useApi.call(
  null,
  getToken().accessToken ? ApiController.getInternalPart : ApiController.getPart,
  pageId,
  'part'
);

export const getPrivatePage = pageId => useApi.call(
  null,
  ApiController.getInternalPage,
  pageId,
  'page'
);

export const getPrivatePart = pageId => useApi.call(
  null,
  ApiController.getInternalPart,
  pageId,
  'part'
);
