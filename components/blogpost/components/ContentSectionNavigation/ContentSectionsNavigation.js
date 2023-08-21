import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Sections from './Sections';
import styles from './ContentSectionsNavigation.module.scss';

const ContentSectionsNavigation = ({
  headers, changeSection, activeSection, isMobile
}) => {
  if (!headers || headers?.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <section className={classNames({ [styles.contentSectionWithSticky]: !isMobile, [styles.contentSectionMobile]: isMobile })}>
        <Sections
          sections={headers}
          changeSection={changeSection}
          activeSection={activeSection}
        />
      </section>
    </div>
  );
};

ContentSectionsNavigation.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.any),
  changeSection: PropTypes.func,
  activeSection: PropTypes.string,
  isMobile: PropTypes.bool,
};

ContentSectionsNavigation.defaultProps = {
  headers: [],
  changeSection: () => {},
  activeSection: '',
  isMobile: false,
};

export default ContentSectionsNavigation;
