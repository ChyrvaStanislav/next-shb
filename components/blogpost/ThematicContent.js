'use client'

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';
import ApiController from '@/api';
import classNames from 'classnames';
import styles from './ThematicContent.module.scss';
import ThematicContentPost from './ThematicContentPost';
import ThematicContentPostLoader from './ThematicContentPostLoader';

const ThematicContent = ({ postsId, relatedPosts, withBottomPadding }) => {
  const [posts, setPosts] = useState(relatedPosts || []);
  const [isLoading, setIsLoading] = useState(false);

  console.log(relatedPosts)

  useEffect(() => {
    if (!relatedPosts) {
      (async () => {
        try {
          setIsLoading(true);
          const promisesArray = postsId?.map(({ id }) => ApiController.getPart(`recommended/${id}`));
          const results = await Promise.allSettled(promisesArray);
          const data = results?.map(({
            status,
            value
          }) => (status === 'fulfilled' ? value?.data?.content : null));
          const filteredData = data?.filter(item => item);
          setPosts(filteredData);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.error(`from ThematicContent: ${error}`);
          }
        }
      })();
    }
  }, [relatedPosts]);

  if (!isLoading && isEmpty(posts)) {
    return null;
  }


  return (
    <section className={classNames(styles.thematicContent, { [styles.bottomPadding]: withBottomPadding })}>
      <div className={styles.thematicContentWrapper}>
        <div className={styles.thematicContentTitle}>Thematic Content</div>
        {(isLoading) && (
          <ThematicContentPostLoader />
        )}
        {!isLoading && (
        <div className={styles.thematicContentPosts}>
          {posts?.map(post => (
            <ThematicContentPost post={post} key={post._meta?.deliveryKey} />
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

ThematicContent.propTypes = {
  postsId: PropTypes.arrayOf(PropTypes.any),
  post: PropTypes.shape({
    _meta: PropTypes.shape(PropTypes.object),
  }),
  relatedPosts: PropTypes.arrayOf(PropTypes.any),
  withBottomPadding: PropTypes.bool,
};

ThematicContent.defaultProps = {
  postsId: null,
  post: {
    _meta: {},
  },
  relatedPosts: null,
  withBottomPadding: false,
};

export default ThematicContent;
