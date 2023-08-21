"use client"

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './styles.module.scss';

const TagChip = ({
  mode,
  className,
  label,
  link,
  ref,
}) => (
  <Link
    ref={ref}
    href={link}
    target="_blank"
    className={classNames(styles.greyChip, className, 'blogTagChip', {
      [styles.blueChip]: mode === 'blue',
    })}
  >
    {label}
  </Link>
);

TagChip.propTypes = {
  mode: PropTypes.oneOf(['grey', 'blue']),
  className: PropTypes.string,
  label: PropTypes.string,
  link: PropTypes.string,
  ref: PropTypes.shape({
    current: PropTypes.node
  }),
};

TagChip.defaultProps = {
  mode: 'grey',
  className: '',
  label: '',
  link: '',
  ref: {
    current: null
  },
};

export default TagChip;
