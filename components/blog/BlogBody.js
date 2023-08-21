import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
/* eslint-disable-next-line import/no-unresolved */
import LazyLoad from 'react-lazy-load';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { getLabel } from 'v2_common/utils/common';
import Breadcrumbs from 'v2_main/components/common/breadcrumbs';
import HeroBanner from 'v2_main/components/common/hero-banner';
import Pagination from 'v2_main/components/common/pagination/Pagination';
import ApiController from 'v2_common/api/index';
import useElasticPagination from 'v2_main/hooks/useElasticPagination';
import SearchResult from 'v2_main/components/common/search/search-result';
import Subscription from 'v2_main/components/blogpost/Subscription';
import BlogPost from './BlogPost';
import BlogCategories from './BlogCategories';
import BlogFilter from './BlogFilter';
import styles from './BlogBody.module.scss';
import NoBlogResultsBanner from './NoBlogResultsBanner';
import BlogPostLoader from './BlogPostLoader';
import ThematicContent from '../blogpost/ThematicContent';

const BlogBody = ({
  setCategory,
  categorySearch,
  pageId,
  globalVariables,
  tagsContainer: { tags },
  banner,
  isAuthorized,
  loading,
  postsCount,
  breakpoint,
  relatedPosts,
  navigate,
  queryPage,
  querySearch,
  setMeta,
  currentCategoryMeta,
  defaultMeta,
  filteredPageBanners,
  getBlogRedirectLink,
}) => {
  const params = useMemo(() => ({ category: categorySearch, size: postsCount, query: querySearch }), [categorySearch, postsCount, querySearch]);

  const categoryParamString = `category=${categorySearch}`;
  const queryParamString = `query=${querySearch}`;
  const additionalQueryParams = categorySearch || querySearch
    ? `${categorySearch ? categoryParamString : ''}${categorySearch && querySearch ? '&' : ''}${querySearch ? queryParamString : ''}`
    : null;

  const {
    data = { blogList: [], total: 0 },
    isLoading,
    page,
    setPage,
    handlePagination
  } = useElasticPagination(pageId, ApiController.getBlogPosts, params, queryPage, additionalQueryParams);

  const location = useLocation();
  /**
   * @description Set pagination page to 1 when user clicks on header link "BLOG" or on active category;
   */
  useEffect(() => {
    if (location?.pathname === '/blog' && !location?.search?.includes('page=')) {
      setPage(0);
    }
  }, [location]);

  // Redirect to '/blog' when user insert in url params incorrect page number
  useEffect(() => {
    const pageCount = Math.ceil(data?.total / postsCount);

    if (queryPage && +queryPage > pageCount) {
      navigate(getBlogRedirectLink(categorySearch, querySearch));
    }
  }, [data]);

  const categoriesMenuTitle = getLabel('Blog Categories Title', globalVariables);
  const bannerItem = filteredPageBanners.find(item => item.id === categorySearch)?.slides[0] || banner;

  const onClearSearch = () => {
    const categoryParam = `?category=${categorySearch}`;
    navigate(`/blog${categorySearch ? categoryParam : ''}`);
  };

  const getItemsCount = () => {
    if (data?.total === 0) {
      return 'No results ';
    }

    return `${data?.total} Blogpost${data?.total === 1 ? '' : 's'}`;
  };

  const getCategoryLabel = (categoryId) => categoryId && tags.find?.(el => el.id === categoryId)?.label;

  return (
    <>
      <HeroBanner
        banner={bannerItem}
        loading={loading}
        isAuthorized={isAuthorized}
        headerClassName={styles.blogHeroHeader}
        bannerClassName={styles.blogBanner}
        imageCarouselClassName={styles.imageCarousel}
        textCarouselClassName={styles.textCarousel}
        meta={currentCategoryMeta}
      />
      <main className={classNames(styles.mainContainer, {
        [styles.withPagination]: data?.total > postsCount,
        [styles.singleChild]: data?.blogList?.length === 1
      })}
      >
        <div className={styles.breadcrumbs}>
          <Breadcrumbs page={pageId} additionalPath={categorySearch ? [{ name: getCategoryLabel(categorySearch), active: false }] : []} />
        </div>
        {querySearch && <SearchResult loading={isLoading} itemsCount={getItemsCount()} onClearSearch={onClearSearch} isBlogPage={true} />}

        <section className={styles.contentContainer}>
          <div className={styles.wrapper}>
            <section className={styles.categorySectionWithSticky}>
              <BlogCategories
                categoryList={tags}
                setCategory={setCategory}
                categorySearch={categorySearch}
                menuTitle={categoriesMenuTitle}
                setMeta={setMeta}
                defaultMeta={defaultMeta}
                querySearch={querySearch}
              />
            </section>
            <section className={styles.categorySection}>
              <BlogCategories
                categoryList={tags}
                setCategory={setCategory}
                categorySearch={categorySearch}
                setMeta={setMeta}
                defaultMeta={defaultMeta}
                menuTitle={categoriesMenuTitle}
                querySearch={querySearch}
              />
            </section>
            <BlogFilter
              categorySearch={categorySearch}
              categoryList={tags}
              setCategory={setCategory}
              menuTitle={categoriesMenuTitle}
              querySearch={querySearch}
            />
          </div>
          {(isLoading) && (
            <div className={styles.postList}>
              <div className={styles.loaderContainer}><BlogPostLoader breakpoint={breakpoint} /></div>
              <div className={styles.loaderContainer}><BlogPostLoader breakpoint={breakpoint} /></div>
              <div className={styles.loaderContainer}><BlogPostLoader breakpoint={breakpoint} /></div>
              <div className={styles.loaderContainer}><BlogPostLoader breakpoint={breakpoint} /></div>
            </div>
          )}
          {!isLoading && data?.total === 0 && querySearch && <NoBlogResultsBanner searchText={querySearch} />}
          {!isLoading && data?.total > 0 && (
          <div className={styles.postList}>
            {data?.blogList?.map(post => (
              <div className={styles.postListItem} key={post._meta.deliveryId}>
                <BlogPost post={post}  breakpoint={breakpoint} mode="blog" />
              </div>
            ))}
          </div>
          )}
        </section>
        {
          data.total > postsCount && !isLoading && (
            <div className={styles.paginationContainer}>
              <Pagination
                pageCount={Math.ceil(data?.total / postsCount)}
                page={page}
                handlePageChange={handlePagination}
                pageId={pageId}
                additionalQueryParams={categorySearch ? `category=${categorySearch}` : null}
              />
            </div>
          )
        }
      </main>
      <LazyLoad offset={1000}>
        <ThematicContent relatedPosts={relatedPosts} withBottomPadding={true} />
      </LazyLoad>
      <div className={styles.bottomBanner}>
        <Subscription zones={globalVariables?.forbiddenZones} />
      </div>
    </>
  );
};

