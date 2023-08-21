import React from 'react';
import Image from "next/image";

const LOGO_URLS = {
  allTypes: 'https://cdn.media.amplience.net/i/epammarketplace/All_types_no_shadows',
  productService: 'https://cdn.media.amplience.net/i/epammarketplace/Product_Service_no_shadows',
  acceleratorService: 'https://cdn.media.amplience.net/i/epammarketplace/Accelerator_Service_no_shadows',
  productAccelerator: 'https://cdn.media.amplience.net/i/epammarketplace/Product_Accelerator_no_shadows',
};

export const getMultiTypeLogoSrc = (types, options) => {
  const typeIds = types?.map(item => item.id);
  const { width, isWebP } = options;
  const details = `?w=${width}&h=${width}&pngFormat=pngp&pngpalettesize=256&version=${process.env.VERSION || ''}${isWebP ? '&fmt=webp' : ''}`;

  if (types.length === 3) {
    return `${LOGO_URLS.allTypes}${details}`;
  }
  if (typeIds.includes('accelerator') && typeIds.includes('service')) {
    return `${LOGO_URLS.acceleratorService}${details}`;
  }
  if (typeIds.includes('accelerator') && typeIds.includes('product')) {
    return `${LOGO_URLS.productAccelerator}${details}`;
  }
  if (typeIds.includes('service') && typeIds.includes('product')) {
    return `${LOGO_URLS.productService}${details}`;
  }

  return '';
};

const getMultiTypeLogo = (types, options, className, itemProp = null) => {
  const src = getMultiTypeLogoSrc(types, options);
  const { seoWidth = null, seoHeight = null } = options;

  return (
    <Image
      className={className}
      src={src}
      alt="multitype-logo"
      itemProp={itemProp}
      width={seoWidth}
      height={seoHeight}
    />
  );
};

export default getMultiTypeLogo;
