import axios from 'axios';

export const getImageCMS = (asset, queryParams = '?maxW=300&qlt=80&fmt=webp&bg=rgb(255,255,255)') => {
  if (!asset) {
    return undefined;
  }

  const version = /\?/gi.test(queryParams) ? `&version=${process.env.VERSION || ''}` : `?version=${process.env.VERSION || ''}`;

  const {
    defaultHost,
    endpoint,
    name,
    _meta
  } = asset;

  let assetType;
  if (_meta) {
    assetType = _meta.schema.includes('image') ? 'i' : 'v';
  } else {
    assetType = 'i';
  }
  if (asset && endpoint && name) {
    return `https://${defaultHost}/${assetType}/${endpoint}/${name}${queryParams}${version}`;
  }

  return '';
};

export const getImageStaticLink = asset => `${process.env.ASSETS_STATIC_LINK}${asset.name}`;

export const doSomethingIfGif = (url, callback) => {
  axios({
    url,
    method: 'HEAD',
    responseType: 'json',
  }).then(({ headers }) => {
    if (headers['content-type'] === 'image/gif') {
      callback();
    }
  }).catch(error => error);
};

/**
 * @description Replace "_" and "-" with space, delete all text after first number;
 * for example: "HeroBanner_Main_Hero-1344v1" => "herobanner main hero"
 * @param imageName {String}
 * @return {String}
 */
export const getAltTextFromName = (imageName) => {
  if (!imageName || typeof imageName !== 'string') {
    return '';
  }

  return imageName?.replace(/_|-/gi, ' ')?.replace(/[0-9].*/gi, '')?.trim();
};
