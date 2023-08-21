import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'v2_main/components/html';
import styles from './BlogPostFilter.module.scss';
import 'v2_main/components/common/form-components/Select.scss';

const BlogPostFilter = ({
  setCategory,
  categoryList,
  menuTitle,
  querySearch,
}) => {
  const navigate = useNavigate();
  const categoriesArr = [...categoryList];
  const filtersArr = categoriesArr?.map(cat => ({
    label: cat?.label,
    value: cat?.id,
  }));
  filtersArr.unshift({
    label: menuTitle,
    value: menuTitle,
  });

  const changeValue = (option) => {
    if (option.value === menuTitle) {
      setCategory('');
      const queryParam = `?query=${querySearch}`;
      navigate(`/blog${querySearch ? queryParam : ''}`);
    } else {
      setCategory(option.value);
      const queryAdditionalParam = `&query=${querySearch}`;
      navigate(`/blog?category=${option.value}${querySearch ? queryAdditionalParam : ''}`);
    }
  };

  return (
    <div className={styles.filterButton}>
      <Typography type="p" variant="h5" className={styles.title}>
        Topics
      </Typography>
      <div className="react-select">
        <Select
          name="Cat"
          placeholder="Topics"
          onChange={option => changeValue(option)}
          options={filtersArr}
          value=""
          classNamePrefix="react-select"
          isSearchable={false}
        />
      </div>
    </div>
  );
};

BlogPostFilter.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.any),
  setCategory: PropTypes.func,
  menuTitle: PropTypes.string,
  querySearch: PropTypes.string,
};

BlogPostFilter.defaultProps = {
  categoryList: [],
  menuTitle: '',
  querySearch: '',
  setCategory: () => {},
};

export default BlogPostFilter;
