import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Typography } from '@/components/html';
import Link from 'next/link';
// import { ScrollToTopContext } from '../scroll-to-top';
import { SolutionsHubLogo, Checked } from '@/svgComponents';
import LinkedInIcon from '@/images/svg/socials/linkedin_light.svg';
import sortingQueriesConstants from '@/constants/sortingQueries';
import AboutUsLinks from './AboutUsLinks';
import styles from './styles.module.scss';
import Image from "next/image";

const Footer = (props) => {
  const {
    categoryContainer,
    internalCategoryContainer,
    mode,
    types,
    assetTypes,
    licenceTypes
  } = props;
  // const { scrollToTop } = useContext(ScrollToTopContext);
  const newTypes = { ...types };
  const newAssetTypes = { ...assetTypes };

  const assetCategories = [];

  if (mode === 'internal' && internalCategoryContainer?.length > 0) {
    newTypes.title = 'Solution types';
    newAssetTypes.title = 'Asset types';
    assetCategories.push(newAssetTypes);
    assetCategories.push(internalCategoryContainer[0]);
  }

  const allCategories = (mode === 'internal') ? categoryContainer.concat(assetCategories) : categoryContainer;
  const year = new Date().getFullYear();

  const renderLicenceTypes = (name) => (
    <>
      <input type="checkbox" className={styles.checkbox} id={`license-type-${name}`} />
      <label className={styles.categoriesListLabel} htmlFor={`license-type-${name}`}>
        <span className={styles.categoriesListTitle}>
          {licenceTypes.title}
        </span>
        <Checked className={styles.iconBtn} color="#FFFFFF" />
      </label>
      <div className={styles.tagsList}>
        {licenceTypes?.tags?.map(tag => (
          <Link
            key={tag.id}
            // eslint-disable-next-line max-len
            href={`/search?${mode === 'internal'
              ? 'mode=solutions&' : ''}${licenceTypes.id}=${tag.id}&sort=${sortingQueriesConstants.default}`}
            // onClick={scrollToTop}
            className={styles.tagsListItem}
            itemProp="url"
          >
            {tag.label}
          </Link>
        ))}
      </div>
    </>
  );

  return (
    <footer className={styles.footer} itemScope={true} itemType="https://schema.org/WPFooter">
      <div className={classNames(styles.newHubContainer, styles.footerContainer, {
        [styles.footerContainerInternal]: mode === 'internal'
      })}
      >
        <div className={classNames(styles.footerContent, { [styles.footerContentInternal]: mode === 'internal' })}>
          <div className={styles.logo}>
            <SolutionsHubLogo />
          </div>
          <ul className={styles.categoriesList} itemScope={true} itemType="https://schema.org/SiteNavigationElement">
            {
              newTypes
              && (
                <li className={classNames(styles.categoriesListItem, styles.typeBlock)}>
                  <input type="checkbox" className={styles.checkbox} id="type" />
                  <label className={styles.categoriesListLabel} htmlFor="type">
                    <span className={styles.categoriesListTitle}>
                      {newTypes.title}
                    </span>
                    <Checked className={styles.iconBtn} color="#FFFFFF" />
                  </label>
                  <div className={styles.tagsList}>
                    {newTypes?.tags?.map(tag => (
                      <Link
                        key={tag.id}
                          // eslint-disable-next-line max-len
                        href={`/search?${mode === 'internal'
                          ? 'mode=solutions&' : ''}${types.id}=${tag.id}&sort=${sortingQueriesConstants.default}`}
                        // onClick={scrollToTop}
                        className={styles.tagsListItem}
                        itemProp="url"
                      >
                        {tag.label}
                      </Link>
                    ))}
                  </div>
                  { licenceTypes && (
                    <div className={classNames(
                      styles.typeBlock,
                      styles.licenceTypes,
                      styles.desktop,
                      styles.categoriesListItem,
                    )}
                    >
                      {renderLicenceTypes('desktop')}
                    </div>
                  )}
                </li>
              )
            }
            { licenceTypes && (
              <li className={classNames(styles.categoriesListItem, styles.typeBlock, styles.mobile)}>
                { renderLicenceTypes('mobile') }
              </li>
            )}
            {allCategories?.map((category, indexCat) => (
              <li
                key={category.id}
                className={classNames(styles.categoriesListItem, {
                  [styles.categoriesListItemSource]: category.id === 'source-types'
                })}
              >
                <input type="checkbox" className={styles.checkbox} id={`checkbox-${indexCat}`} />
                <label className={styles.categoriesListLabel} htmlFor={`checkbox-${indexCat}`}>
                  <span className={styles.categoriesListTitle}>
                    { category.title }
                  </span>
                  <Checked className={styles.iconBtn} color="#FFFFFF" />
                </label>
                <ul className={styles.tagsList}>
                  { category.tags?.map((tag) => {
                    let link;

                    if (mode === 'internal' && (category.id === 'competency-centers' || category.id === 'types')) {
                      link = `/search?mode=assets&${category.id}=${tag.id}&sort=${sortingQueriesConstants.az}`;
                    } else if (mode === 'internal') {
                      link = `/search?mode=solutions&${category.id}=${tag.id}&sort=${sortingQueriesConstants.default}`;
                    } else {
                      link = `/search?${category.id}=${tag.id}&sort=${sortingQueriesConstants.default}`;
                    }

                    return (
                      <Link
                        key={tag.id}
                        href={link}
                        // onClick={scrollToTop}
                        className={styles.tagsListItem}
                        itemProp="url"
                      >
                        { tag.label }
                      </Link>
                    );
                  }) }
                </ul>
              </li>
            )
            )}
            <AboutUsLinks  mode={mode} />
          </ul>
        </div>
      </div>
      <div className={styles.copyrightContainer}>
        <div className={classNames(styles.newHubContainer, styles.copyrightBlock)}>
          <Typography variant="small_secondary" className={styles.copyright}>
            <span>
              {'© '}
              <span itemProp="copyrightYear">{year}</span>
              {' '}
              <span itemProp="copyrightHolder">EPAM Systems, Inc. </span>
            </span>
            <span itemProp="copyrightNotice" className={styles.copyrightNotice}>All Rights Reserved.</span>
          </Typography>
          <div itemScope={true} itemType="https://schema.org/Organization">
            <a
              href="https://www.linkedin.com/showcase/epam-solutionshub"
              rel="noopener noreferrer"
              target="_blank"
              className={styles.link}
              itemProp="sameAs"
            >
              <Image src={LinkedInIcon} alt="linkedin" className={styles.icon} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const categoryType = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.object),
}));

const typesType = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string
  }))
});

const licenceType = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string
  }))
});

Footer.propTypes = {
  categoryContainer: categoryType,
  internalCategoryContainer: categoryType,
  mode: PropTypes.oneOf(['external', 'internal']),
  types: typesType,
  assetTypes: typesType,
  licenceTypes: licenceType
};

Footer.defaultProps = {
  categoryContainer: [],
  internalCategoryContainer: [],
  mode: 'external',
  types: {},
  assetTypes: {},
  licenceTypes: {}
};

export default Footer;
