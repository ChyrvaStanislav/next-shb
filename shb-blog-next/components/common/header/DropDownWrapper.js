/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';
import sortingQueriesConstants from '../../../../v2_common/constants/sortingQueries';
import TagsList from './TagsList';
import styles from './HeaderNavigation.module.scss';

const DropDownWrapper = (props) => {
  const {
    title, categories, mode, onCloseDropDown, types, menuTitle, licenceTypes
  } = props;
  const isAssetsDropDown = menuTitle.toLowerCase() === 'assets';

  const getLinkParams = () => {
    const params = mode === 'internal' ? `${title?.toLowerCase()?.includes('asset') ? 'mode=assets' : 'mode=solutions'}` : '';
    const sort = mode === 'internal'
      ? `${title?.toLowerCase()?.includes('asset') ? sortingQueriesConstants.az : sortingQueriesConstants.default}`
      : sortingQueriesConstants.default;

    return params ? `${params}&sort=${sort}` : `sort=${sort}`;
  };

  return (
    <div className={classNames(styles.internalDropDown)}>
      <div
        className={classNames(styles.dropDownMenu, styles.active, {
          [styles.dropDownCollapse]: mode === 'external',

        }, styles.dropActiveMd)}
      >
        <div className={styles.dropDownWithOpenSource}>
          {types && menuTitle.toLowerCase() !== 'assets'
          && (
            <TagsList
              styleMode="solutions"
              mode={mode}
              category={types}
              onCloseDropDown={onCloseDropDown}
            />
          )}
          {licenceTypes && menuTitle.toLowerCase() !== 'assets'
          && (
            <TagsList
              styleMode="solutions"
              mode={mode}
              category={licenceTypes}
              onCloseDropDown={onCloseDropDown}
            />
          )}
        </div>
        {categories?.map(category => (
          <TagsList
            styleMode={`${title?.toLowerCase().includes('asset') ? 'assets' : 'solutions'}`}
            mode={mode}
            category={category}
            key={category?.id}
            onCloseDropDown={onCloseDropDown}
          />
        ))}
        <div className={styles.viewAll}>
          <Link
            href={`/search?${getLinkParams()}`}
            onClick={onCloseDropDown}
            className={`${isAssetsDropDown ? 'viewAllAssetsDropDownLink' : 'viewAllSolutionsDropDownLink'}`}
            itemProp="url"
          >
            View All
            {` ${menuTitle}`}
          </Link>
        </div>
      </div>
    </div>
  );
};

DropDownWrapper.propTypes = {
  title: PropTypes.string,
  types: PropTypes.objectOf(PropTypes.any),
  licenceTypes: PropTypes.objectOf(PropTypes.any),
  categories: PropTypes.arrayOf(PropTypes.object),
  mode: PropTypes.oneOf(['external', 'internal']),
  onCloseDropDown: PropTypes.func,
  menuTitle: PropTypes.string,
};

DropDownWrapper.defaultProps = {
  title: '',
  categories: [],
  types: {},
  mode: 'external',
  onCloseDropDown: () => { },
  menuTitle: '',
  licenceTypes: {}
};

export default DropDownWrapper;
