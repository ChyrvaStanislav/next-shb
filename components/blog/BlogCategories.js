import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Typography, Link } from 'v2_main/components/html';
import CategoryLink from './CategoryLink';
import styles from './BlogCategories.module.scss';

const BlogCategories = ({
  categoryList,
  setCategory,
  categorySearch,
  menuTitle,
  setMeta,
  defaultMeta,
  querySearch,
  postTag,
  hasHighlight,
  isBlogPost,
}) => {
  const getCategoryLink = category => {
    const isActive = (postTag ? category?.id === postTag?.toLowerCase() : categorySearch === category?.id);

    return (
      <CategoryLink
        key={category?.id}
        category={category}
        setCategory={setCategory}
        setMeta={setMeta}
        querySearch={querySearch}
        isActive={isBlogPost ? false : isActive}
        style={classNames(styles.filterLink, {
          [styles.active]: hasHighlight && isActive
        })}
      />
    );
  };

  const getAllStoriesLink = () => {
    const activeAll = !categorySearch && !postTag;
    if (activeAll) {
      return (
        <Typography
          variant="p_links"
          className={classNames(styles.filterLink, {
            [styles.active]: hasHighlight && activeAll
          })}
          key="all"
        >
          {menuTitle}
        </Typography>
      );
    }

    const categoryParam = `?query=${querySearch}`;

    return (
      <Link
        to={`/blog${querySearch ? categoryParam : ''}`}
        onClick={() => {
          setCategory('');
          setMeta(defaultMeta);
        }}
        className={styles.filterLink}
        key="all"
        type="link"
      >
        {menuTitle}
      </Link>
    );
  };

  return (
    <aside className={styles.filterContainer}>
      <Typography type="p" variant="h5" className={styles.title}>
        Topics
      </Typography>
      <ul className={styles.categoryList}>
        <li className={styles.categoryItem}>
          {getAllStoriesLink()}
        </li>
        {categoryList.map(category => (
          <li className={styles.categoryItem} key={category.id}>
            {getCategoryLink(category)}
          </li>
        ))}
      </ul>
    </aside>
  );
};

BlogCategories.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.any),
  setCategory: PropTypes.func.isRequired,
  categorySearch: PropTypes.string,
  menuTitle: PropTypes.string,
  setMeta: PropTypes.func.isRequired,
  defaultMeta: PropTypes.shape({}),
  querySearch: PropTypes.string,
  postTag: PropTypes.string,
  hasHighlight: PropTypes.bool,
  isBlogPost: PropTypes.bool,
};

BlogCategories.defaultProps = {
  categoryList: [],
  categorySearch: '',
  menuTitle: '',
  defaultMeta: {},
  querySearch: '',
  postTag: '',
  hasHighlight: true,
  isBlogPost: false,
};

export default BlogCategories;
