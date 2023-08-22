'use client'

import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames';
import { PaginationArrow } from '@/svgComponents';
import styles from './Pagination.module.scss';
import { useRouter } from 'next/navigation'

export default function Pagination(props) {
  const {
    pageCount,
    page,
    single,
    pageId,
  } = props;

  const router = useRouter();
  const range =  (page > 3 && page < (pageCount - 3)) ? 3 : 4;

  const handlePageChange = ({ selected }) => {

    router.push(`${pageId}${pageId === '/' ? "" : '/'}${+selected === 0 ? '' : selected + 1}`);
  }

  const getHref = (index) => {
    let link = `${pageId}${pageId === '/' ? "" : '/'}${+index === 0 ? '' : index + 1}`;

    return link;
  };

  return (
    <div className={styles.root}>

    <ReactPaginate
      previousLabel={<PaginationArrow direction="left" className="arrowIcon" />}
      nextLabel={<PaginationArrow direction="right" className="arrowIcon" />}
      breakLabel="..."
      breakClassName="break-me"
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={range}
      forcePage={page}
      onPageChange={handlePageChange}
      containerClassName={classNames('pagination', { single })}
      subContainerClassName="pages pagination"
      activeClassName="active"
      hrefBuilder={getHref}
      // renderOnZeroPageCount={null}
      selectedPageRel={null}
    />
    </div>

  );
}

Pagination.propTypes = {
  pageCount: PropTypes.number,
  page: PropTypes.number,
  handlePageChange: PropTypes.func,
  single: PropTypes.bool,
  pageId: PropTypes.string.isRequired,
  additionalQueryParams: PropTypes.string,
};

Pagination.defaultProps = {
  pageCount: 0,
  page: 0,
  handlePageChange() {},
  single: false,
  additionalQueryParams: null,
};
