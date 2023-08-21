import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'v2_main/components/html';
import { Cross } from 'v2_common/svg';
import { Formik, Form, Field } from 'formik';
import InputText from 'v2_main/components/common/form-components/input-text';
import Textarea from 'v2_main/components/common/form-components/textarea';
import CountrySelect from 'v2_main/components/common/form-components/country-select/countrySelectGroup';
import SelectComponent from 'v2_main/components/common/form-components/select';
import ButtonControl from 'v2_main/components/common/form-components/button/ButtonControl';
import ApiController from 'v2_common/api/index';
import buildOptions from 'v2_main/components/common/form-components/select/utils';
import { getPhoneNumberForForm } from 'v2_main/components/common/form-components/country-select/util';
import AppContext from 'v2_main/context/appContext';
import SnackbarContext from 'v2_main/context/snackbar-context/SnackbarContext';
import { initialValues, validationSchema, transformCompetencyCenter } from './utils';
import formStyles from '../Forms.module.scss';

const FormComponent = ({
  setOpen,
  setFormSent,
  formId,
  loading,
  setLoading,
  ccList
}) => {
  const { personalEmails } = useContext(AppContext);
  const { setSnackbarOpen } = useContext(SnackbarContext);
  const personalEmailsList = personalEmails?.length > 0 ? personalEmails : null;
  const schema = validationSchema(personalEmailsList);

  return (
    <section className={formStyles.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        isInitialValid={schema.isValidSync(initialValues)}
        onSubmit={(fields) => {
          setLoading(true);
          const fieldsWithCCData = fields;
          fieldsWithCCData.competencyCenter = transformCompetencyCenter(ccList, fields.competencyCenter);
          ApiController.sendForm({ ...fieldsWithCCData, phone: getPhoneNumberForForm(fields.phone), mode: 'internal' })
            .then(() => {
              setFormSent(true);
              setLoading(false);
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
                    Submit Asset
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
                    formId={formId}
                    disabled={true}
                  />
                  <Field
                    component={InputText}
                    name="lastName"
                    label="Last Name"
                    formId={formId}
                    disabled={true}
                  />
                  <Field
                    component={InputText}
                    name="email"
                    label="Business Email"
                    formId={formId}
                    disabled={true}
                  />
                  <Field
                    component={CountrySelect}
                    name="phone"
                    label="Cellphone Number"
                    formId={formId}
                  />
                  <Field
                    component={SelectComponent}
                    name="competencyCenter"
                    options={buildOptions(ccList, 'label', 'label')}
                    formId={formId}
                    required={true}
                    placeholder="required"
                    label="Choose knowledge category"
                    customPlaceholder={`Choose appropriate category${window.innerWidth > 320 ? ' from the list' : ''}`}
                  />
                  <Field
                    component={InputText}
                    name="assetName"
                    label="Asset Name"
                    formId={formId}
                    required={true}
                  />
                  <Field
                    component={Textarea}
                    name="message"
                    label="Describe your asset"
                    formId={formId}
                    maxLength={1500}
                  />
                  <ButtonControl
                    onClickCancel={() => {
                      setOpen(false);
                      resetForm();
                    }}
                    loading={loading}
                    formName="submitAsset"
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
  ccList: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default FormComponent;
