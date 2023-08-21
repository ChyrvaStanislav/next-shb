import React from 'react';
// import { Link } from '../../html';
import Link from 'next/link';
import { getMultiTypeLogoSrc } from '../utils';
import styles from './Forms.module.scss';

const CONTACT_US = 'contuctUs';
const REQUEST_SOLUTION = 'requestSolution';
const SUBMIT_ASSET = 'submitAsset';
const SUBMIT_CV = 'submitCv';

// const successScreenTitle = () => (`Thank you ${window.innerWidth < 568 ? '\n' : ''} for submitting asset`);
const successScreenTitle = () => (`Thank you for submitting asset`);

const configList = {
  [CONTACT_US]: {
    successScreenConfig: {
      formType: 'main-request',
      title: 'Your Question is Sent',
      subDescriptionFirst: 'Check your inbox for confirmation.',
      subDescriptionSecond: 'One of our representatives will respond shortly.',
    }
  },
  [REQUEST_SOLUTION]: {
    successScreenConfig: {
      formType: 'main-request',
      title: 'Your Request is Sent',
      subDescriptionFirst: 'Check your inbox for confirmation.',
      subDescriptionSecond: 'One of our representatives will respond shortly.',
    }
  },
  [SUBMIT_CV]: {
    successScreenConfig: {
      formType: 'main-request',
      title: 'Your Request is Sent',
      subDescriptionSecond: 'One of our representatives will respond shortly.',
    }
  },
  [SUBMIT_ASSET]: {
    successScreenConfig: {
      formType: 'inventory-support',
      title: successScreenTitle(),
      subDescriptionFirst: 'Check your inbox for confirmation.',
      subDescriptionSecond: 'We will contact you shortly.',
    }
  }
};
const getConfig = key => configList[key];

const getLogoPath = ({ logo, type }) => {
  if (logo) {
    return `https://${logo.defaultHost}/i/${logo.endpoint}/${encodeURI(logo.name)}?qlt=80`;
  }

  if (type.length === 1) {
    return `https://${type[0]?.typeIcon?.defaultHost}/i/${type[0]?.typeIcon?.endpoint}/${encodeURI(type[0]?.typeIcon?.name)}?qlt=80`;
  }

  return getMultiTypeLogoSrc(type, {});
};

const confirmText = (
  <>
    I consent to EPAM Systems, Inc. (EPAM) processing my personal information as set out in the
    {' '}
    <Link href="/privacy-policy" type="link" target="_blank" className={styles.confirmLink}>
      SolutionsHub Privacy Policy
    </Link>
    {' '}
    and
    {' '}
    <Link href="/cookie-policy" type="link" target="_blank" className={styles.confirmLink}>
      Cookie Policy
    </Link>
    {' '}
    and that, given the
    global nature of EPAM’s business, such processing may take place outside of my home jurisdiction.
  </>
);

