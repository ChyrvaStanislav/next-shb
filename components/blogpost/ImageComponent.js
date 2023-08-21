import React, { memo } from 'react';
import classNames from 'classnames';
// eslint-disable-next-line import/no-unresolved
// import LazyLoad from 'react-lazy-load';
import styles from './BlogPostContent.module.scss';
// import AssetZoom from '../common/images/AssetZoom';
import Image from '../common/images/Image';

const ImageComponent = ({
  image, imageAlt, imageTitle, mode,
}) => (
  <div>
    {/*<AssetZoom*/}
    {/*  image={image}*/}
    {/*  className={classNames(styles.assetContainer, {*/}
    {/*    [styles.assetContainerUpdate]: mode === 'update'*/}
    {/*  })}*/}
    {/*>*/}
      <div className={styles.imageWrapper}>
        {/*<LazyLoad offset={200}>*/}
          <Image
            altFromCMS={imageAlt}
            titleFromCMS={imageTitle}
            asset={image}
            className={styles.image}
            query="?maxW=1200&qlt=80&fmt=jpg&bg=rgb(255,255,255)"
            itemProp="image"
            width="600"
            height="300"
          />
        {/*</LazyLoad>*/}
      </div>
    {/*</AssetZoom>*/}
  </div>
);

export default memo(ImageComponent);

