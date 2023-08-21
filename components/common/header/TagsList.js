/* eslint-disable jsx-a11y/no-noninteractive-element-interactions,max-len */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import classNames from 'classnames';
import sortingQueriesConstants from '@/constants/sortingQueries';
import styles from './HeaderNavigation.module.scss';

const TagsList = ({
  category, onCloseDropDown, mode, styleMode
}) => {
  const { title, id, tags } = category;
  const [open, setOpen] = useState(false);

  return (
    <div
      className={classNames(styles.dropDownMenuItems, {
        [styles.dropDownMenuItemsActive]: open
      })}
      data-testid="dropdownMenuItems"
    >
      <p
        className={styles.dropDownMenuGroupTitle}
        onClick={() => setOpen(!open)}
      >
        <span className={styles.menuArrow}>{title}</span>
      </p>
      <ul>
        {Array.isArray(tags) && tags.map(tag => {
          const linkMode = `${mode === 'internal' ? `${styleMode.includes('assets') ? 'mode=assets&' : 'mode=solutions&'}` : ''}`;
          const linkSort = `${mode === 'internal' ? `${styleMode.includes('assets') ? sortingQueriesConstants.az : sortingQueriesConstants.default}` : sortingQueriesConstants.default}`;

          return (
            <Fragment key={tag.id}>
              <li className={styles.dropDownMenuSubGroupItem} key={tag.id}>
                <Link
                  href={`/search?${linkMode}${id}=${tag.id}&sort=${linkSort}`}
                  onClick={onCloseDropDown}
                  className={classNames(tag.label.split(' ').join('-').toLowerCase())}
                  itemProp="url"
                >
                  { tag.label }
                </Link>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </div>

  );
};

TagsList.propTypes = {
  category: PropTypes.objectOf(PropTypes.any).isRequired,
  onCloseDropDown: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['internal', 'external']).isRequired,
  styleMode: PropTypes.oneOf(['assets', 'solutions']).isRequired,
};

export default TagsList;
