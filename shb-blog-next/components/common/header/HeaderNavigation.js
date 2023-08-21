"use client";

import React, {
  createRef, useState, useEffect
} from 'react';
import { useClickAway } from 'react-use';
import { enableBody, disableBody } from '../../../../v2_main/components/common/form-components/modal/utils';
import PropTypes from 'prop-types';
import NavLink from 'next/link';
import classNames from 'classnames';
import DropDownWithCategories from './DropDownWithCategories';
import styles from './HeaderNavigation.module.scss';

const HeaderNavigation = (props) => {
  const {
    categories, internalCategories, mode, pageId, globalVariables, queryString, types, assetTypes, licenceTypes, engMode
  } = props;
  const mainContainer = createRef();
  const [open, setOpen] = useState(false);
  const onCloseNavigation = () => {
    setOpen(false);
    enableBody();
  };

  useClickAway(mainContainer, () => {
    setOpen(false);
  });

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  useEffect(() => {
    if (open) {
      disableBody();
    }

    return () => enableBody();
  }, [open]);

  const onBlur = ({ relatedTarget }) => {
    const target = relatedTarget || document.activeElement;

    if (!mainContainer.current.contains(target)) onCloseNavigation();
  };

  const assetCategories = [];
  if (internalCategories?.length > 0) {
    assetCategories.push(assetTypes);
    assetCategories.push(internalCategories[0]);
  }

  return (
    <nav
      className={styles.mainMenu}
      ref={mainContainer}
      tabIndex={0} //eslint-disable-line
      onBlur={onBlur}
      itemScope={true}
      itemType="https://schema.org/SiteNavigationElement"
    >
      <input className={styles.subMenuBtn} type="checkbox" id="subMenuBtn" />
      <label //eslint-disable-line
        onClick={() => {
          if (!open === false) {
            enableBody();
          }
          setOpen(!open);
        }}
        className={classNames(styles.subMenuIcon, { [styles.subMenuIconActive]: open })}
        htmlFor="subMenuBtn"
        data-testid="mobileMenuBtn"
      >
        <span className={styles.navicon} />
      </label>
      <div
        className={classNames(styles.mainSubMenu, {
          [styles.mainSubMenuInternal]: mode === 'internal',
          [styles.subMenuActive]: open,
          [styles.engMode]: engMode,
        })}
        data-testid="mobileMenu"
      >
        <DropDownWithCategories
          onCloseMainDropdown={onCloseNavigation}
          internalCategories={categories}
          mode={mode}
          pageId={pageId}
          globalVariables={globalVariables}
          menuTitle="Solutions"
          queryString={queryString}
          types={types}
          licenceTypes={licenceTypes}
        />
        {mode === 'internal' && (
          <DropDownWithCategories
            onCloseMainDropdown={onCloseNavigation}
            internalCategories={assetCategories}
            mode={mode}
            pageId={pageId}
            globalVariables={globalVariables}
            menuTitle="Assets"
            queryString={queryString}
            licenceTypes={licenceTypes}
          />
        )}
        <div className={classNames(styles.mainSubMenulist, 'blogMenuItem')}>
          <NavLink
            className={({ isActive }) => classNames(
              styles.mainSubMenuItemName,
              { [styles.active]: isActive },
              'blogMenuLink'
            )}
            href="/blog"
            onClick={onCloseNavigation}
            itemProp="url"
          >
            Blog
          </NavLink>
        </div>
        <div className={classNames(styles.mainSubMenulist, 'faqMenuItem')}>
          <NavLink
            className={({ isActive }) => classNames(
              styles.mainSubMenuItemName,
              { [styles.active]: isActive },
              'faqMenuLink'
            )}
            href="/faq"
            onClick={onCloseNavigation}
            itemProp="url"
          >
            FAQ
          </NavLink>
        </div>
        <div className={classNames(styles.mainSubMenulist, 'whatsNewMenuItem')}>
          <NavLink
            className={({ isActive }) => classNames(
              styles.mainSubMenuItemName,
              { [styles.active]: isActive },
              'whatsNewMenuLink'
            )}
            href="/whatsnew"
            onClick={() => setOpen(false)}
            itemProp="url"
            data-testid="whatsNewLink"
          >
            What&apos;s new
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

HeaderNavigation.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  internalCategories: PropTypes.arrayOf(PropTypes.object),
  types: PropTypes.objectOf(PropTypes.any),
  licenceTypes: PropTypes.objectOf(PropTypes.any),
  assetTypes: PropTypes.objectOf(PropTypes.any),
  mode: PropTypes.oneOf(['external', 'internal']),
  pageId: PropTypes.string,
  globalVariables: PropTypes.shape({
    keyValuePairs: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    })),
  }),
  queryString: PropTypes.string,
  engMode: PropTypes.bool,
};

HeaderNavigation.defaultProps = {
  categories: [],
  internalCategories: [],
  types: {},
  licenceTypes: {},
  assetTypes: {},
  mode: 'external',
  pageId: '',
  globalVariables: { keyValuePairs: [] },
  queryString: '',
  engMode: false,
};

export default HeaderNavigation;