/*  eslint-disable no-useless-escape */
const ENGLISH_TEXT_ONLY_REGEX = /^[A-Za-z\b\n\t ]+$/;
const ENGLISH_TEXT_NUMBERS_CHARACTERS_REGEX = /^[a-zA-Z0-9!@#$%^&*<>()_+\-=\[\]{};`':"\\,.<>\/?\b\n\t ]*$/;
const ALLOWED_ENGLISH_AND_SPECIAL_CHARACTERS_REGEX = /^[A-Za-z,\-'`/ ]+$/;
const ALLOWED_ENGLISH_NUMBERS_AND_SPECIAL_CHARACTERS_REGEX = /^[A-Za-z0-9,\-'`/ ]+$/;
const DISALLOWED_CHARACTERS_FOR_EMAIL_REGEX = /^[^!#$%&'*\\+\/=?^`{|'\-]*$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/;
const NAMES_REGEX = /(^[A-Za-z]+)([-,']?)([A-Za-z]*)([\s]?)([A-Za-z]+)([-,']?)([A-Za-z]*)([\s]?)([A-Za-z]+)([-,']?)([A-Za-z]*$)/;

const EMPTY_FIRST_NAME_ERROR_TEXT = 'Please enter your first name.';
const EMPTY_FULL_NAME_ERROR_TEXT = 'Please enter your full name.';
const EMPTY_LAST_NAME_ERROR_TEXT = 'Please enter your last name.';
const EMPTY_EMAIL_ERROR_TEXT = 'Please enter your email address.';
const EMPTY_ASSET_NAME_ERROR_TEXT = 'Please enter your asset name.';
const INCORRECT_EMAIL_ERROR_TEXT = 'Enter in the format: firstname@domain.com, firstname.initial@domain.com, firstname.secondname@domain.com.';
const ALOWWED_ENGLISH_AND_SPECIAL_CHARACTERS_ERROR_TEXT = 'Can only enter the Latin letters with spaces, hyphens, a comma, and apostrophes.';
const ALOWWED_ENGLISH_NUMBERS_AND_SPECIAL_CHARACTERS_ERROR_TEXT = `Can only enter the letter with 
numbers, spaces, hyphens, a comma, and apostrophes.`;
const ALOWWED_ENGLISH_NUMBERS_AND_SPECIAL_CHARACTERS_ERROR_TEXT_2 = `Can only enter the Latin letters with 
numbers, spaces, hyphens, a comma, and apostrophes.`;
const ENGLISH_ONLY_ERROR_TEXT = 'Please match the requested format: English only.';
const MIN_THREE_CHARACTERS_ERROR_TEXT = 'Write minimum of 3 characters.';
const MAX_THIRTY_CHARACTERS_ERROR_TEXT = 'Write maximum 30 characters.';
const MAX_SIXTY_CHARACTERS_ERROR_TEXT = 'Write maximum 60 characters.';
const BUSINESS_EMAIL_ERROR_TEXT = 'This field requires business email (no @gmail, @yahoo, etc. are allowed).';
const NAMES_REGEX_TEXT = 'Can only enter the letter with spaces, hyphens, a comma, and apostrophes.';

export {
  CONTACT_US,
  REQUEST_SOLUTION,
  SUBMIT_ASSET,
  SUBMIT_CV,
  getConfig,
  getLogoPath,
  confirmText,
  ENGLISH_TEXT_ONLY_REGEX,
  DISALLOWED_CHARACTERS_FOR_EMAIL_REGEX,
  EMAIL_REGEX,
  NAMES_REGEX,
  NAMES_REGEX_TEXT,
  EMPTY_FIRST_NAME_ERROR_TEXT,
  EMPTY_LAST_NAME_ERROR_TEXT,
  ALOWWED_ENGLISH_NUMBERS_AND_SPECIAL_CHARACTERS_ERROR_TEXT,
  ALOWWED_ENGLISH_NUMBERS_AND_SPECIAL_CHARACTERS_ERROR_TEXT_2,
  EMPTY_EMAIL_ERROR_TEXT,
  INCORRECT_EMAIL_ERROR_TEXT,
  EMPTY_ASSET_NAME_ERROR_TEXT,
  BUSINESS_EMAIL_ERROR_TEXT,
  ALLOWED_ENGLISH_NUMBERS_AND_SPECIAL_CHARACTERS_REGEX,
  ENGLISH_TEXT_NUMBERS_CHARACTERS_REGEX,
  ALLOWED_ENGLISH_AND_SPECIAL_CHARACTERS_REGEX,
  ALOWWED_ENGLISH_AND_SPECIAL_CHARACTERS_ERROR_TEXT,
  ENGLISH_ONLY_ERROR_TEXT,
  MIN_THREE_CHARACTERS_ERROR_TEXT,
  MAX_THIRTY_CHARACTERS_ERROR_TEXT,
  MAX_SIXTY_CHARACTERS_ERROR_TEXT,
  EMPTY_FULL_NAME_ERROR_TEXT,
};
