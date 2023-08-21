import { EMAIL_REGEX } from '../../v2_main/components/common/forms/config';

/* eslint-disable import/prefer-default-export */
export const uuid = (m = Math, d = Date, h = 16, s = num => m.floor(num).toString(h)) => (
  s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))
);

export function setClipboard(info) {
  const textField = document.createElement('input');
  textField.value = info;
  document.body.appendChild(textField);
  textField.select();
  textField.setSelectionRange(0, 99999);
  document.execCommand('copy');
  textField.remove();
}

export const getLabel = (label, globalVariables) => globalVariables?.keyValuePairs.filter(obj => obj.key === label)[0]?.value;

export const checkValidEmail = (email) => EMAIL_REGEX.test(email);

export const getCanonicalLink = (path, queryString) => {
  const { host } = window.location;
  const searchParams = new URLSearchParams(queryString.substring(1));
  if (searchParams.has('page')) searchParams.delete('page');
  const newSearch = `?${searchParams.toString()}`;
  const link = `https://${host}${path}${searchParams.toString() ? newSearch : ''}`;

  return link;
};

export const getPaginatedMeta = (meta, page) => {
  const paginatedMeta = {
    ...meta,
    title: `${meta?.title}${page ? ` | Page ${page}` : ''}`,
    description: `${meta?.description}${page ? ` - Page ${page}` : ''}`
  };

  return paginatedMeta;
};
