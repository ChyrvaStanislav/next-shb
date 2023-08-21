import React, { forwardRef } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const Typography = forwardRef(({
  children,
  className,
  type,
  mode,
  variant: variantProp,
  ...other
}, ref) => {
  let variant = variantProp;

  if (variantProp === 'inherit') variant = 'p_links';
  const Component = type === 'a' ? type : Link;

  return (
    <Component
      ref={ref}
      className={classNames(
        styles[variant],
        className,
      )}
      {...other}
    >
      {children}
    </Component>
  );
});

Typography.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'p_links',
    'small_links',
    'internal_list_link',
    'inherit',
  ]),
  type: PropTypes.oneOf([
    'a',
    'link'
  ]),
  mode: PropTypes.oneOf([
    'basic',
    'external'
  ]),
  other: PropTypes.arrayOf(PropTypes.any)
};

Typography.defaultProps = {
  className: '',
  other: [],
  type: 'a',
  variant: 'inherit',
  mode: 'basic',
};

export default Typography;
