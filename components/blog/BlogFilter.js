import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'v2_main/components/html';
import styles from './BlogBody.module.scss';
import 'v2_main/components/common/form-components/Select.scss';

const BlogFilter = ({
  categorySearch,
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
      const categoryParam = `?query=${querySearch}`;
      navigate(`/blog${querySearch ? categoryParam : ''}`);
    } else {
      setCategory(option.value);
      const categoryAdditionalParam = `&query=${querySearch}`;
      navigate(`/blog?category=${option.value}${querySearch ? categoryAdditionalParam : ''}`);
    }
  };

  const currentValue = filtersArr?.find(filter => filter?.value === categorySearch) || filtersArr[0];

  return (
    <div className={styles.filterButton}>
      <Typography type="p" variant="h5" className={styles.title}>
        Displayed Topics
      </Typography>
      <div className="react-select">
        <Select
          name="Cat"
          placeholder="Categories"
          onChange={option => changeValue(option)}
          options={filtersArr}
          value={currentValue}
          classNamePrefix="react-select"
          isSearchable={false}
        />
      </div>
    </div>
  );
};

BlogFilter.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.any),
  setCategory: PropTypes.func.isRequired,
  categorySearch: PropTypes.string,
  menuTitle: PropTypes.string,
  querySearch: PropTypes.string,
};

BlogFilter.defaultProps = {
  categoryList: [],
  categorySearch: '',
  menuTitle: '',
  querySearch: null,
};

export default BlogFilter;
