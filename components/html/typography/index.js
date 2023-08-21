import React, { forwardRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import internalStyles from './internalStyle.module.scss';

/**
 * Typography guide
 * https://epam.invisionapp.com/d/main#/console/17359958/391146447/preview
 */

const getDefaultVariant = (type) => {
  switch (type) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'p':
      return 'p_body';
    case 'span':
      return 'p_body';
    case 'cite':
      return 'quotes';
    case 'small':
      return 'small_secondary';
    case 'button':
      return 'button';
    default:
      return 'p_body';
  }
};

// eslint-disable-next-line react/display-name
const Typography = forwardRef(({
  children,
  className,
  type,
  variant: variantProp,
  mode,
  ...other
}, ref) => {
  let variant = variantProp;
  if (variantProp === 'inherit') variant = getDefaultVariant(type);
  const styleType = (mode === 'internal') ? internalStyles : styles;
  const Component = type;

  return (
    <Component
      ref={ref}
      className={classNames(
        styleType[variant],
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
  ]),
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'p_body',
    'p_links',
    'small_secondary',
    'small_links',
    'small_tags',
    'small_cards',
    'small_filters',
    'small_forms',
    'quotes',
    'inherit',
    'button',
    'hero_category',
    'hero_home',
    'accent_body',
  ]),
  type: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'p',
    'span',
    'cite',
    'small',
    'label',
    'button',
  ]),
  mode: PropTypes.oneOf(['internal', 'basic', 'external']),
  other: PropTypes.arrayOf(PropTypes.any)
};

Typography.defaultProps = {
  className: '',
  other: [],
  variant: 'inherit',
  type: 'p',
  mode: 'internal',
  children: undefined
};

export default Typography;
