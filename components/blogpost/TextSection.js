import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import IntersectionContext from 'v2_main/context/intersection-context/IntersectionContext';
// import useIntersect from 'v2_main/hooks/useIntersect';
import { Markdown } from '../html';
import styles from './BlogPostContent.module.scss';

const TextSection = ({
  setActiveSection, section, mode
}) => {
  // const { intersectionStop } = useContext(IntersectionContext);
  // const [ref, entry] = useIntersect({
  //   rootMargin: '-50% 0px -50% 0px',
  //   threshold: 0,
  // });

  // useEffect(() => {
  //   if (entry && entry.isIntersecting && !intersectionStop && section?.id && section?.label) {
  //     setActiveSection(section?.id);
  //   }
  // }, [entry]);

  return useMemo(() => (
    <Markdown
      ref={ref}
      withCode={true}
      withTooltip={true}
      linkNofollow={true}
      source={section.text}
      linkTarget="_blank"
      className={classNames(styles.markdown, {
        [styles.markdownUpdate]: mode === 'update'
      })}
      additionalRenderer={{
        name: 'h2',
        func: (props) => (
          <h2
            id={section?.id}
          >
            {props?.children}
          </h2>
        )

      }}
    />
  ), [section?.text]);
};

TextSection.propTypes = {
  setActiveSection: PropTypes.func,
  section: PropTypes.objectOf(PropTypes.any),
  mode: PropTypes.oneOf(['blog', 'update']),
};

TextSection.defaultProps = {
  setActiveSection: () => {},
  section: {},
  mode: 'blog',
};
export default TextSection;
