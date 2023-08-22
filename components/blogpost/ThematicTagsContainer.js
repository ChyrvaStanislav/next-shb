import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import styles from './ThematicContent.module.scss';
import TagChip from '../common/tag-chip';

const ThematicTagsContainer = ({ tags }) => {
  const containerRef = useRef(null);
  const blockRef = useRef(null);
  const [containerTags, setContainerTags] = useState(tags);
  const [width, setWidth] = useState({ container: 0, block: 0 });
  const [isSpliced, setIsSpliced] = useState(false);

  useEffect(() => {
    const handleResize = debounce(() => {
      setWidth({
        container: containerRef.current?.getBoundingClientRect().width,
        block: blockRef.current?.getBoundingClientRect().width,
      });
    }, 200);

    if (containerRef.current && blockRef.current && tags?.length > 1) {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef.current, blockRef.current, tags]);


  useEffect(() => {
    if (tags.length <= 2) {
      return;
    }

    const tagWidthDivider = 121;

    if (width.block && width.container && width.block >= width.container - 30) {
      const tagCount = Math.floor((width.container) / tagWidthDivider);

      setIsSpliced(true);
      const splicedTags = [...tags].splice(0, tagCount);
      const remainderTag = {
        id: 'dots',
        label: '...',
      };
      setContainerTags([...splicedTags, remainderTag]);
    } else if (isSpliced) {
      const tagCount = Math.floor((width.container) / tagWidthDivider);

      if (tagCount >= tags.length) {
        setContainerTags([...tags]);
        setIsSpliced(false);
      } else {
        setIsSpliced(true);
        const splicedTags = [...tags].splice(0, tagCount);
        const remainderTag = {
          id: 'dots',
          label: '...',
        };
        setContainerTags([...splicedTags, remainderTag]);
      }
    }
  }, [width]);

  return (
    <div className={styles.thematicContentPostsItemPostTags}>
      {containerTags && (
      <div ref={containerRef} className={styles.tagsContainer}>
        <div ref={blockRef} className={styles.tagsContainerWrapper}>
          {containerTags?.map(tag => (
            <TagChip
              key={tag?.id}
              className={classNames(styles.tagItem, { [styles.dots]: tag?.id === 'dots', [styles.notCut]: containerTags.length <= 2 })}
              label={tag.label}
              link={tag?.link ? tag.link : `/blog?category=${tag?.id}`}
              isNotCut={containerTags.length <= 2}
              isTitle={true}
            />
          ))}
        </div>
      </div>
      )}
    </div>
  );
};

ThematicTagsContainer.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    id: PropTypes.string,
  })),
};
ThematicTagsContainer.defaultProps = {
  tags: []
};

export default ThematicTagsContainer;
