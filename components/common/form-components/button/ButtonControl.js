"use client"

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Preloader from '../../preloader/Preloader';
import { Button } from '../../../html';
import { Field } from 'formik';
import useBreakpoint from '../../../../hooks/useBreakpoint';
import styles from './ButtonControll.module.scss';

const ButtonControll = ({
  onClickCancel,
  className,
  loading,
  toShowRadioButtons,
  formName,
  isSubmitHidden,
  isMobileValidationEnabled,
  pushSubmitDataToDataLayer,
  notSticky,
  hoverHandler,
  cancelHoverHandler,
}) => {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'md' || breakpoint === 'lg' || breakpoint === 'xl';

  return (
    <section className={classNames(styles.componentContainer, className, { [styles.notSticky]: notSticky })}>
      {!isSubmitHidden && (
      <div className={styles.submitWrapper} onClick={pushSubmitDataToDataLayer}>
        <Field name="button">
          {({ form }) => {
            const isDisabled = isMobileValidationEnabled
              ? isDesktop && (!form.isValid || loading || (toShowRadioButtons && !form.values.commercialUsage))
              : !form.isValid || loading || (toShowRadioButtons && !form.values.commercialUsage);

            return (
              <Button
                className={classNames(styles.send, styles.btn, `${formName}SendBtn`, {
                  [styles.loading]: loading,
                  [styles.disabled]: isDisabled,
                })}
                buttonType="submit"
                disabled={isDisabled}
                onMouseEnter={() => hoverHandler?.handleMouseEnter?.()}
                onMouseLeave={() => hoverHandler?.handleMouseLeave?.()}
              >
                {loading ? <Preloader color="white" size="small" /> : 'Send'}
              </Button>
            );
          }}
        </Field>
      </div>
      )}
      <Button
        type="outline"
        className={classNames(styles.cancel, styles.btn)}
        buttonType="button"
        onClick={onClickCancel}
        onMouseEnter={() => cancelHoverHandler?.handleMouseEnter?.()}
        onMouseLeave={() => cancelHoverHandler?.handleMouseLeave?.()}
      >
        Cancel
      </Button>
    </section>
  );
};

ButtonControll.propTypes = {
  onClickCancel: PropTypes.func,
  className: PropTypes.string,
  loading: PropTypes.bool,
  toShowRadioButtons: PropTypes.bool,
  formName: PropTypes.string,
  isSubmitHidden: PropTypes.bool,
  isMobileValidationEnabled: PropTypes.bool,
  pushSubmitDataToDataLayer: PropTypes.func,
  notSticky: PropTypes.bool,
  hoverHandler: PropTypes.shape({
    handleMouseEnter: PropTypes.func,
    handleMouseLeave: PropTypes.func,
  }),
  cancelHoverHandler: PropTypes.shape({
    handleMouseEnter: PropTypes.func,
    handleMouseLeave: PropTypes.func,
  }),
};

ButtonControll.defaultProps = {
  onClickCancel: () => {},
  className: '',
  loading: false,
  toShowRadioButtons: false,
  formName: '',
  isSubmitHidden: false,
  isMobileValidationEnabled: false,
  pushSubmitDataToDataLayer: () => {},
  notSticky: false,
  hoverHandler: null,
  cancelHoverHandler: null,
};

export default ButtonControll;
