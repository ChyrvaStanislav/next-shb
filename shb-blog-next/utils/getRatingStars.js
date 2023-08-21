import React from 'react';
import classNames from 'classnames';
import EmptyStar from 'v2_common/svg/stars/emptyStar';
import HalfStar from 'v2_common/svg/stars/halfStar';
import FullStar from 'v2_common/svg/stars/fullStar';

export const getSvgStarMap = (styles, key) => ({
  empty: <EmptyStar key={key} className={classNames(styles.star, styles.empty)} />,
  half: <HalfStar key={key} className={styles.star} />,
  full: <FullStar key={key} className={styles.star} />,
});

export const getPngStarMap = (styles, key) => ({
  empty: <span key={key} className={styles.default} />,
  half: <span key={key} className={styles.half} />,
  full: <span key={key} className={styles.full} />,
});

/**
 * @param rating {string}
 * @param styles {object}
 * @param getStarMap {function}
 */
const getRatingStars = (rating, styles, getStarMap) => {
  if (!rating) {
    return [];
  }

  if (typeof rating !== 'string') {
    // eslint-disable-next-line no-param-reassign
    rating = rating.toString();
  }


  return new Array(5).fill(null).map((_, index) => {
    if (index + 1 <= Math.floor(+rating)) { // full star
      return getStarMap?.(styles, index).full;
    }

    if (index + 1 > Math.ceil(+rating)) { // empty star
      return getStarMap?.(styles, index).empty;
    }

    // if decimal part less than 3 - empty star
    // if decimal part more than 3 and less than 7 - half star
    // if decimal part more than 7 - full star
    const decimalPart = +rating.split('.')[1];

    if (decimalPart < 3) {
      return getStarMap?.(styles, decimalPart).empty;
    }

    if (decimalPart > 7) {
      return getStarMap?.(styles, decimalPart).full;
    }

    return getStarMap?.(styles, decimalPart).half;
  });
};

export default getRatingStars;
