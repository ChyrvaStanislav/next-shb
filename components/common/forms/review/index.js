import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Formik, Form, Field } from 'formik';
import { format } from 'date-fns';
import InputText from 'v2_main/components/common/form-components/input-text';
import Textarea from 'v2_main/components/common/form-components/textarea';
import Checkbox from 'v2_main/components/common/form-components/checkbox';
import Recaptcha from 'v2_main/components/common/form-components/recaptcha';
import { Button, Link } from 'v2_main/components/html';
import ApiController from 'v2_common/api';
import AppContext from 'v2_main/context/appContext';
import SnackbarContext from 'v2_main/context/snackbar-context/SnackbarContext';
import { isFormSubmitDisabled, setFormSubmitCounter } from 'v2_common/utils/spamProtection';
import RequestLimiter from 'v2_main/components/common/form-components/request-limiter';
import { getToken } from 'v2_common/utils/cookieHelper';
import Preloader from 'v2_main/components/common/preloader/Preloader';
import StarSelection from './StarSelection';
import {
  initialValues, validationSchema, validationSchemaAnonymous
} from './utils';
import styles from './styles.module.scss';
import { getMultiTypeLogoSrc } from '../../utils';
import { getLogoSrc } from '../../../../../v2_common/utils/solutions';
import Image from "next/image";

