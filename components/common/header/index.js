import React, { useContext } from 'react';
import classNames from 'classnames';
// import { getCookie } from '../../../utils/cookieHelper';
// import SearchField from '../search-field';
// import AuthButton from '../auth-button';
import Link from 'next/link';
// import UserControl from '../header/user';
// import { getTags } from '../search-field/utils';
// import EngModeContext from 'v2_main/context/eng-mode-context/EngModeContext';
import HeaderNavigation from './HeaderNavigation';
// import AnalyticsLink from './AnalyticsLink';
import styles from './styles.module.scss';
import logo from '@/images/Logo-SolutionsHub.svg'
import Image from 'next/image'
import PropTypes from "prop-types";

const Header = ({
  children,
  categories,
  internalCategories,
  mode,
  pageId,
  globalVariables,
  queryString,
  types,
  assetTypes,
  licenceTypes,
}) => {

  // const { engMode } = useContext(EngModeContext);
  const engMode = false;
  // const accessAnalytics = getCookie('accessAnalytics');
  // const showAnalytics = mode === 'internal' && accessAnalytics && accessAnalytics !== 'undefined' && JSON.parse(accessAnalytics) === true;

  return (
    <header className={classNames(styles.header, { [styles.engMode]: engMode })} itemScope={true} itemType="https://schema.org/WPHeader">
      <div className={classNames(styles.mainContainer, styles.headerContainer)}>
        <div className={styles.row}>
          <div className={styles.logo}>
            <Link className="mainLogo" href="/" itemProp="image">
              <Image
                src={logo}
                alt="Logo SolutionsHub"
                width="172"
                height="20"
              />
            </Link>
          </div>
          <HeaderNavigation
            categories={categories}
            internalCategories={internalCategories}
            mode={mode}
            pageId={pageId}
            globalVariables={globalVariables}
            queryString={queryString}
            types={types}
            assetTypes={assetTypes}
            licenceTypes={licenceTypes}
            engMode={engMode}
          />
          {/*<SearchField*/}
          {/*  authorized={mode === 'internal'}*/}
          {/*  tags={getTags(categories)}*/}
          {/*  assetTags={getTags(internalCategories)}*/}
          {/*  globalVariables={globalVariables}*/}
          {/*  withAnalytics={showAnalytics}*/}
          {/*  types={types}*/}
          {/*  assetTypes={assetTypes}*/}
          {/*  engMode={engMode}*/}
          {/*/>*/}
          {/*{showAnalytics ? <AnalyticsLink /> : null}*/}
          {/*{mode === 'external' ? <AuthButton /> : <UserControl />}*/}
        </div>
      </div>
      {children}
    </header>
  );
};

Header.propTypes = {
  children: PropTypes.node,
  categories: PropTypes.arrayOf(PropTypes.object),
  types: PropTypes.objectOf(PropTypes.any),
  licenceTypes: PropTypes.objectOf(PropTypes.any),
  assetTypes: PropTypes.objectOf(PropTypes.any),
  internalCategories: PropTypes.arrayOf(PropTypes.object),
  mode: PropTypes.oneOf(['external', 'internal']),
  pageId: PropTypes.string,
  globalVariables: PropTypes.shape({
    keyValuePairs: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    })),
  }),
  queryString: PropTypes.string
};

Header.defaultProps = {
  children: null,
  categories: [],
  internalCategories: [],
  types: {},
  licenceTypes: {},
  assetTypes: {},
  mode: 'external',
  pageId: '',
  globalVariables: { keyValuePairs: [] },
  queryString: ''
};

export default Header;
