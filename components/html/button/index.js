import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './styles.module.scss';

function getType(href, to, elementType) {
  let type = 'button';
  if (href) {
    type = 'a';
  } else if (to) {
    type = Link;
  } else if (elementType === 'span') {
    type = 'span';
  }

  return type;
}

const Button = ({
  href,
  to,
  children,
  type,
  size,
  className,
  elementType,
  disabled,
  buttonType,
  ...other
}) => {
  const Type = getType(href, to, elementType);
  const listClassName = classNames(
    styles.button,
    [styles[type]],
    [styles[size]],
    {
      [styles.disabled]: disabled
    },
    className,
  );

  if (disabled) {
    return <span className={listClassName}>{children}</span>;
  }

  return (
    <Type
      className={listClassName}
      href={href}
      href={to}
      type={buttonType}
      {...other}
    >
      {children}
    </Type>
  );
};

Button.propTypes = {
  href: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium']),
  elementType: PropTypes.oneOf(['span', 'button']),
  type: PropTypes.oneOf(['primary', 'secondary', 'outline', 'link']),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.string,
    PropTypes.arrayOf([
      PropTypes.node,
      PropTypes.func,
      PropTypes.string,
    ])
  ]).isRequired,
  buttonType: PropTypes.string,
};

Button.defaultProps = {
  href: undefined,
  className: '',
  size: 'medium',
  elementType: 'button',
  to: undefined,
  disabled: false,
  type: 'primary',
  buttonType: 'submit',
};

export default Button;
