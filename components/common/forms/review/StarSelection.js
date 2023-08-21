import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FullStar from 'v2_common/svg/stars/fullStar';
import EmptyStar from 'v2_common/svg/stars/emptyStar';
import styles from './styles.module.scss';

const StarSelection = ({
  rate, handleStarClick
}) => {
  const [hoverRate, setHoverRate] = useState(0);

  return (
    <div
      className={styles.starContainer}
      onMouseLeave={() => {
        setTimeout(() => {
          setHoverRate(0);
        }, 500);
      }}
    >
      {Array.from({ length: 5 }).map((item, index) => {
        const starProps = {
          color: '#F18E3B',
          className: styles.star,
          onMouseEnter: () => {
            setHoverRate(index + 1);
          },
          onMouseLeave: () => {
            setHoverRate(0);
          },
          onClick: () => handleStarClick(index),
        };

        let mappingRate;

        if (hoverRate && hoverRate > rate) {
          mappingRate = hoverRate;
        } else {
          mappingRate = rate;
        }

        return (index + 1 <= mappingRate) ? (
          <FullStar
            {...starProps}
          />
        ) : (
          <EmptyStar
            {...starProps}
          />
        );
      })}
    </div>
  );
};

StarSelection.propTypes = {
  rate: PropTypes.number,
  handleStarClick: PropTypes.func,
};

StarSelection.defaultProps = {
  rate: null,
  handleStarClick: () => {},
};

export default StarSelection;
