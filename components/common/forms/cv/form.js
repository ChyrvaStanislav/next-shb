import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Typography } from 'v2_main/components/html';
import { Cross } from 'v2_common/svg';
import { Formik, Form, Field } from 'formik';
import InputText from 'v2_main/components/common/form-components/input-text';
import InputFile from 'v2_main/components/common/form-components/input-file';
import SelectComponent from 'v2_main/components/common/form-components/select';
import Textarea from 'v2_main/components/common/form-components/textarea';
import CountrySelect from 'v2_main/components/common/form-components/country-select/countrySelectGroup';
import Checkbox from 'v2_main/components/common/form-components/checkbox';
import Recaptcha from 'v2_main/components/common/form-components/recaptcha';
import ButtonControl from 'v2_main/components/common/form-components/button/ButtonControl';
import ApiController from 'v2_common/api/index';
import buildOptions from 'v2_main/components/common/form-components/select/utils';
import { confirmText } from 'v2_main/components/common/forms/config';
import { getPhoneNumberForForm } from 'v2_main/components/common/form-components/country-select/util';
import AppContext from 'v2_main/context/appContext';
import { isFormSubmitDisabled, setFormSubmitCounter } from 'v2_common/utils/spamProtection';
import RequestLimiter from 'v2_main/components/common/form-components/request-limiter';
import SnackbarContext from 'v2_main/context/snackbar-context/SnackbarContext';
import useEngMode from 'v2_main/hooks/useEngMode';
import { engModeValidationSchema } from 'v2_main/components/common/forms/yup.util';
import {
  getSolutionInfo, initialValues, validationSchema, getByteArray
} from './utils';
import styles from './styles.module.scss';
import formStyles from '../Forms.module.scss';

const FormComponent = ({
  setOpen,
  setFormSent,
  formId,
  solution,
  loading,
  setLoading,
  mode,
}) => {
  const { formSubmissionLimit } = useContext(AppContext);
  const { setSnackbarOpen } = useContext(SnackbarContext);
  const { engMode, engModeEmail } = useEngMode();
  const [schema, setSchema] = useState(engMode ? engModeValidationSchema : validationSchema());
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(isFormSubmitDisabled(+formSubmissionLimit));

  useEffect(() => {
    setSchema(engMode ? engModeValidationSchema : validationSchema());
  }, [engMode]);

  return (
    <section className={classNames(styles.formContainer, formStyles.formContainer)}>
      { isSubmitDisabled && !engMode && <RequestLimiter onFormClose={() => setOpen(false)} /> }
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        isInitialValid={schema.isValidSync(initialValues)}
        onSubmit={(fields) => {
          if (isSubmitDisabled && !engMode) {
            return;
          }

          const fieldsData = fields;
          const data = {};
          getByteArray(fields.file).then((byteArray) => {
            if (byteArray) {
              data.bytes = byteArray;
              data.mimeType = fields.file.type;
              data.name = fields.file.name;
            }

            delete fieldsData.file;
            setLoading(true);
            ApiController.sendForm({
              ...fieldsData,
              phone: getPhoneNumberForForm(fields.phone),
              solution: getSolutionInfo(solution),
              mode,
              formType: 'cv',
              fileData: data,
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
          });
        }}
      >
        {
              ({
                resetForm, setFieldValue, setFieldTouched
              }) => (
                <>
                  <header className={formStyles.headerContainer}>
                    <Typography type="h4" className={formStyles.title}>
                      {`Apply for ${solution.name} position`}
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
                      required={true}
                      placeholder="Required"
                      formId={formId}
                    />
                    <Field
                      component={InputText}
                      name="lastName"
                      label="Last Name"
                      required={true}
                      placeholder="Required"
                      formId={formId}
                    />
                    <Field
                      component={InputText}
                      name="email"
                      label="Email"
                      required={true}
                      placeholder="Required"
                      type="email"
                      formId={formId}
                    />
                    <Field
                      component={CountrySelect}
                      name="phone"
                      label="Cellphone Number"
                      formId={formId}
                    />
                    <Field
                      component={SelectComponent}
                      name="vacancy"
                      options={solution.teamAndVacancies && buildOptions(solution.teamAndVacancies?.vacancies, 'title', 'title')}
                      formId={formId}
                      required={true}
                      placeholder="required"
                      label="Applied Position"
                      customPlaceholder="Choose position"
                      className={styles.inputArea}
                    />
                    <Field
                      component={Textarea}
                      name="message"
                      label="Additional Information"
                      maxLength={1500}
                      formId={formId}
                    />
                    <Field
                      required={true}
                      component={InputFile}
                      name="file"
                      label="Attach your CV here"
                      formId={formId}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      className={styles.inputArea}
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
                      formName="cv"
                      isSubmitDisabled={isSubmitDisabled}
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
  solution: PropTypes.shape({
    name: PropTypes.string,
    cvEmails: PropTypes.arrayOf(PropTypes.string),
    teamAndVacancies: PropTypes.objectOf(PropTypes.any)
  }).isRequired,
};

FormComponent.defaultProps = {
  mode: 'external'
};

export default FormComponent;
