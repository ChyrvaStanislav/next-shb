import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Typography } from '../../../html';
import { Cross } from '../../../../../v2_common/svg';
import { Formik, Form, Field } from 'formik';
import InputText from '../../form-components/input-text';
import Textarea from '../../form-components/textarea';
// import CountrySelect from 'v2_main/components/common/form-components/country-select/countrySelectGroup';
import Checkbox from '../../form-components/checkbox';
import Recaptcha from '../../form-components/recaptcha';
import ButtonControl from '../../form-components/button/ButtonControl';
import ApiController from '../../../../../v2_common/api/index';
import { confirmText } from '../config';
import { getPhoneNumberForForm } from '../../form-components/country-select/util';
import RequestLimiter from '../../form-components/request-limiter';
import { isFormSubmitDisabled, setFormSubmitCounter } from '../../../../../v2_common/utils/spamProtection';
// import AppContext from 'v2_main/context/appContext';
// import SnackbarContext from 'v2_main/context/snackbar-context/SnackbarContext';
import GAHoverEventsHandler from '../../../../../v2_common/utils/GAHoverEventsHandler';
import { engModeValidationSchema } from '../yup.util';
// import useEngMode from 'v2_main/hooks/useEngMode';
import { initialValues, validationSchema, validationSchemaInternal } from './utils';
import styles from './styles.module.scss';
import formStyles from '../Forms.module.scss';


const FormComponent = ({
  setOpen,
  setFormSent,
  formId,
  loading,
  setLoading,
  mode,
}) => {
  // const { formSubmissionLimit, personalEmails } = useContext(AppContext);
  // const { setSnackbarOpen } = useContext(SnackbarContext);

  const formSubmissionLimit = 10;
  const personalEmails = null;
  const setSnackbarOpen = () => {};

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(isFormSubmitDisabled(+formSubmissionLimit));
  // const { engMode, engModeEmail } = useEngMode();

  const engMode = false;
  const engModeEmail = null;


  const personalEmailsList = personalEmails?.length > 0 ? personalEmails : null;

  // SET VALIDATION SCHEMA -----------------------------------------------------------------
  const chooseSchema = () => {
    if (engMode) return engModeValidationSchema;

    return mode === 'external' ? validationSchema(personalEmailsList) : validationSchemaInternal;
  };
  const [schema, setSchema] = useState(chooseSchema());

  useEffect(() => {
    setSchema(chooseSchema());
  }, [engMode]);
  // ---------------------------------------------------------------------------------------

  const contactUsSendButtonHover = new GAHoverEventsHandler('contactUsSendButton');
  const contactUsCancelButtonHover = new GAHoverEventsHandler('contactUsCancelButton');

  return (
    <section className={classNames(styles.formContainer, formStyles.formContainer)}>
      { isSubmitDisabled && !engMode && <RequestLimiter onFormClose={() => setOpen(false)} /> }
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={schema}
        isInitialValid={schema.isValidSync(initialValues)}
        onSubmit={(fields) => {
          if (isSubmitDisabled && !engMode) {
            return;
          }

          setLoading(true);
          ApiController.sendForm({
            ...fields,
            phone: getPhoneNumberForForm(fields.phone),
            mode,
            formType: 'contact-us',
            requestPage: window.location.href,
            engMode,
            engModeEmail,
          })
            .then(() => {
              setFormSent(true);
              setLoading(false);
              setFormSubmitCounter(+formSubmissionLimit, setIsSubmitDisabled);
            }).catch(() => {
              setFormSent(false);
              setLoading(false);
              setSnackbarOpen(true);
            });
        }}
      >
        {
            ({ resetForm }) => (
              <>
                <header className={formStyles.headerContainer}>
                  <Typography type="h4" className={formStyles.title}>
                    Contact SolutionsHub
                  </Typography>
                  <Cross
                    className={formStyles.cross}
                    onClick={() => {
                      setOpen(false);
                      resetForm();
                    }}
                  />
                </header>
                <Form>
                  <Field
                    component={InputText}
                    name="firstName"
                    label="First Name"
                    required={mode === 'external'}
                    placeholder="Required"
                    formId={formId}
                    disabled={mode === 'internal'}
                  />
                  <Field
                    component={InputText}
                    name="lastName"
                    label="Last Name"
                    required={mode === 'external'}
                    placeholder="Required"
                    formId={formId}
                    disabled={mode === 'internal'}
                  />
                  <Field
                    component={InputText}
                    name="email"
                    label="Business Email"
                    required={mode === 'external'}
                    placeholder="Required"
                    type="email"
                    formId={formId}
                    disabled={mode === 'internal'}
                  />
                  {/* <Field */}
                  {/*  component={CountrySelect} */}
                  {/*  name="phone" */}
                  {/*  label="Cellphone Number" */}
                  {/*  formId={formId} */}
                  {/* /> */}
                  <Field
                    component={Textarea}
                    name="message"
                    label="Message"
                    placeholder="Please write your question here"
                    formId={formId}
                    required={true}
                    maxLength={1500}
                  />
                  {mode === 'external'
                    && (
                      <Field
                        component={Recaptcha}
                        name="captchaResponse"
                        formId={formId}
                        className={formStyles.recaptcha}
                      />
                    )}
                  {mode === 'external'
                    && (
                      <Field
                        component={Checkbox}
                        name="confirm"
                        id="confirm"
                        text={confirmText}
                        needValidate={true}
                        formId={formId}
                      />
                    )}
                  <ButtonControl
                    onClickCancel={() => {
                      setOpen(false);
                      resetForm();
                    }}
                    loading={loading}
                    formName="contactUs"
                    isSubmitDisabled={isSubmitDisabled}
                    hoverHandler={contactUsSendButtonHover}
                    cancelHoverHandler={contactUsCancelButtonHover}
                  />
                </Form>
              </>
            )
          }
      </Formik>
    </section>
  );
};

FormComponent.propTypes = {
  setOpen: PropTypes.func.isRequired,
  setFormSent: PropTypes.func.isRequired,
  formId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['internal', 'external']),
};

FormComponent.defaultProps = {
  mode: 'external'
};

export default FormComponent;
