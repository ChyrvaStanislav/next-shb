import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'v2_main/components/html';
import classNames from 'classnames';
import styles from './CategoryPostLink.module.scss';

const CategoryPostLink = ({
  category, setCategory, style, setMeta, querySearch
}) => {
  const queryParam = `&query=${querySearch}`;

  return (
    <Link
      href={`/blog?category=${category?.id}${querySearch ? queryParam : ''}`}
      onClick={() => {
        setCategory(category?.id);
        if (category?.meta) {
          setMeta(category.meta);
        }
      }}
      className={classNames(style, styles.link2, `topic${category.label.replace(/ /g, '')}`)}
      key={`${category?.id}-link`}
      type="link"
    >
      {category?.label}
    </Link>
  );
};

CategoryPostLink.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  setCategory: PropTypes.func,
  style: PropTypes.string.isRequired,
  setMeta: PropTypes.func.isRequired,
  querySearch: PropTypes.string,
};

CategoryPostLink.defaultProps = {
  setCategory: () => {},
  querySearch: null,
};

export default CategoryPostLink;
