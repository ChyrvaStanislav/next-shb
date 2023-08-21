import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Typography } from 'v2_main/components/html';
import SectionLink from './SectionLink';
import styles from './ContentSectionsNavigation.module.scss';

const Sections = ({
  sections,
  changeSection,
  activeSection
}) => {
  const getSectionLink = section => (
    <SectionLink
      section={section}
      changeSection={changeSection}
    />
  );

  return (
    <aside className={styles.sectionsContainer}>
      <Typography type="p" variant="h5" className={styles.title}>
        In this article
      </Typography>
      <ul className={styles.sectionsList}>
        {sections.map(section => (
          <li className={classNames(styles.sectionsItem, { [styles.active]: activeSection === section.id })} key={section.id}>
            {getSectionLink(section)}
          </li>
        ))}
      </ul>
    </aside>
  );
};

Sections.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.any),
  changeSection: PropTypes.func,
  activeSection: PropTypes.string,
};

Sections.defaultProps = {
  sections: [],
  changeSection: () => {},
  activeSection: null,
};

export default Sections;
