/* eslint-disable import/prefer-default-export */
import cn from 'classnames';
import { kebabCase } from 'lodash';

export const cns = (styles, ...params) => {
  const names = [styles.col, styles[params[4]]];
  names.push(styles['col--xs-'.concat(params[0])]);
  names.push(styles['col--sm-'.concat(params[1])]);
  names.push(styles['col--md-'.concat(params[2])]);
  names.push(styles['col--lg-'.concat(params[3])]);

  return cn(names);
};

export const cnsoffset = (styles, ...params) => {
  const names = [styles.col, styles[params[2]]];
  names.push(styles['col--xs-'.concat(params[0][0])]);
  names.push(styles['col--sm-'.concat(params[0][1])]);
  names.push(styles['col--md-'.concat(params[0][2])]);
  names.push(styles['col--lg-'.concat(params[0][3])]);
  names.push(styles['col--xs-offset-'.concat(params[1][0])]);
  names.push(styles['col--sm-offset-'.concat(params[1][1])]);
  names.push(styles['col--md-offset-'.concat(params[1][2])]);
  names.push(styles['col--lg-offset-'.concat(params[1][3])]);

  return cn(names);
};

// eslint-disable-next-line no-shadow
export const uuid = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) => s(d.now() / 1000)
  + ' '.repeat(h).replace(/./g, () => s(m.random() * h));

export const getNavigationList = (data) => {
  const navigationList = data.reduce((accumulator, item) => {
    accumulator.push({
      key: kebabCase(item.name),
      value: item.name
    });

    return accumulator;
  }, []);

  return navigationList;
};

/**
 * @desc We should remove rel="noreferrer" for some solutions sites. Using this function for determine which exactly.
 * @param siteUrl {string}
 * @return {boolean}
 */
export const isReferrer = (siteUrl) => /telescopeai|infongen/.test(siteUrl);
