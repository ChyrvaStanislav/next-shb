import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SnackbarContext from 'v2_main/context/snackbar-context/SnackbarContext';

const useElasticPagination = (pageId, controllerMethod, params = {}, queryPage, additionalQueryParams = null) => {
  const [isLoading, setIsLoading] = useState(true);
  const [resultData, setResultData] = useState({});
  const [page, setPage] = useState(queryPage ? queryPage - 1 : 0);

  const { setSnackbarOpen } = useContext(SnackbarContext);

  const navigate = useNavigate();

  useEffect(() => {
    setPage(queryPage ? queryPage - 1 : 0);
  }, [queryPage]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { status, data } = await controllerMethod({ ...params, page: page + 1 });

        if (status === 200) {
          setResultData(data);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setSnackbarOpen(true);
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.error(`Error from useElasticPagination: ${error}`);
        }
      }
    })();
  }, [params, page]);

  const handlePagination = ({ selected }) => {
    setPage(selected);
    const signType = additionalQueryParams ? '&' : '?';
    const pageInfo = selected !== 0 ? `${signType}page=${selected + 1}` : '';
    const pathURL = additionalQueryParams
      ? `/${pageId}?${additionalQueryParams}${pageInfo}`
      : `/${pageId}${pageInfo}`;
    navigate(pathURL);
  };

  return {
    isLoading,
    data: resultData,
    page,
    setPage,
    handlePagination,
  };
};

export default useElasticPagination;
