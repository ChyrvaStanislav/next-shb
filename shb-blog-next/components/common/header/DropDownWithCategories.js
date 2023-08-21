import React, { createRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useBreakpoint from '@/hooks/useBreakpoint';
// import { getLabel } from '@/utils/common';
import DropDownWrapper from './DropDownWrapper';
import styles from './HeaderNavigation.module.scss';

const DropDownWithCategories = (props) => {
  const {
    internalCategories, mode, pageId, onCloseMainDropdown, globalVariables, menuTitle, queryString, types, licenceTypes
  } = props;
  const mainContainer = createRef();
  const breakpoint = useBreakpoint();
  const [open, setOpen] = useState(false);

  const query = new URLSearchParams(queryString);
  const queryParamMode = query.get('mode');

  useEffect(() => {
    if (menuTitle === 'Solutions') {
      setOpen(['xs', 'sm', 'md'].some(bp => bp === breakpoint));
    }
  }, [breakpoint]);

  const onBlur = ({ relatedTarget }) => {
    const target = relatedTarget || document.activeElement;

    if (
      !mainContainer.current.contains(target)
      && ['lg', 'xl'].some(bp => bp === breakpoint)
    ) {
      setOpen(false);
    }
  };

  const dropDownTitle = menuTitle.toLowerCase() === 'assets'
    ? getLabel('\'Epam Assets\' Label For Header Dropdown', globalVariables)
    : getLabel('\'Solutions\' Label For Header Dropdown', globalVariables);

  const isAssetsDropDown = menuTitle.toLowerCase() === 'assets';

  return (
    <div
      className={classNames(styles.mainSubMenulist, styles.mainWithSubMenulist, styles.assetDropDown, {
        [styles.mainSubMenulistInternal]: mode === 'internal',
        [styles.mainSubMenulistActive]: open,
        [`${styles.solutionDropDown} headerMenuSolution`]: !isAssetsDropDown,
        [`${styles.assetDropDownWrapper} headerMenuAsset`]: isAssetsDropDown,
      })}
      ref={mainContainer}
        tabIndex={0} //eslint-disable-line
      onBlur={onBlur}
      data-testid="navigationDropdown"
    >
      <button
        type="button"
        className={classNames(styles.mainSubMenuItemName, {
          [styles.activeHighlight]: pageId === 'search' && (queryParamMode === menuTitle.toLowerCase()),
          [`${styles.solutionDropDown} headerMenuDropDownSolution`]: !isAssetsDropDown,
          [`${styles.assetDropDownWrapper} headerMenuDropDownAsset`]: isAssetsDropDown,
        })}
        onClick={() => setOpen(!open)}
        data-testid="navigationDropdownToggle"
      >
        <span
          className={classNames(styles.menuArrow,
            isAssetsDropDown ? 'headerMenuDropDownAsset' : 'headerMenuDropDownSolution',
            { [styles.active]: open })}
        >
          {menuTitle}
        </span>
      </button>
      <div
        className={classNames({
          [styles.internalDropDownWrapper]: mode === 'internal',
          [styles.internalDropDownSolutionWrapper]: !isAssetsDropDown,
          [styles.dropDownMenu]: mode === 'external',
          [styles.active]: open
        })}
        data-testid="collapsableDropdownPart"
      >
        <DropDownWrapper
          title={dropDownTitle}
          img={menuTitle.toLowerCase() === 'assets' ? '/src/v2_common/images/Assets.svg' : '/src/v2_common/images/Solutions.svg'}
          categories={internalCategories}
          mode={mode}
          globalVariables={globalVariables}
          menuTitle={menuTitle}
          types={types}
          licenceTypes={licenceTypes}
          onCloseDropDown={() => {
            onCloseMainDropdown();
            setOpen(false);
          }}
        />
        <span className={styles.internalDropDownClose} onClick={() => setOpen(false)} data-testid="dropdownCloseBtn" />
      </div>
    </div>
  );
};

DropDownWithCategories.propTypes = {
  onCloseMainDropdown: PropTypes.func,
  internalCategories: PropTypes.arrayOf(PropTypes.object),
  types: PropTypes.objectOf(PropTypes.any),
  licenceTypes: PropTypes.objectOf(PropTypes.any),
  mode: PropTypes.oneOf(['external', 'internal']),
  pageId: PropTypes.string,
  menuTitle: PropTypes.string,
  globalVariables: PropTypes.shape({
    keyValuePairs: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    })),
  }),
  queryString: PropTypes.string
};

DropDownWithCategories.defaultProps = {
  onCloseMainDropdown: () => { },
  internalCategories: [],
  types: {},
  mode: 'external',
  pageId: '',
  menuTitle: '',
  globalVariables: { keyValuePairs: [] },
  queryString: '',
  licenceTypes: {}
};

export default DropDownWithCategories;
