/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { getAltTextFromName } from './getImageCMS';
import { setPrevLink } from './auth';
import { getAuthLink } from '../api/auth/authHelper';

/**
 * @param logo {String}
 * @param width {Number}
 * @param className {String}
 * @param seoWidth {Number|Null}
 * @param seoHeight {Number|Null}
 * @param itemProp {String}
 * @returns {JSX.Element}
 */
export function getLogo(logo, {
  width = 56, className = 'amp-dc-image-pic', seoWidth = null, seoHeight = null
} = {}, itemProp = null) {
  const details = `?w=${width}&h=${width}&pngFormat=pngp&pngpalettesize=256&version=${process.env.VERSION || ''}`;

  const logoSrc = `//${logo?.defaultHost}/i/${logo?.endpoint}/${logo?.name}.png${details}`;
  const logoAlt = logo && logo.name ? getAltTextFromName(logo.name) : 'Default Logo';

  return (
    <picture>
      <source type="image/webp" srcSet={`${logoSrc}&fmt=webp`} />
      <source type="image/jp2" srcSet={`${logoSrc}&fmt=jp2`} />
      <source type="image/jpg" srcSet={`${logoSrc}&fmt=jpg`} />
      <img
        src={logoSrc}
        className={className}
        alt={logoAlt}
        itemProp={itemProp}
        width={seoWidth}
        height={seoHeight}
      />
    </picture>

  );
}

export function getLogoSrc(logo, { width = 56, isWebP = false } = {}) {
  const details = `?w=${width}&h=${width}&pngFormat=pngp&pngpalettesize=256&version=${process.env.VERSION || ''}${isWebP ? '&fmt=webp' : ''}`;
  const logoSrc = logo ? `//${logo.defaultHost}/i/${logo.endpoint}/${logo.name}.png${details}` : '';

  return logoSrc;
}

/**
 * Write to sessionStorage flag about auth redirect from solutions form;
 * Write to sessionStorage product owner info (this info using in <ContactButtonsSection />);
 * Redirect to auth page.
 *
 * @param solutionData {object}
 * @param formId {string}
 * @param packageSolutions {object}
 */
export const redirectToAuthAndSaveData = (solutionData, formId, packageSolutions) => {
  try {
    window.sessionStorage.setItem('solutionFormAfterAuth', 'true');
    window.sessionStorage.setItem('solutionData', JSON.stringify(solutionData));
    window.sessionStorage.setItem('formId', JSON.stringify(formId));
    if (packageSolutions) {
      window.sessionStorage.setItem('packageSolutions', JSON.stringify(packageSolutions));
    }

    setPrevLink();
    window.location.assign(getAuthLink());
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(`from redirectToAuthAndSaveData: ${error}`);
    }
  }
};

/**
 * Get solution and form data from sessionStorage abd set it to the state.
 * After that remove this data from sessionStorage.
 *
 * @param setSolutionData {function} - save solution data to state;
 * @param setFormId {function} - save formId data to state;
 * @param setPackageSolutions {function} - save package solutions data to state;
 */
export const getAfterAuthSolutionOwnerData = (setSolutionData, setFormId, setPackageSolutions) => {
  try {
    const solutionData = window.sessionStorage.getItem('solutionData');
    if (solutionData) {
      setSolutionData(JSON.parse(solutionData));
      window.sessionStorage.removeItem('solutionData');
    }

    const formId = window.sessionStorage.getItem('formId');
    if (formId) {
      setFormId(JSON.parse(formId));
      window.sessionStorage.removeItem('formId');
    }

    const packageSolutions = window.sessionStorage.getItem('packageSolutions');
    if (packageSolutions) {
      setPackageSolutions(JSON.parse(packageSolutions));
      window.sessionStorage.removeItem('packageSolutions');
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(`from getAfterAuthSolutionOwnerData: ${error}`);
    }
  }
};

/**
 * Get AuthRedirect flag from sessionStorage and open form. Then remove AuthRedirect flag;
 *
 * @param setOpen {function} - open form
 * @return {boolean}
 */
export const openFormAfterAuth = (setOpen) => {
  try {
    const isAfterAuthOpened = window.sessionStorage.getItem('solutionFormAfterAuth');
    if (isAfterAuthOpened) {
      setOpen(true);
      window.sessionStorage.removeItem('solutionFormAfterAuth');
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(`from openFormAfterAuth: ${error}`);
    }
  }
};
