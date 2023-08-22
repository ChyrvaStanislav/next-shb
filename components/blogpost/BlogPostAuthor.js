import React from 'react';
import PropTypes from 'prop-types';
import { getImageCMS } from '@/utils/getImageCMS';
import styles from './BlogPostAuthor.module.scss';
import Image from "next/image";

const BlogPostAuthor = ({ authorCard }) => {
  const authorImage = getImageCMS(authorCard?.avatar);

  if (!authorCard?.name || !authorCard?.description) {
    return null;
  }

  return (
    <section
      className={styles.blogPostAuthorWrapper}
      itemScope={true}
      itemType="https://schema.org/Person"
    >
      <meta itemProp="author" content={authorCard?.name} />
      <div className={styles.blogPostAuthorInner}>
        <div className={styles.blogPostAuthorImageWrapper}>
          <div className={styles.blogPostAuthorImage}>
            <Image src={authorImage} alt={authorCard?.name} width={48} height={48} />
          </div>
        </div>
        <div className={styles.blogPostAuthorTextWrapper}>
          <div className={styles.blogPostAuthorTitle}>{authorCard?.name}</div>
          <div className={styles.blogPostAuthorInfo}>{authorCard?.description}</div>
        </div>
      </div>
    </section>
  );
};



BlogPostAuthor.propTypes = {
  authorCard: PropTypes.shape({
    avatar: PropTypes.object,
    description: PropTypes.string,
    name: PropTypes.string,
  })
};

BlogPostAuthor.defaultProps = {
  authorCard: {
    avatar: {},
    description: '',
    name: '',
  }
};

export default BlogPostAuthor;
