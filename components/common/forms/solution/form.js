import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Typography } from 'v2_main/components/html';
import { Cross } from 'v2_common/svg';
import { Formik, Form, Field } from 'formik';
import InputText from 'v2_main/components/common/form-components/input-text';
import Textarea from 'v2_main/components/common/form-components/textarea';
// import CountrySelect from 'v2_main/components/common/form-components/country-select/countrySelectGroup';
import Checkbox from 'v2_main/components/common/form-components/checkbox';
import Recaptcha from 'v2_main/components/common/form-components/recaptcha';
import ButtonControl from 'v2_main/components/common/form-components/button/ButtonControl';
import SolutionLogo from 'v2_main/components/common/cards/SolutionLogo';
import CheckboxGroup from 'v2_main/components/common/form-components/checkbox/CheckboxGroup';
import ApiController from 'v2_common/api';
import { getToken } from 'v2_common/utils/cookieHelper';
import { confirmText } from 'v2_main/components/common/forms/config';
import { getPhoneNumberForForm } from 'v2_main/components/common/form-components/country-select/util';
import {
  isFormSubmitDisabled,
  setFormSubmitCounter,
  isSpecificSolutionSubmitDisabled,
} from 'v2_common/utils/spamProtection';
import AppContext from 'v2_main/context/appContext';
import RequestLimiter from 'v2_main/components/common/form-components/request-limiter';
import { getAfterAuthSolutionOwnerData, redirectToAuthAndSaveData } from 'v2_common/utils/solutions';
import ContactButtonsSection from 'v2_main/components/common/contact-buttons-section';
import ScrollToFirstErrorField from 'v2_main/components/common/form-components/ScrollToFirstErrorField';
import GAHoverEventsHandler from 'v2_common/utils/GAHoverEventsHandler';
import { engModeValidationSchema } from 'v2_main/components/common/forms/yup.util';
import useEngMode from 'v2_main/hooks/useEngMode';
import {
  initialValues,
  getSolutionInfo,
  showCommercialUsage,
  chooseValidationSchema,
  isSolutionOpenAndNoESG,
  initialShowCommercialUsage,
  pushSubmitDataToDataLayer,
} from './utils';
import styles from './styles.module.scss';
import formStyles from '../Forms.module.scss';

