import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ApiController from 'v2_common/api';
import { checkValidEmail } from 'v2_common/utils/common';
import { ArrowIcon } from 'v2_common/svgComponents';
import { Link, Typography } from 'v2_main/components/html';
import Preloader from 'v2_main/components/common/preloader/Preloader';
import AppContext from 'v2_main/context/appContext';
import SnackbarContext from 'v2_main/context/snackbar-context/SnackbarContext';
import { isFormSubmitDisabled, setFormSubmitCounter } from 'v2_common/utils/spamProtection';
import RequestLimiter from 'v2_main/components/common/form-components/request-limiter';
import checkIfForbiddenZone from 'v2_common/utils/checkIfForbiddenZone';
import { getToken } from 'v2_common/utils/cookieHelper';
import RejectSubscription from './RejectSubscription';
import styles from './Subscription.module.scss';

const Subscription = ({ mode, zones }) => {
  const [emailValue, setEmailValue] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [error, setError] = useState('');
  const [successScreen, setSuccessScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [badRequest, setBadRequest] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const { accessToken } = getToken();

  const { formSubmissionLimit, globalVariables } = useContext(AppContext);
  const { setSnackbarOpen } = useContext(SnackbarContext);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isForbidden, setIsForbidden] = useState(false);

  /**
   * @param value {String}
   * @param validate {Boolean} - if we need to instant validate (used in blur handler)
   */
  const validateEmail = (value, validate = false) => {
    if (isTouched || validate) {
      if (!value) {
        setError('');
        setIsValidEmail(true);
      }
      if (value && checkValidEmail(value)) {
        setError('');
        setIsValidEmail(true);
      }
      if (value && !checkValidEmail(value)) {
        setError('Please enter a valid email');
        setIsValidEmail(false);
      }
    }
  };

  const handleChange = (event) => {
    setBadRequest(false);
    const { target: { value } } = event;
    setEmailValue(value);
    validateEmail(value);
  };

  const handleBlur = (event) => {
    if (!isTouched) {
      setIsTouched(true);
      const { target: { value } } = event;
      validateEmail(value, true);
    }
  };

  const sendRequest = () => {
    setIsSubmitDisabled(isFormSubmitDisabled(+formSubmissionLimit));

    if (isFormSubmitDisabled(+formSubmissionLimit)) {
      return;
    }

    setLoading(true);
    ApiController.sendQuestionForm({
      subscriberEmail: emailValue,
      formType: 'subscribe',
    })
      .then(({ data }) => {
        if (data === 'ok') {
          const forbidden = checkIfForbiddenZone(globalVariables?.forbiddenZones, emailValue);
          if (forbidden) {
            setIsForbidden(true);
          } else {
            setSuccessScreen(true);
            setIsValidEmail(true);
          }
          setError('');
          setFormSubmitCounter(+formSubmissionLimit, () => {});
        }
        if (data === 'duplicate') {
          setError('Email has already been registered');
          setIsValidEmail(false);
        }
        if (data === 'error') {
          setError('Something went wrong');
          setBadRequest(true);
        }
      })
      .catch(() => {
        setBadRequest(true);
        setError('Something went wrong');
        setSnackbarOpen(true);
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailValue && checkValidEmail(emailValue)) {
      sendRequest();
    } else {
      setError('Please enter a valid email');
      setIsValidEmail(false);
    }
  };

  return (
    <section className={styles.bgSubscription}>
      { isSubmitDisabled && <RequestLimiter type="subscribe" /> }
      <div className={classNames(styles.newHubContainer, {
        [styles.container]: !successScreen,
        [styles.containerSuccess]: successScreen,
        [styles.containerPost]: !successScreen && mode === 'post',
        [styles.forbidden]: isForbidden,
      })}
      >
        {isForbidden ? <RejectSubscription zones={zones} /> : null}
        {successScreen ? (
          <>
            <div className={styles.SuccessScreenIcon} />
            <Typography type="p" variant="h2" className={classNames(styles.successTitle, 'SubscribeSuccessScreenGA')}>
              You have been successfully subscribed
            </Typography>
          </>
        ) : (
          <>
            <Typography type="p" variant="h2" className={styles.title}>
              Want to subscribe to our updates?
            </Typography>
            <Typography type="p" className={styles.caption}>
              Sign up with your email to get the latest news
            </Typography>
            <form className={styles.form} onSubmit={e => e.preventDefault()}>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  value={emailValue}
                  onChange={e => handleChange(e)}
                  onBlur={e => handleBlur(e)}
                  className={classNames(styles.emailInput, 'subscribeInputEmail', {
                    [styles.emailInputError]: emailValue && !isValidEmail
                  })}
                  placeholder="Enter email"
                />

                <button
                  type="button"
                  className={classNames(styles.buttonSubmit, 'subscribeSendButton', {
                    [styles.buttonSubmitDisable]: !emailValue || (emailValue && !isValidEmail),
                    [styles.loading]: loading
                  })}
                  onClick={e => handleSubmit(e)}
                  disabled={!emailValue || (emailValue && !isValidEmail)}
                >
                  {loading ? <Preloader color="white" size="small" /> : (
                    <>
                      <ArrowIcon className={styles.arrowIcon} />
                      <span className={styles.buttonCaption}>Subscribe</span>
                    </>
                  )}
                </button>
              </div>
              {((emailValue && !isValidEmail) || badRequest) && <Typography type="p" className={styles.errorMessage}>{error}</Typography>}
            </form>

            { !accessToken && (
            <p className={classNames(styles.privacyPolicy, { [styles.privacyPolicyError]: ((emailValue && !isValidEmail) || badRequest) })}>
              By providing personal information I consent to EPAM Systems, Inc. processing my personal information as set out in the
              {' '}
              <Link type="Link" to="/privacy-policy" target="_blank">SolutionsHub Privacy Policy</Link>
              {' '}
              and outside of my home jurisdiction.
            </p>
            )}
          </>
        )}
      </div>
    </section>
  );
};

Subscription.propTypes = {
  mode: PropTypes.oneOf(['basic', 'post']),
  zones: PropTypes.arrayOf(PropTypes.shape({
    country: PropTypes.string,
  })),
};

Subscription.defaultProps = {
  mode: 'basic',
  zones: [{}],
};

export default Subscription;
