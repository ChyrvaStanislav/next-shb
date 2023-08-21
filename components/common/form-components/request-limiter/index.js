import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '../../../html';
import styles from './styles.module.scss';

const RequestLimiter = (props) => {
  const { type, onFormClose, isSpecificSolution } = props;
  const typeStylesMap = {
    default: '',
    subscribe: styles.rootSubscribe,
    faq: styles.rootFaq,
    review: styles.review
  };

  return (
    <div className={classNames(styles.root, typeStylesMap[type])}>
      <div className={styles.requestLimiterIcon}>
        <span />
        <span />
      </div>

      <p className={styles.requestLimiterHeading}>
        {isSpecificSolution
          ? 'You have previously requested the selected solution'
          : 'You have reached our daily limit for submit actions'
        }
      </p>
      <p className={classNames(styles.requestLimiterDescription, { [styles.requestLimiterDescriptionSpecificSolution]: isSpecificSolution })}>
        {isSpecificSolution
          ? 'We are working on your request and will contact you soon.'
          : 'Try to submit your request next day.'
        }
      </p>

      { type === 'default' && <Button className={styles.requestLimiterButton} onClick={onFormClose}>Continue Exploring</Button> }
    </div>
  );
};

RequestLimiter.propTypes = {
  type: PropTypes.string,
  onFormClose: PropTypes.func,
  isSpecificSolution: PropTypes.bool,
};

RequestLimiter.defaultProps = {
  type: 'default',
  onFormClose: () => {},
  isSpecificSolution: false,
};

export default RequestLimiter;