const FormComponent = ({
  open,
  setOpen,
  setFormSent,
  formId: formIdFromAPI,
  solution: solutionFromAPI,
  packageSolutions: packageSolutionsFromAPI,
  loading,
  setLoading,
  handleFormOpenCloseWithParams,
}) => {
  const { accessToken } = getToken();
  const { engMode, engModeEmail } = useEngMode();
  const mode = accessToken ? 'internal' : 'external';

  const [initialValuesState, setInitialValuesSate] = useState(initialValues);
  const [recaptchaReload, setRecaptchaReload] = useState(false);

  const [solution, setSolution] = useState(solutionFromAPI);
  const [formId, setFormId] = useState(formIdFromAPI);
  const [packageSolutions, setPackageSolutions] = useState(packageSolutionsFromAPI);

  const [checkboxPackageList, setCheckboxPackageList] = useState(undefined);
  const [toShowRadioButtons, setToShowRadioButtons] = useState(false);

  const { formSubmissionLimit, specificSolutionLimit, personalEmails } = useContext(AppContext);
  const specificSolutionDisabledName = `${solution?.name}${formId}`;
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(isFormSubmitDisabled(+formSubmissionLimit));
  const [isSpecificSubmitDisabled] = useState(isSpecificSolutionSubmitDisabled(specificSolutionDisabledName, +specificSolutionLimit));

  const personalEmailList = personalEmails?.length > 0 && solution?.labels?.isBlockPersonalEmail
    ? personalEmails
    : null;

  // SET VALIDATION SCHEMA -----------------------------------------------------------------
  const [schema, setSchema] = useState(engMode
    ? engModeValidationSchema
    : chooseValidationSchema(solution, checkboxPackageList, mode, personalEmailList)
  );

  useEffect(() => {
    setTimeout(() => {
      setSchema(engMode ? engModeValidationSchema : chooseValidationSchema(solution, checkboxPackageList, mode, personalEmailList));
    }, 500);
  }, [engMode, open]);
  // ---------------------------------------------------------------------------------------

  const [isEpamEmail, setIsEpamEmail] = useState(false);
  const [ownersEmails, setOwnersEmails] = useState(null);
  const [solutionsNames, setSolutionsNames] = useState(null);

  const sendRequestSolutionButtonHover = new GAHoverEventsHandler(`${packageSolutions ? 'requestPackageSendButton' : 'requestSolutionSendButton'}`);
  // eslint-disable-next-line max-len
  const cancelRequestSolutionButtonHover = new GAHoverEventsHandler(`${packageSolutions ? 'requestPackageCancelButton' : 'requestSolutionCancelButton'}`);

  // Imitate success "request solution" response after 3s (used to show success screen).
  const successScreenPromise = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve({ isSentToEsp: true, statusCode: 200 });
    }, 3000);
  });

  // Restore data after the page reload after auth
  useEffect(() => {
    getAfterAuthSolutionOwnerData(setSolution, setFormId, setPackageSolutions);
  }, []);

  /*
   * We need to show the ContactButtonSections after auth reload from package request form;
   * The owner emails and name available only on the internal request, we have to check and write them into arrays
   */
  useEffect(() => {
    if (mode === 'internal' && solutionFromAPI?.package?.packageSolutions) {
      const ownersEmailsArray = [solution?.productOwnerEmail || solutionFromAPI?.productOwnerEmail];
      const solutionsNamesArray = [solution?.name || solutionFromAPI?.name];

      solutionFromAPI.package.packageSolutions.forEach((p) => {
        ownersEmailsArray.push(p?.productOwnerEmail);
        solutionsNamesArray.push(p?.name);
      });

      setOwnersEmails(ownersEmailsArray);
      setSolutionsNames(solutionsNamesArray);
    }
  }, []);

  useEffect(() => {
    if (packageSolutions) {
      setInitialValuesSate(prev => {
        const newInitialValues = { ...prev };
        newInitialValues.selectedPackage = packageSolutions.map(item => item.name);

        return newInitialValues;
      });
      // initialValues.selectedPackage = packageSolutions.map(item => item.name);

      setCheckboxPackageList(packageSolutions?.map(item => ({
        label: item.name,
        logo: item?.logo,
        isOpenAndNoESG: isSolutionOpenAndNoESG(item),
        type: item?.type,
        checked: true,
      })));
    }
  }, [packageSolutions]);

  useEffect(() => {
    setToShowRadioButtons(showCommercialUsage(solution, checkboxPackageList));
    const personalEmailLocal = personalEmails?.length > 0 && solution?.labels?.isBlockPersonalEmail
      ? personalEmails
      : null;
    setSchema(engMode ? engModeValidationSchema : chooseValidationSchema(solution, checkboxPackageList, mode, personalEmailLocal));
  }, [solution, checkboxPackageList]);

  const onChangeSelectPackage = (solutionName) => {
    const newCheckboxPackageList = checkboxPackageList?.map((item) => {
      if (item.label === solutionName) {
        return {
          ...item,
          checked: !item.checked,
        };
      }

      return item;
    });

    setCheckboxPackageList(newCheckboxPackageList);
  };

  const resetDataLayer = () => {
    if (window.dataLayer && window.dataLayer.push) {
      window.dataLayer.push({ package_list: null });
    }
  };

  const onResetForm = () => {
    setToShowRadioButtons(initialShowCommercialUsage(solution, checkboxPackageList));
    resetDataLayer();
    if (checkboxPackageList) {
      setCheckboxPackageList(checkboxPackageList?.map(item => ({
        ...item,
        checked: true,
      })));
    }
  };

  return (
    <section className={styles.formContainer}>
      { (isSubmitDisabled || isSpecificSubmitDisabled) && !engMode
        && (
        <RequestLimiter
          onFormClose={() => {
            setOpen(false);
            handleFormOpenCloseWithParams();
          }}
          isSpecificSolution={isSpecificSubmitDisabled}
        />
        ) }
      <Formik
        initialValues={initialValuesState}
        validationSchema={schema}
        isInitialValid={schema.isValidSync(initialValuesState)}
        enableReinitialize={true}
        onSubmit={(fields) => {
          if ((isSubmitDisabled || isSpecificSubmitDisabled) && !engMode) {
            return;
          }

          setLoading(true);
          const fieldsData = fields;
          if (!toShowRadioButtons) {
            fieldsData.commercialUsage = 'Yes';
            fieldsData.disableCommercialUsageField = true;
          }
          const flattedSelectedPackage = checkboxPackageList?.filter(item => item.checked)?.map(item => item.label);
          delete fieldsData.selectedPackage;

          Promise.race([
            ApiController.sendForm({
              ...fieldsData,
              phone: getPhoneNumberForForm(fields.phone),
              solution: getSolutionInfo(solution, packageSolutions?.filter(item => flattedSelectedPackage.includes(item.name))),
              blockPersonalEmail: solution?.labels?.isBlockPersonalEmail,
              mode,
              engMode,
              engModeEmail,
            }),
            successScreenPromise(), // Fulfilled with success after 3s.
          ]).then(() => {
            fieldsData.commercialUsage = undefined;
            fieldsData.disableCommercialUsageField = false;
            setFormSent(true);
            setLoading(false);
            onResetForm();
            setFormSubmitCounter(+formSubmissionLimit, setIsSubmitDisabled);
            setFormSubmitCounter(+specificSolutionLimit, setIsSubmitDisabled, specificSolutionDisabledName);
          }).catch(() => {
            setLoading(false);
            onResetForm();
          });
        }}
      >
        {
            ({
              resetForm, values, errors, touched
            }) => (
              <>
                <header className={classNames(styles.headerContainer, formStyles.headerContainer)}>
                  <Typography type="h4" className={formStyles.title}>
                    {
                      packageSolutions
                        ? 'Request Solution Package'
                        : 'Request Solution'
                    }
                  </Typography>
                  <Cross
                    className={formStyles.cross}
                    onClick={() => {
                      setOpen(false);
                      resetForm();
                      onResetForm();
                      handleFormOpenCloseWithParams();
                    }}
                  />
                </header>
                <Form>
                  <section className={styles.formWrapper}>
                    <section className={styles.mainContent}>
                      <div
                        className={classNames(styles.solutionWrapper, {
                          [styles.whenExistPackage]: packageSolutions
                        })}
                      >
                        <SolutionLogo
                          className={styles.solutionImage}
                          logo={solution?.logo}
                          types={solution?.type}
                        />
                        <Typography type="h3" className={styles.solutionTitle}>{solution?.name}</Typography>
                      </div>
                      {checkboxPackageList && (
                      <CheckboxGroup
                        data={checkboxPackageList}
                        name="selectedPackage"
                        formId={formId}
                        label="Select package solutions you are interested in:"
                        onChangeSelectPackage={onChangeSelectPackage}
                        page="solution"
                      />
                      )}
                      <div className={styles.solutionNote}>We may contact you regarding your request</div>
                      <ScrollToFirstErrorField
                        component={InputText}
                        name="firstName"
                        label="First Name"
                        required={mode === 'external'}
                        placeholder="Required"
                        formId={formId}
                        disabled={mode === 'internal'}
                      />
                      <ScrollToFirstErrorField
                        component={InputText}
                        name="lastName"
                        label="Last Name"
                        required={mode === 'external'}
                        placeholder="Required"
                        formId={formId}
                        disabled={mode === 'internal'}
                      />
                      <ScrollToFirstErrorField
                        component={InputText}
                        name="email"
                        label="Business Email"
                        required={mode === 'external'}
                        placeholder="Required"
                        type="text"
                        inputMode="email"
                        formId={formId}
                        disabled={mode === 'internal'}
                        customChange={(value) => {
                          if (/@epam.com/gi.test(value)) {
                            setIsEpamEmail(true);
                          } else {
                            setIsEpamEmail(false);
                          }
                        }}
                      />

                      {/* EPAM LOGIN ------------------------------------------------- */}
                      { isEpamEmail && (
                      <div className={styles.epamLogin}>
                        <h4 className={styles.epamLoginTitle}>Are you an EPAMer?</h4>
                        <p className={styles.epamLoginDescr}>Login to directly send your request to the solution’s owner via Teams or Email</p>
                        <Button
                          type="outline"
                          className={classNames(styles.formLoginBtm, 'epamLoginFormBtn')}
                          buttonType="button"
                          onClick={() => redirectToAuthAndSaveData(solution, formId, packageSolutions)}
                        >
                          Epam login
                        </Button>
                      </div>
                      )}

                      {/* CONTACT SOLUTION OWNER ------------------------------------------------- */}
                      { mode === 'internal' && (
                      <div className={styles.formContactSolution}>
                        <ContactButtonsSection
                          distinctClassNameTeams="contactSolutionOwnerTeamsBtn"
                          distinctClassNameEmail="contactSolutionOwnerEmailBtn"
                          emails={formId === 'packageSolution' ? ownersEmails : [solution?.productOwnerEmail || solutionFromAPI?.productOwnerEmail]}
                          names={formId === 'packageSolution' ? solutionsNames : [solution?.name || solutionFromAPI?.name]}
                          btnClassName={styles.getStartedButton}
                          containerClassName={styles.mobileButtons}
                        />
                      </div>
                      )}

                      {/* { mode === 'external' && ( */}
                      {/* <div className={styles.commonMargin}> */}
                      {/*  <Field */}
                      {/*    component={CountrySelect} */}
                      {/*    name="phone" */}
                      {/*    label="Cellphone Number" */}
                      {/*    formId={formId} */}
                      {/*  /> */}
                      {/* </div> */}
                      {/* )} */}
                      {toShowRadioButtons && mode === 'external' && (
                      <div className={styles.commonMargin}>
                        <ScrollToFirstErrorField
                          radioGroup={true}
                          data={['Yes', 'No']}
                          name="commercialUsage"
                          label="I plan to use this solution for my business, rather than academic or personal needs"
                          selectedNoLabel="Please note: if you leave this solution for commercial use, you will receive support from EPAM."
                          toShowNoLabel={true}
                          icon={true}
                          formId={formId}
                          required={true}
                          selectedValue={values.commercialUsage || ''}
                        />

                      </div>
                      )}
                      {mode === 'external'
                      && (
                      <ScrollToFirstErrorField
                        component={Textarea}
                        name="message"
                        label="Message"
                        formId={formId}
                        maxLength={1500}
                      />
                      )}
                      {mode === 'external'
                        && (
                        <div className={styles.desctopCapcha}>
                          <Field
                            component={Recaptcha}
                            name="captchaResponse"
                            formId={formId}
                            className={styles.recaptcha}
                            recaptchaReload={recaptchaReload}
                          />
                          <Field
                            component={Checkbox}
                            name="confirm"
                            id="confirm"
                            text={confirmText}
                            needValidate={true}
                            formId={formId}
                            required={true}
                          />
                        </div>
                        )}
                    </section>
                    {mode === 'external'
                        && (
                        <div className={styles.mobileCapcha}>
                          <ScrollToFirstErrorField
                            component={Recaptcha}
                            name="captchaResponse"
                            formId={formId}
                            className={styles.recaptcha}
                            recaptchaReload={recaptchaReload}
                          />
                          <ScrollToFirstErrorField
                            component={Checkbox}
                            name="confirm"
                            id="confirm-mobile"
                            text={confirmText}
                            needValidate={true}
                            formId={formId}
                            required={true}
                          />
                        </div>
                        )}
                    <ButtonControl
                      onClickCancel={() => {
                        setOpen(false);
                        resetForm();
                        resetDataLayer();
                        setRecaptchaReload(prev => !prev);
                        setIsEpamEmail(false);
                        handleFormOpenCloseWithParams();
                      }}
                      loading={loading}
                      toShowRadioButtons={toShowRadioButtons && !engMode}
                      formName={packageSolutions ? 'requestPackage' : 'requestSolution'}
                      isSubmitDisabled={(isSubmitDisabled || isSpecificSubmitDisabled) && !engMode}
                      isSubmitHidden={mode === 'internal'}
                      isMobileValidationEnabled={false}
                      notSticky={mode === 'external'}
                      pushSubmitDataToDataLayer={() => {
                        pushSubmitDataToDataLayer(values, errors, touched, solution?.name, packageSolutions, checkboxPackageList);
                      }}
                      hoverHandler={sendRequestSolutionButtonHover}
                      cancelHoverHandler={cancelRequestSolutionButtonHover}
                    />
                  </section>
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
  solution: PropTypes.shape({
    name: PropTypes.string,
    labels: PropTypes.objectOf(PropTypes.any),
    tags: PropTypes.arrayOf(PropTypes.object),
    type: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  packageSolutions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  handleFormOpenCloseWithParams: PropTypes.func,
};

FormComponent.defaultProps = {
  packageSolutions: undefined,
  handleFormOpenCloseWithParams: () => {},
};

export default FormComponent;
