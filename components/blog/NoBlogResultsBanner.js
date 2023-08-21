import classNames from 'classnames';
import React from 'react';
import NotFoundBlogsIcon from 'v2_main/components/blog/NotFoundBlogsIcon';
import PropTypes from 'prop-types';
import { Typography } from 'v2_main/components/html';
import styles from './NoBlogResultsBanner.module.scss';

const NoBlogResultsBanner = (props) => {
  const { searchText } = props;

  return (
    <div className={styles.banner}>
      <Typography
        className={styles.message}
        type="p"
      >
        Sorry, no results for
        { searchText && (
          <Typography
            className={styles.searchText}
            type="span"
            title={searchText}
          >
            {searchText}
          </Typography>
        )}
        in this topic
      </Typography>
      <Typography
        className={classNames(styles.message, styles.additional)}
        type="p"
      >
        Try changing
        {' '}
        <span className={styles.notMobile}>your filters or</span>
        {' '}
        use different keywords
      </Typography>
      <NotFoundBlogsIcon />
    </div>
  );
};

export default NoBlogResultsBanner;

NoBlogResultsBanner.propTypes = {
  searchText: PropTypes.string.isRequired,
};
