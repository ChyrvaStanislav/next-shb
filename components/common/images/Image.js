

import React from 'react';
import PropTypes from 'prop-types';
import {
  getImageCMS,
  getImageStaticLink,
  doSomethingIfGif, getAltTextFromName,
} from '@/utils/getImageCMS';
import NextImage from 'next/image';

const Image = ({
  asset, query, altFromCMS, titleFromCMS, ...other
}) => {
  // const [src, setSrc] = useState(getImageCMS(asset, query));

  let src = getImageCMS(asset);
  // const staticLink = getImageStaticLink(asset);
  //
  //
  //
  // if (asset._meta.schema.includes('image')) {
  //   doSomethingIfGif(staticLink, () => {
  //     src = staticLink;
  //   });
  // }

  return (
    <NextImage
      src={src}
      alt={altFromCMS || getAltTextFromName(asset.name)}
      title={titleFromCMS || null}
      {...other}
    />
  );
};

Image.propTypes = {
  asset: PropTypes.shape({
    defaultHost: PropTypes.string,
    mediaType: PropTypes.string,
    endpoint: PropTypes.string,
    name: PropTypes.string,
    // TODO: change to real prop-type
    _meta: PropTypes.any,
  }).isRequired,
  query: PropTypes.string,
  altFromCMS: PropTypes.string,
  titleFromCMS: PropTypes.string,
};

Image.defaultProps = {
  query: '',
  altFromCMS: null,
  titleFromCMS: null,
};

export default Image;
