import React, {
  useState, useMemo
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useBreakpoint from 'v2_main/hooks/useBreakpoint';
import { getAltTextFromName, getImageCMS } from 'v2_common/utils/getImageCMS';
import { Typography } from 'v2_main/components/html';
import AssetZoom from 'v2_main/components/common/images/AssetZoom';
import ShareBlock from 'v2_main/components/common/share';
import TagChip from 'v2_main/components/common/tag-chip';
// import RelatedPosts from 'v2_main/components/common/related-posts';
/* eslint-disable-next-line import/no-unresolved */
import LazyLoad from 'react-lazy-load';
import Breadcrumbs from 'v2_main/components/common/breadcrumbs';
import LinkTooltip from 'v2_main/components/link-tooltip';
import { scrollToWithCallback } from 'v2_main/components/solution/utils';
import BlogPostContent from './BlogPostContent';
import styles from './BlogPostBody.module.scss';
import BlogPostAuthor from './BlogPostAuthor';
import ThematicContent from './ThematicContent';
import Subscription from './Subscription';
import ContentSectionsNavigation from './components/ContentSectionNavigation/ContentSectionsNavigation';
import { getHeadersFromMarkdown, generateTextSections } from './utils/markdownUtils';
import Image from "next/image";

const BlogPostBody = ({
  post: {
    title,
    date,
    timeToRead,
    image,
    imageAlt,
    imageTitle,
    content,
    tags,
    seoKeywords,
    isDarkMode,
  },

  relatedPosts,
  authorCard,
  forbiddenZones
}) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md';
  // const [loadedItems] = useState('default');
  // const [activeSection, setActiveSection] = useState();

  const headers = getHeadersFromMarkdown(content);
  const updatedContent = generateTextSections(content, headers);

  const changeSection = (id, callback) => {
    scrollToWithCallback(id, 100, () => {
      callback();
    });
    // setActiveSection(id);
  };
  const noAside = !headers || headers?.length === 0;

  return (
    <>
      <div className={styles.mainContainer} itemScope={true} itemType="https://schema.org/Article">
        <Breadcrumbs
          page="post"
          additionalPath={[{ name: title }]}
          className={classNames(styles.breadcrumbsContainer, { [styles.marginLeft]: noAside })}
        />
        <section className={classNames(styles.contentContainer, { [styles.noAside]: noAside })}>
          {!isMobile && <ContentSectionsNavigation headers={headers} changeSection={changeSection} activeSection={activeSection} />}
          <div>
            <div className={classNames(styles.blogPostheader, { [styles.dark]: isDarkMode })}>
              <section className={styles.headerContainer}>
                <Typography itemProp="headline" type="h1" className={styles.title}>{title}</Typography>
                <div className={styles.additionalInfoContainer}>
                  <div className={styles.blogpostDates}>
                    <Typography itemProp="datePublished" type="span" variant="small_secondary" className={styles.date}>{date}</Typography>
                    <Typography
                      type="span"
                      variant="small_secondary"
                      className={styles.timeRead}
                    >
                      {`${timeToRead} min read`}
                    </Typography>
                  </div>
                  {tags && (
                    <div className={styles.tagsContainer}>
                      {tags.map(tag => (
                        <TagChip
                          key={tag?.id}
                          className={styles.tagItem}
                          label={tag?.label}
                          link={`/blog?category=${tag?.id}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                { tags?.length > 0 ? <meta itemProp="articleSection" content={tags[0]?.label} /> : null }
                { tags?.length > 0 ? <meta itemProp="keywords" content={seoKeywords} /> : null }
                <meta itemType="https://schema.org/Organization" itemProp="author" content={authorCard?.name} />
              </section>
              <AssetZoom image={useMemo(() => image, [])}>
                <figure className={styles.withoutMargin}>
                  <Image
                    className={styles.image}
                    src={getImageCMS(image, '?maxW=1200&qlt=80&fmt=jpg&bg=rgb(255,255,255)')}
                    alt={imageAlt || getAltTextFromName(image.name)}
                    title={imageTitle || null}
                    itemProp="image"
                    width="600"
                    height="300"
                  />
                </figure>
              </AssetZoom>
            </div>
            {isMobile && (
            <ContentSectionsNavigation
              headers={headers}
              changeSection={changeSection}
              activeSection={activeSection}
              isMobile={true}
            />
            )}
            {/*
            Using title here as a simple content update flag
            (used in case of search another blog from blog pages to change content according to the new URL)
            */}
            <BlogPostContent
              content={useMemo(() => updatedContent, [title])}
              setActiveSection={setActiveSection}
              isMobile={isMobile}
            />
            <LazyLoad offset={1000}>
              <>
                <BlogPostAuthor authorCard={authorCard} />
                <div className={classNames({ [styles.shareBlockMargin]: !relatedPosts?.length || loadedItems === 'fail' })}>
                  <ShareBlock
                    title={title}
                  />
                </div>
              </>
            </LazyLoad>
          </div>
        </section>
      </div>
      <LazyLoad offset={1000}>
        <ThematicContent postsId={relatedPosts} />
      </LazyLoad>
      <LinkTooltip />
      <div className={styles.bottomBanner}>
        <Subscription zones={forbiddenZones} />
      </div>
    </>
  );
};

BlogPostBody.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.shape({
      name: PropTypes.string,
    }),
    imageAlt: PropTypes.string,
    imageTitle: PropTypes.string,
    date: PropTypes.string,
    publishDate: PropTypes.string,
    timeToRead: PropTypes.string,
    tags: PropTypes.array,
    isDarkMode: PropTypes.bool
  }),
  relatedPosts: PropTypes.arrayOf(PropTypes.any),
  tagsContainer: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.object)
  }),
  globalVariables: PropTypes.shape({
    keyValuePairs: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string
    })),
  }),
  authorCard: PropTypes.shape({
    avatar: PropTypes.object,
    description: PropTypes.string,
    name: PropTypes.string,
  }),
  forbiddenZones: PropTypes.arrayOf(PropTypes.shape({
    country: PropTypes.string,
  }))
};

BlogPostBody.defaultProps = {
  post: {
    title: '',
    description: '',
    image: {
      name: '',
    },
    imageAlt: '',
    imageTitle: '',
    date: '',
    publishDate: '',
    timeToRead: '',
    tags: [],
    isDarkMode: '',
  },
  relatedPosts: [],
  tagsContainer: {
    tags: []
  },
  globalVariables: {
    keyValuePairs: [{
      key: '',
      value: ''
    }]
  },
  authorCard: {
    avatar: {},
    description: '',
    name: '',
  },
  forbiddenZones: [{}],
};

export default BlogPostBody;
