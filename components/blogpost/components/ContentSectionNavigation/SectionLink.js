import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import IntersectionContext from 'v2_main/context/intersection-context/IntersectionContext';
import styles from './ContentSectionsNavigation.module.scss';

const SectionLink = ({
  section,
  changeSection,
}) => {
  const { setIntersectionStop } = useContext(IntersectionContext);

  return (
    <div
      onClick={() => {
        setIntersectionStop(true);
        changeSection(section.id, () => {
          setIntersectionStop(false);
        });
      }}
      className={styles.link}
      key={`${section?.id}-link`}
    >
      {section?.label?.replace(/\*/g, '')}
    </div>
  );
};

SectionLink.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
};

export default SectionLink;
