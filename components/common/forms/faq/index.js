import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Formik, Form, Field } from 'formik';
import InputText from 'v2_main/components/common/form-components/input-text';
import Textarea from 'v2_main/components/common/form-components/textarea';
import Checkbox from 'v2_main/components/common/form-components/checkbox';
import Recaptcha from 'v2_main/components/common/form-components/recaptcha';
import { Button, Link } from 'v2_main/components/html';
import ApiController from 'v2_common/api/index';
import Preloader from 'v2_main/components/common/preloader/Preloader';
import AppContext from 'v2_main/context/appContext';
import SnackbarContext from 'v2_main/context/snackbar-context/SnackbarContext';
import { isFormSubmitDisabled, setFormSubmitCounter } from 'v2_common/utils/spamProtection';
import RequestLimiter from 'v2_main/components/common/form-components/request-limiter';
import { getToken } from 'v2_common/utils/cookieHelper';
import { initialValues, validationSchema, validationSchemaWithEmail } from './utils';
import styles from './styles.module.scss';

const FormComponent = ({
  solution,
  setFormSent,
  formId,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState(validationSchema);
  const { formSubmissionLimit } = useContext(AppContext);
  const { setSnackbarOpen } = useContext(SnackbarContext);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(isFormSubmitDisabled(+formSubmissionLimit));
  const { accessToken } = getToken();

  return (
    <div className={styles.formContainer}>
      { isSubmitDisabled && <RequestLimiter type="faq" /> }
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
            question,
            requestorEmail,
            captchaResponse
          } = fields;

          ApiController.sendQuestionForm({
            requestorName,
            question,
            requestorEmail,
            solutionId: solution?._meta?.deliveryId,
            captchaResponse,
            solutionUrl: `${window.location.origin}/solution/${solution?._meta?.deliveryKey}`
          })
            .then(() => {
              setFormSent();
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
            setFieldValue, setFieldError, setFieldTouched, validateForm, values
          }) => (
            <Form>
              <div className={styles.row}>
                <div className={styles.leftContainer}>
                  <Field
                    component={InputText}
                    name="requestorName"
                    label="Full Name"
                    required={true}
                    placeholder="Required"
                    type="text"
                    formId={formId}
                    classNameWrapper={styles.commonMarginBottom}
                  />
                  <Field
                    component={Checkbox}
                    name="confirm"
                    id="confirm"
                    text="I want to be notified about response"
                    formId={formId}
                    classNameWrapper={styles.confirmContainer}
                    className={styles.checkbox}
                    onChange={(value) => {
                      setFieldValue('requestorEmail', '');
                      setFieldError('requestorEmail', '');
                      setFieldTouched('requestorEmail', '');
                      setSchema(value ? validationSchemaWithEmail : validationSchema);

                      setTimeout(() => { validateForm(); }, 200);
                    }}
                  />
                  <Field
                    component={InputText}
                    name="requestorEmail"
                    label="Email"
                    required={values.confirm}
                    placeholder="Required"
                    type="email"
                    formId={formId}
                    disabled={!values.confirm}
                    classNameWrapper={styles.commonMarginBottom}
                  />

                  { !accessToken && (
                  <p className={styles.privacyPolicy}>
                    By providing personal information I consent to EPAM Systems, Inc. processing my personal information as set out in the
                    {' '}
                    <Link type="Link" target="_blank" href="/privacy-policy">SolutionsHub Privacy Policy</Link>
                    {' '}
                    and outside of my home jurisdiction.
                  </p>
                  )}

                </div>
                <div className={styles.rightContainer}>
                  <Field
                    component={Textarea}
                    name="question"
                    label="Comment"
                    placeholder="Required"
                    formId={formId}
                    required={true}
                    classNameWrapper={classnames(styles.commonMarginBottom, styles.questionContainer)}
                    classNameTextarea={styles.comment}
                    maxLength={250}
                    isCounter={true}
                  />
                </div>
              </div>
              <div className={classnames(styles.row, styles.bottomContainer)}>
                <Field
                  component={Recaptcha}
                  name="captchaResponse"
                  formId={formId}
                  className={styles.recaptcha}
                />
                <div className={styles.btnGroups}>
                  <Button
                    type="outline"
                    buttonType="button"
                    onClick={onClose}
                    className={classnames(styles.commonBtn, styles.cancelBtn)}
                    size="small"
                  >
                    Cancel
                  </Button>
                  <Field name="button">
                    {({ form }) => (
                      <Button
                        className={classnames(styles.commonBtn, styles.sendBtn, 'btnAddQuestionForSolution', {
                          [styles.loading]: loading,
                          [styles.disabled]: !form.isValid || loading,
                        })}
                        buttonType="submit"
                        disabled={!form.isValid || loading || isSubmitDisabled}
                        size="small"
                      >
                        {loading ? <Preloader color="white" size="small" /> : 'Submit Question'}
                      </Button>
                    )}
                  </Field>
                </div>
              </div>
            </Form>
          )
        }
      </Formik>
    </div>
  );
};

FormComponent.propTypes = {
  setFormSent: PropTypes.func.isRequired,
  formId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  solution: PropTypes.shape({
    _meta: PropTypes.any,
  }).isRequired
};

export default FormComponent;
