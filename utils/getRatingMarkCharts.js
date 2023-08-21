import React from 'react';
import classNames from 'classnames';

/**
 * @param marks {number[]}
 * @param votes {number}
 * @param styles {object}
 */
const getRatingMarkCharts = (marks, votes, styles) => {
  if (!marks || !votes) {
    return null;
  }

  return Object.keys(marks).map(markKey => (
    <div className={styles.ratingLine}>
      <div className={classNames(styles.ratingLineStars, { [styles.ratingOneLineStar]: markKey === '1' })}>
        { markKey }
        <span>{ `star${markKey === '1' ? '' : 's'}` }</span>
      </div>
      <div className={styles.ratingLineVizualization}>
        <span className={styles.line} style={{ width: `${Math.ceil((marks[markKey] / votes) * 100)}%` }} />
      </div>
      <div className={styles.ratingLineCount}>
        { marks[markKey] }
      </div>
    </div>
  )).reverse();
};

export default getRatingMarkCharts;
