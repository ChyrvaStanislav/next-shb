import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getAltTextFromName, getImageCMS } from '@/utils/getImageCMS';
import styles from './styles.module.scss';

const Picture = (props) => {
  const {
    image,
    imageCarouselClassName,
    width,
    height,
  } = props;

  return (
    <div
      className={classNames(styles.heroImageCarouselInner, imageCarouselClassName)}
    >
      <div className={styles.heroImageCarouselInnerWrapper}>
        <picture>
          <source
            media="(max-width: 568px)"
            srcSet={
              encodeURI(getImageCMS(image.mobileImageBig))
            }
          />
          <source
            media="(min-width: 569px) and (max-width: 1023px)"
            srcSet={
              encodeURI(getImageCMS(image.tabletImage))
            }
          />
          <img
            src={getImageCMS(image.desktopImageBig)}
            alt={getAltTextFromName(image.desktopImageBig?.name)}
            className={classNames(styles.active)}
            width={width}
            height={height}
          />
        </picture>
      </div>
    </div>
  );
};

Picture.propTypes = {
  image: PropTypes.objectOf(PropTypes.any),
  imageCarouselClassName: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Picture.defaultProps = {
  image: {},
  imageCarouselClassName: '',
  width: null,
  height: null,
};
export default Picture;