const ReviewForm = ({
  solution,
  formId,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState(validationSchema);
  const [formSent, setFormSent] = useState(false);
  const [rate, setRate] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { formSubmissionLimit } = useContext(AppContext);
  const { setSnackbarOpen } = useContext(SnackbarContext);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(isFormSubmitDisabled(+formSubmissionLimit));
  const { accessToken } = getToken();

  if (formSent) {
    return (
      <div className={styles.ratingForm}>
        <div className={styles.ratingFormSuccess}>
          <Image src="/src/v2_common/images/rating-form-success.png" alt="rating suceess" />
          <div className={styles.ratingFormSuccessText}>Your review has been submitted</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.ratingForm}>
      { isSubmitDisabled && <RequestLimiter type="review" /> }
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        isInitialValid={schema.isValidSync(initialValues)}
        onSubmit={(fields) => {
          if (isSubmitDisabled) {
            return;
          }

          setLoading(true);
          const {
            requestorName,
            headline,
            isAnonymous: anonymous,
            captchaResponse,
            reviewText,
          } = fields;

          const date = Date.now();
          const reviewDate = format(date, 'LLLL d, yyyy');

          const addHttps = url => (url.startsWith('https:') ? url : `https:${url}`);
          let logoUrl;

          if (solution?.logo) {
            logoUrl = getLogoSrc(solution?.logo, { width: 250 });
          } else if (solution?.type?.length > 1) {
            logoUrl = getMultiTypeLogoSrc(solution.type, { width: 250, isWebp: false });
          } else if (solution?.type) {
            logoUrl = getLogoSrc(solution.type[0].typeIcon || solution.type[0].typeIcon, { width: 250 });
          }

          const body = {
            deliveryKey: solution?._meta?.deliveryKey,
            date: reviewDate,
            name: anonymous ? 'Anonymous' : requestorName,
            mark: rate,
            headline,
            reviewText,
            captchaResponse,
            solutionDescription: solution?.shortDescription,
            solutionUrl: window?.location?.href,
            solutionName: solution?.name,
            logoUrl: addHttps(logoUrl),
          };

          ApiController.sendReviewForm(body)
            .then(() => {
              setFormSent(true);
              setLoading(false);
              setFormSubmitCounter(+formSubmissionLimit, setIsSubmitDisabled);
            }).catch(() => {
              setLoading(false);
              setSnackbarOpen(true);
            });
        }}
      >
        {
          ({
            setFieldValue, setFieldError, setFieldTouched, validateForm
          }) => (
            <Form>
              <div>
                <div className={styles.ratingFormRate}>
                  <span>*</span>
                  Rate your experience
                </div>
                <div className={styles.ratingFormStars}>
                  <div className={styles.ratingStarsVisualization}>
                    <Field
                      component={() => (
                        <div className={styles.starsRow}>
                          <StarSelection
                            // rate={hoverState.entered ? hoverState.rate : rate}
                            rate={rate}
                            handleStarClick={(index) => {
                              setFieldTouched('rate', '');
                              setFieldValue('rate', index + 1);
                              setRate(index + 1);
                            }}
                          />
                        </div>
                      )}
                      name="rate"
                      required={true}
                      type="number"
                      formId={formId}
                      className={styles.ratingFormFirstName}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.ratingFormElements}>
                <div className={styles.ratingFormElementsLeft}>
                  <Field
                    component={InputText}
                    name="requestorName"
                    label="Your Name"
                    required={true}
                    placeholder="Text"
                    type="text"
                    formId={formId}
                    className={styles.ratingFormFirstName}
                    disabled={isAnonymous}
                  />
                  <Field
                    component={Checkbox}
                    name="isAnonymous"
                    id="isAnonymous"
                    text="Submit as anonymous"
                    formId={formId}
                    className={styles.ratingFormCheckbox}
                    onChange={(value) => {
                      setFieldValue('requestorName', '');
                      setFieldError('requestorName', '');
                      setFieldTouched('requestorName', '');
                      setIsAnonymous(!!value);
                      setSchema(value ? validationSchemaAnonymous : validationSchema);

                      setTimeout(() => { validateForm(); }, 200);
                    }}
                  />
                  { !accessToken && (
                    <p className={styles.ratingFormText}>
                      By providing personal information I consent to EPAM Systems, Inc. processing my personal information as set out in the
                      {' '}
                      <Link type="Link" target="_blank" href="/privacy-policy">SolutionsHub Privacy Policy</Link>
                      {' '}
                      and outside of my home jurisdiction.
                    </p>
                  )}
                  <Field
                    component={Recaptcha}
                    name="captchaResponse"
                    formId={formId}
                    className={styles.ratingFormCaptchaDesktop}
                  />
                </div>
                <div className={styles.ratingFormElementsRight}>
                  <Field
                    component={InputText}
                    name="headline"
                    label="Add a headline"
                    placeholder="Text"
                    type="text"
                    formId={formId}
                    className={styles.ratingFormFirstHeadline}
                    isCounter={true}
                    maxLength={100}
                  />
                  {/* <div className={styles.ratingFormCount}>0/1500</div> */}
                  <Field
                    component={Textarea}
                    name="reviewText"
                    label="Add a review"
                    placeholder="Pros/Cons"
                    formId={formId}
                    className={styles.ratingFormFirstTextaria}
                    maxLength={3000}
                    isCounter={true}
                  />
                  {/* <div className={styles.ratingFormCount}>0/3000</div> */}
                  <Field
                    component={Recaptcha}
                    name="captchaResponse"
                    formId={formId}
                    className={styles.ratingFormCaptchaMobile}
                  />
                  <div className={styles.ratingFormBtns}>
                    <Field name="button">
                      {({ form }) => (
                        <Button
                          type="primary"
                          buttonType="submit"
                          disabled={loading || isSubmitDisabled}
                          className={classNames(styles.ratingFormSubmit, 'ratingFormSubmitBtn', {
                            [styles.loadingBtn]: loading,
                            [styles.disabled]: !form.isValid || loading || isSubmitDisabled,
                          })}
                        >
                          {loading ? <Preloader color="white" size="small" /> : 'Submit Review' }
                        </Button>
                      )}
                    </Field>
                    <Button
                      type="outline"
                      onClick={onClose}
                      className={classNames(styles.ratingFormCancel, 'ratingFormCancelBtn')}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )
        }
      </Formik>
    </div>
  );
};

ReviewForm.propTypes = {
  formId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  solution: PropTypes.shape({
    _meta: PropTypes.any,
  }).isRequired
};

export default ReviewForm;