BlogBody.propTypes = {
  categorySearch: PropTypes.string,
  setCategory: PropTypes.func.isRequired,
  pageId: PropTypes.string.isRequired,
  globalVariables: PropTypes.shape({
    keyValuePairs: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string
    })),
  }),
  tagsContainer: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })),
  }),
  isAuthorized: PropTypes.bool,
  loading: PropTypes.bool,
  banner: PropTypes.shape({
    title: PropTypes.string,
  }),
  relatedPosts: PropTypes.arrayOf(PropTypes.any),
  postsCount: PropTypes.number,
  breakpoint: PropTypes.string,
  queryPage: PropTypes.string,
  querySearch: PropTypes.string,
  setMeta: PropTypes.func,
  currentCategoryMeta: PropTypes.shape({}),
  defaultMeta: PropTypes.shape({}),
  filteredPageBanners: PropTypes.arrayOf(PropTypes.object),
  getBlogRedirectLink: PropTypes.func,
};

BlogBody.defaultProps = {
  categorySearch: null,
  globalVariables: { keyValuePairs: [] },
  tagsContainer: {
    tags: [],
  },
  isAuthorized: false,
  loading: false,
  banner: {},
  postsCount: 3,
  breakpoint: 'xl',
  queryPage: null,
  querySearch: null,
  relatedPosts: [],
  setMeta: () => {},
  currentCategoryMeta: null,
  defaultMeta: null,
  filteredPageBanners: [],
  getBlogRedirectLink: () => '/blog',
};

export default BlogBody;
