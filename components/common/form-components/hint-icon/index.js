import React from 'react';
import Popup from 'v2_main/components/common/popup';
import styles from './styles.module.scss';

const HintIcon = () => (
  <Popup
    offset={[0, 10]}
    placement="top"
    existArrow={true}
    renderTargetElement={() => (
      <div
        className={styles.iconWrapper}
        data-testid="targetDiv"
      >
        <div className={styles.icon}>
          i
        </div>
      </div>
    )}
  >
    <p className={styles.hintText}>
      <span className={styles.hintBold}>Please note: </span>
      if you are leveraging this solution for commercial use, you will receive support from EPAM.
    </p>
  </Popup>
);

export default HintIcon;
