import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';
import classNames from 'classnames';
import { Typography, Markdown } from '@/components/html';
// import LoadingHandler from '@/components/common/loading-handler';
// import HeroLoader from '@/components/common/loaders/common/HeroLoader';
import styles from './styles.module.scss';
import Picture from './Picture';

const HeroBanner = (props) => {
  const {
    banner,
    loading,
    isAuthorized,
    headerClassName,
    bannerClassName,
    textCarouselClassName,
    imageCarouselClassName,
    loadingClassName,
    authorizedClassName,
    descriptionClassName,
    meta,
  } = props;

  return (
    <section className={classNames(styles.heroBanner, bannerClassName, {
      [styles.heroBannerBg]: !loading,
      [styles.heroBannerBgLoading]: loading,

    })}
    >
      {/*<LoadingHandler*/}
      {/*  loading={isEmpty(banner) || loading}*/}
      {/*  loader={() => (*/}
      {/*    <div className={classNames(styles.loadingSection,*/}
      {/*      loadingClassName,*/}
      {/*      {*/}
      {/*        [styles.authorized]: isAuthorized,*/}
      {/*        [authorizedClassName]: isAuthorized*/}
      {/*      })}*/}
      {/*    >*/}
      {/*      <div className={styles.loader}>*/}
      {/*        <HeroLoader color="dark_grey2" />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*>*/}
        <div className={styles.heroBannerWrapper}>
          <div className={classNames(styles.heroTextCarousel, textCarouselClassName)}>
            <div className={classNames(styles.heroTextCarouselInner, styles.active)}>
              <Typography type="h1" className={classNames(styles.heroTitle, headerClassName)}>
                {!isEmpty(banner) && banner.title}
              </Typography>
              { !isEmpty(banner) && banner.description && (
              <Markdown className={classNames(styles.heroText, styles.markdown, descriptionClassName)} source={banner.description} />
              )}
              {meta ? <meta itemProp="description" content={meta?.description} /> : null}
            </div>
          </div>
          <div className={styles.heroImageCarousel}>
            <Picture image={banner} imageCarouselClassName={imageCarouselClassName} width={568} height={170} />
          </div>
        </div>
      {/*</LoadingHandler>*/}
    </section>
  );
};

HeroBanner.propTypes = {
  banner: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string
  }),
  loading: PropTypes.bool,
  isAuthorized: PropTypes.bool,
  headerClassName: PropTypes.string,
  bannerClassName: PropTypes.string,
  imageCarouselClassName: PropTypes.string,
  textCarouselClassName: PropTypes.string,
  loadingClassName: PropTypes.string,
  authorizedClassName: PropTypes.string,
  descriptionClassName: PropTypes.string,
  meta: PropTypes.shape({}),
};

HeroBanner.defaultProps = {
  banner: {},
  loading: true,
  isAuthorized: false,
  headerClassName: '',
  bannerClassName: 'cc-banner',
  imageCarouselClassName: '',
  textCarouselClassName: '',
  loadingClassName: '',
  authorizedClassName: '',
  descriptionClassName: '',
  meta: null,
};

export default HeroBanner;
