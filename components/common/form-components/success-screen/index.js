import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Button } from '../../../html';
import classNames from 'classnames';
import { Cross } from '../../../../../v2_common/svg';
import sortingQueriesConstants from '../../../../../v2_common/constants/sortingQueries';
import styles from './styles.module.scss';

const SuccessScreen = ({
  title,
  subDescription1,
  subDescription2,
  goToSolutions,
  formType,
  solutionInfo,
  onFormClose,
  successScreenRenderButton,
  design,
  offButtonGroup,
  successScreenClassGA,
}) => {
  useEffect(() => {
    if (!isEmpty(solutionInfo) && solutionInfo.downloadLink) {
      setTimeout(() => window.open(solutionInfo.downloadLink), 1000);
    }
  }, []);

  return (
    <div className={classNames(styles.SuccessScreen, styles[design])}>
      {design === 'default' && (
        <Cross
          className={styles.cross}
          onClick={onFormClose}
        />
      )}
      <div className={classNames(styles.SuccessScreenContainer)}>
        <div className={styles.SuccessScreenIcon} />
        <h1 className={classNames(
          styles.SuccessScreenTitle,
          styles.breakingLine,
          successScreenClassGA,
          { [styles.SuccessScreenTitleLong]: formType === 'inventory-support' }
        )}
        >
          {title}
        </h1>
        <p className={styles.SuccessScreenText}>{subDescription1}</p>
        {subDescription2 && <p className={styles.SuccessScreenText}>{subDescription2}</p>}
        {
          !offButtonGroup && (
            successScreenRenderButton ? successScreenRenderButton() : (
              <>
                <Button className={styles.SuccessScreenBtn} onClick={onFormClose}>Continue Exploring</Button>
                {goToSolutions
                  ? (
                    <Button
                      type="outline"
                      className={styles.SuccessScreenLink}
                      href={`/search?sort=${sortingQueriesConstants.default}`}
                    >
                      Go to all solutions
                    </Button>
                  )
                  : null}
              </>
            )
          )
        }

      </div>
    </div>
  );
};

SuccessScreen.propTypes = {
  title: PropTypes.string,
  subDescription1: PropTypes.string,
  subDescription2: PropTypes.string,
  goToSolutions: PropTypes.bool,
  solutionInfo: PropTypes.objectOf(PropTypes.any),
  onFormClose: PropTypes.func,
  formType: PropTypes.oneOf([
    'main-request',
    'main-question',
    'inventory-solution',
    'inventory-support',
    'inventory-error-pages',
    'main-submit',
    null
  ]),
  successScreenRenderButton: PropTypes.func,
  design: PropTypes.oneOf(['default', 'solution']),
  offButtonGroup: PropTypes.bool,
  successScreenClassGA: PropTypes.string,
};

SuccessScreen.defaultProps = {
  title: null,
  subDescription1: null,
  solutionInfo: {},
  subDescription2: null,
  goToSolutions: false,
  formType: null,
  successScreenRenderButton: undefined,
  design: 'default',
  offButtonGroup: false,
  onFormClose: () => {},
  successScreenClassGA: '',
};

export default SuccessScreen;
