import React from 'react';
import PropTypes from 'prop-types';
import { Link, Typography } from '@/components/html';
import classNames from 'classnames';
import styles from './CategoryLink.module.scss';

const CategoryLink = ({
  category, setCategory, style, setMeta, querySearch, isActive
}) => {
  if (isActive) {
    return (
      <Typography
        variant="p_links"
        className={classNames(style, styles.link2, `topic${category?.label?.replace(/ /g, '')}`)}
        key={`${category?.id}-link`}
      >
        {category?.label}
      </Typography>
    );
  }

  const categoryAdditionalParam = `&query=${querySearch}`;

  return (
    <Link
      href={`/${category?.id}${querySearch ? categoryAdditionalParam : ''}`}
      onClick={() => {
        setCategory(category?.id);
        if (category?.meta) {
          setMeta(category.meta);
        }
      }}
      className={classNames(style, styles.link2, `topic${category?.label?.replace(/ /g, '')}`)}
      key={`${category?.id}-link`}
      type="link"
      data-testid="category-link"
    >
      {category?.label}
    </Link>
  );
};
CategoryLink.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  }),
  setCategory: PropTypes.func,
  style: PropTypes.string.isRequired,
  setMeta: PropTypes.func.isRequired,
  querySearch: PropTypes.string,
  isActive: PropTypes.bool,
};

CategoryLink.defaultProps = {
  category: {
    id: '',
    label: '',
  },
  setCategory: () => {},
  querySearch: null,
  isActive: false,
};

export default CategoryLink;
