import React from 'react';
import PropTypes from 'prop-types';
import { getAltTextFromName, getImageCMS } from 'v2_common/utils/getImageCMS';
import classNames from 'classnames';
import styles from './ThematicContent.module.scss';
import getPostTypeAndDetails from '../blog/utils';
import ThematicTagsContainer from './ThematicTagsContainer';

const ThematicContentPost = ({ post }) => {
  const {
    postType,
    linkSrc,
    date,
    timeToRead,
    title,
    tags,
    image,
    description,
    secondName,
    imageAlt,
    logoSrc,
    logoAlt,
  } = getPostTypeAndDetails(post);

  const SOLUTION_TYPE = 'Solution';

  return (
    <div className={styles.thematicContentPostsItem}>
      <div className={styles.thematicContentPostsItemInner}>
        <div className={classNames(styles.thematicContentPostsItemImage,
          { [styles.solutionType]: postType === SOLUTION_TYPE })}
        >
          <div className={classNames(styles.thematicContentImageWrapper,
            { [styles.solutionType]: postType === SOLUTION_TYPE })}
          >
            <a rel="noopener noreferrer" href={linkSrc}>
              <div className={styles.thematicContentPostsItemImageInner}>
                <img
                  src={getImageCMS(image) || logoSrc || ('/src/v2_common/images/thematic-default.jpg')}
                  alt={imageAlt || getAltTextFromName(image?.name) || logoAlt}
                  width="951"
                  height="224"
                />
              </div>
            </a>
          </div>
        </div>
        <div className={styles.thematicContentPostsItemInfo}>
          <div className={styles.thematicContentPostsItemPostType}>
            {postType}
          </div>
          {postType === 'Blog Post' || postType === 'Update Post'
            ? (
              <div className={classNames(styles.thematicContentPostsItemPostTitle, styles.thematicContentPostsItemPostTitleBlog)}>
                <a rel="noopener noreferrer" href={linkSrc}>{title}</a>
              </div>
            )
            : (
              <div className={styles.thematicContentPostsItemPostTitle}>
                <a rel="noopener noreferrer" href={linkSrc}>{title}</a>
              </div>
            )
          }
          { date && (
          <div className={styles.thematicContentPostsItemPostDate}>
            <div className={styles.thematicContentPostsItemPostDateLeft}>{date}</div>
            {timeToRead
              ? (
                <div className={styles.thematicContentPostsItemPostDateRight}>
                  {`${timeToRead} min read`}
                </div>
              )
              : null
            }
          </div>
          )
          }
          {postType === SOLUTION_TYPE
            ? (
              <div className={styles.thematicContentPostsItemPostDescr}>
                {secondName}
              </div>
            )
            : null
          }
          {postType === 'Blog Post' || postType === 'Update Post' || postType === 'Solution Category'
            ? (
              <div className={classNames(styles.thematicContentPostsItemPostDescr, styles.thematicContentPostsItemPostDescrBlog,
                {
                  [styles.thematicContentPostsItemPostDescrSolutionCategory]: postType === 'Solution Category',
                }
              )}
              >
                {description}
              </div>
            )
            : null
          }
          {tags && (
          <div className={styles.thematicContentPostsItemPostTags}>
            <ThematicTagsContainer tags={tags} />
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

ThematicContentPost.propTypes = {
  post: PropTypes.shape({
    postType: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    secondName: PropTypes.string,
    image: PropTypes.shape(PropTypes.object),
    imageAlt: PropTypes.string,
    date: PropTypes.string,
    publishDate: PropTypes.string,
    timeToRead: PropTypes.string,
    linkSrc: PropTypes.string,
    _meta: PropTypes.shape(PropTypes.object),
    tags: PropTypes.arrayOf(PropTypes.object),
    type: PropTypes.arrayOf(PropTypes.object),
  }),
};

ThematicContentPost.defaultProps = {
  post: {
    postType: '',
    title: '',
    description: '',
    secondName: '',
    image: {
      name: '',
    },
    imageAlt: '',
    date: '',
    publishDate: '',
    timeToRead: '',
    linkSrc: '',
    _meta: {},
    tags: [],
    type: null,
  },
};

export default ThematicContentPost;
