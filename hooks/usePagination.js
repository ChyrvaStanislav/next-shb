import { useState, useEffect } from 'react';

/**
 * @param updates {Array}
 * @param postsCount {Number}
 * @param pageId {String}
 * @param navigate {Function}
 * @param additionalQueryParams {String}
 * @return {{handlePagination: handlePagination, page: (number), needLoading: (function(): boolean), renderedUpdates: *[]}}
 */
const usePagination = (updates, postsCount, pageId, navigate, additionalQueryParams = null) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const pageFromParams = urlParams.get('page');
  const initialPage = pageFromParams > 0 ? pageFromParams - 1 : 0;
  const [page, setPage] = useState(initialPage);
  const [renderedUpdates, setRenderedUpdates] = useState([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    setRenderedUpdates([...updates.slice(page * postsCount, (page * postsCount) + postsCount)]);
  }, [page, updates]);
  useEffect(() => {
    setPage(initialPage);
  }, [updates]);

  const needLoading = () => updates.length > renderedUpdates.length;

  /**
   * @param selected {Number} from react-paginate
   */
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
    renderedUpdates,
    page,
    needLoading,
    handlePagination,
    setPage,
  };
};

export default usePagination;
