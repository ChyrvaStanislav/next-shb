import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from 'v2_main/components/html';
import { kebabCase } from 'lodash';
import classNames from 'classnames';
import BlogPost from 'v2_main/components/blog/BlogPost';
import styles from './AdditionalBlogPost.module.scss';
import BlogPostRelatedContentLoaders from '../common/loaders/related-posts/BlogPostRelatedContentLoaders';

const AdditionalBlogPost = ({
  posts,
  mode,
  schema,
  breakpoint,
  className,
  isLoading,
}) => (
  <section className={classNames({
    [styles.bgGrey]: schema === 'grey'
  })}
  >
    <div className={classNames(styles.mainContainer, className, {
      [styles.relatedSolutionMobileWrapper]: mode === 'solution'
    })}
    >
      <div className={styles.container}>
        {mode !== 'solution' && (
          <Typography
            type="p"
            variant="h2"
            className={classNames(styles.headerContainer, {
              [styles.headerContainerHome]: mode === 'home',
              [styles.headerContainerBlog]: mode === 'blog',
            })}
          >
            {mode === 'home' ? 'Recommended' : 'Related'}
            {' '}
            Content
          </Typography>
        )}
        <section className={classNames(styles.contentContainer, {
          [styles.relatedSolutionMobile]: mode === 'solution'
        })}
        >
          { isLoading && <BlogPostRelatedContentLoaders /> }
          { !isLoading && posts?.map(post => (
            <BlogPost
              key={kebabCase(`${post.title}_blogpost`)}
              mode={mode}
              post={post}
              additionalPost={true}
              additionalSolution={true}
              breakpoint={breakpoint}
            />
          ))}
        </section>
        {!['solution', 'blog'].some(item => mode === item) && (
          <footer className={styles.footerContainer}>
            <Button
              to="/blog"
              rel="noopener noreferrer"
              className={classNames(styles.btn, 'GoToAllArticles')}
            >
              Go to all articles
            </Button>
          </footer>
        )}
      </div>
    </div>
  </section>
);

AdditionalBlogPost.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  mode: PropTypes.oneOf(['blog', 'home', 'solution']),
  schema: PropTypes.oneOf(['white', 'grey']),
  breakpoint: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

AdditionalBlogPost.defaultProps = {
  mode: 'blog',
  schema: 'white',
  breakpoint: 'xl',
  className: '',
  isLoading: false,
};

export default AdditionalBlogPost;
