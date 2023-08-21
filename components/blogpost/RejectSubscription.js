import React from 'react';
import PropTypes from 'prop-types';
import styles from './Subscription.module.scss';

const RejectSubscription = ({ zones }) => {
  let countriesText = zones?.map(item => item?.country).join(', ');
  countriesText = countriesText.replace(
    `, ${zones[zones.length - 1]?.country}`,
    ` and ${zones[zones.length - 1]?.country}`
  );

  return (
    <div className={styles.root}>
      <div className={styles.warningIcon}>
        <span />
        <span />
      </div>

      <p className={styles.rejectMessageHeading}>
        Your request has been rejected
      </p>
      <p className={styles.rejectMessageDescription}>
        Your subscription has been rejected due to EPAM not performing any services and/or offering products to users
        from
        {' '}
        {countriesText}
        .
      </p>
    </div>
  );
};

RejectSubscription.propTypes = {
  zones: PropTypes.arrayOf(PropTypes.shape({
    country: PropTypes.string,
  })),
};

RejectSubscription.defaultProps = {
  zones: [{}],
};

export default RejectSubscription;
