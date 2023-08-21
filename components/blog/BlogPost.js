import React, {
  // useState,
  useCallback,
} from 'react';
import isEmpty from 'lodash.isempty';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Markdown, Typography } from '@/components/html';
import TagChip from '@/components/common/tag-chip';
import getPostTypeAndDetails, { getRelatedBlogPostAlt, getImage } from './utils';
import styles from './BlogPost.module.scss';
import Image from 'next/image';

const BlogPost = ({
  post,
  additionalPost,
  mode,
  additionalSolution,
}) => {
  const {
    postType,
    linkSrc,
    date,
    timeToRead,
    title,
    tags,
    image,
    content,
    description,
    imageAlt,
    imageTitle,
  } = getPostTypeAndDetails(post);

  /**
   * @description Remove first title from markdown text:
   * before:
   *    "### What Is Blog
   *    All text from CMS ..."
   *
   * after:
   *    "All text from CMS ..."
   * @param text {string}
   */
  const removeFirstMarkdownTitle = (text) => text?.replace(/^#.*\n/, '');

  // const [tagDots, setTagDots] = useState(false);

  // const wrapperRef = useCallback((node) => {
  //   if (node !== null) {
  //     const containerWidth = node?.clientWidth;
  //     const children = node?.children;
  //     let childrenWidth = 0;
  //     const selectedChildren = [];
  //     const childrenToRemove = [];
  //     for (let i = 0; i < children?.length; i += 1) {
  //       const child = children[i];
  //       const style = getComputedStyle(child);
  //       const widthAndMarginSum = parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10) + child?.clientWidth;
  //       if ((widthAndMarginSum + childrenWidth) <= containerWidth + 2) {
  //         selectedChildren.push(child);
  //         childrenWidth += widthAndMarginSum;
  //       } else {
  //         childrenToRemove.push(child);
  //       }
  //     }
  //
  //     if (!isEmpty(childrenToRemove)) {
  //       // setTagDots(true);
  //       node.replaceChildren(...selectedChildren);
  //     }
  //   }
  // }, []);

  const imgSrc = getImage(image, post?.type, postType);

  return (
    <div className={classNames(styles.postItemsInner, {
      [styles.additionalPost]: additionalPost && mode !== 'solution',
      [styles.additionalPostBlog]: additionalPost && mode === 'blog',
      [styles.relatedSolutionMobileInner]: additionalSolution && mode === 'solution',
      [styles.relatedSolutionDesktopInner]: mode === 'solution'
    })}
    >
      <div className={classNames(styles.postLabel)}>
        <Typography type="p" variant="h4" className={styles.postType}>
          {postType}
        </Typography>
      </div>
      <div className={classNames(styles.imageContainer, styles.moreThenSm,
        {
          [styles.solutionType]: postType === 'Solution',
          [styles.additionalPostImageContainer]: additionalPost || additionalSolution,
        })}
      >
        <div className={styles.imgWrapper}>
          <Link rel="noopener noreferrer" href={linkSrc}>
            <div className={styles.whiteCircle}>
              <Image
                width={300}
                height={200}
                src={imgSrc || ('/src/v2_common/images/UpdateNoImage.webp')}
                alt={imageAlt || getRelatedBlogPostAlt(image, post?.type, title)}
                title={imageTitle || null}
                className={classNames(styles.image, 'blogImage', {
                  [styles.imageAdditional]: additionalPost
                })}
              />
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <Typography
          type={!additionalPost && mode === 'blog' ? 'h2' : 'p'}
          variant={additionalPost ? 'h4' : 'h3'}
          className={classNames(styles.title, styles.titleAdditional)}
        >
          <Link className={styles.link} href={linkSrc}>{title}</Link>
        </Typography>
        { date && (
          <div className={classNames(styles.additionalInfoContainer, { [styles.noTagsUnder]: !tags })}>
            <Typography
              type="span"
              variant="small_secondary"
              className={classNames(styles.date, { [styles.noBorder]: !timeToRead })}
            >
              {date}
            </Typography>
            {timeToRead
              ? (
                <Typography type="span" variant="small_secondary" className={styles.timeRead}>
                  {`${timeToRead} min read`}
                </Typography>
              )
              : null
              }
          </div>
        )
        }
        {content?.[0]?.text && !(additionalPost && postType === 'Blog Post') && (
          <Typography
            type="p"
            variant="p_body"
            className={
              classNames(styles.description, {
                [styles.show]: ['Solution Category', 'Solution'].some(item => item === postType)
              })
            }
          >
            <Markdown
              inlineContainer={true}
              className={styles.blogPostDescriptionMarkdown}
              source={removeFirstMarkdownTitle(content?.[0]?.text?.slice(0, 500))}
              additionalRenderer={{
                name: 'a',
                func: props => (
                  <span>
                    { props?.children }
                  </span>
                )
              }}
            />
          </Typography>
        )}

        {description && additionalPost && !(postType === 'Blog Post') && (
        <Typography
          type="p"
          variant="p_body"
          className={
                  classNames(styles.description, {
                    [styles.show]: ['Solution Category', 'Solution'].some(item => item === postType)
                  })
                }
        >
          {description}
        </Typography>
        )}

        {/*{tags && (*/}
        {/*<div className={styles.tagsContainer}>*/}
        {/*  <div ref={wrapperRef} className={styles.wrapper}>*/}
        {/*    {tags.map(tag => (*/}
        {/*      <TagChip*/}
        {/*        key={tag?.id}*/}
        {/*        className={styles.tagItem}*/}
        {/*        label={tag.label}*/}
        {/*        link={tag?.link ? tag.link : `/blog?category=${tag?.id}`}*/}
        {/*      />*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*  <TagChip*/}
        {/*    // className={classNames(styles.tagItem, styles.dots, { [styles.show]: tagDots })}*/}
        {/*    className={classNames(styles.tagItem, styles.dots)}*/}
        {/*    label="..."*/}
        {/*  />*/}
        {/*</div>*/}
        {/*)}*/}
      </div>
    </div>
  );
};

BlogPost.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.object,
    date: PropTypes.string,
    publishDate: PropTypes.string,
    timeToRead: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _meta: PropTypes.object,
    tags: PropTypes.array,
    type: PropTypes.array,
  }),
  additionalPost: PropTypes.bool,
  mode: PropTypes.string,
  additionalSolution: PropTypes.bool,
};

BlogPost.defaultProps = {
  additionalPost: false,
  mode: '',
  additionalSolution: false,
  post: {
    title: '',
    description: '',
    image: {
      name: '',
    },
    date: '',
    publishDate: '',
    timeToRead: '',
    _meta: {},
    tags: [],
    type: null,
  }
};

export default BlogPost;
