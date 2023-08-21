import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { Markdown } from '@/components/html';
// eslint-disable-next-line import/no-unresolved
// import LazyLoad from 'react-lazy-load';
import uniqid from 'uniqid';
import BlogPostAdvertising from './BlogPostAdvertising';
import TextSection from './TextSection';
import ImageComponent from './ImageComponent';
import styles from './BlogPostContent.module.scss';

const BlogPostContent = ({
  content, mode, setActiveSection
}) => (
  <div className={styles.contentContainer} itemProp="articleBody">
    {content?.map(contentItem => (
      <Fragment key={uniqid()}>
        {/*{contentItem?.textSections?.map(section => (*/}
        {/*  <TextSection*/}
        {/*    section={section}*/}
        {/*    mode={mode}*/}
        {/*    setActiveSection={setActiveSection}*/}
        {/*  />*/}
        {/*))}*/}

        <Markdown source={contentItem.text} />
        {contentItem?.image && (
          <figure className={styles.imageFigure}>
            <ImageComponent
              image={contentItem.image}
              imageAlt={contentItem.imageAlt}
              imageTitle={contentItem.imageTitle}
              mode={mode}
            />
            {contentItem?.caption && (
            <figcaption>
              <Markdown
                linkNofollow={true}
                linkTarget="_blank"
                inlineContainer={true}
                source={contentItem?.caption}
                withTooltip={true}
                className={styles.markdown}
              />
            </figcaption>
            )}
          </figure>
        )}
        {contentItem?.adverisingBlock?.solutionName && (
          // <LazyLoad offset={600} width="100%">
            <BlogPostAdvertising data={contentItem?.adverisingBlock} />
          // </LazyLoad>
        )}
      </Fragment>
    ))}
  </div>
);

BlogPostContent.propTypes = {
  content: PropTypes.arrayOf(PropTypes.any).isRequired,
  mode: PropTypes.oneOf(['blog', 'update']),
};

BlogPostContent.defaultProps = {
  mode: 'blog',
};

export default memo(BlogPostContent);
