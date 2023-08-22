export const payloadBuilder = (config) => { //eslint-disable-line
  const url = new URLSearchParams();

  if (config.terms) url.append('terms', config.terms);
  if (config.types) url.append('types', config.types);
  if (config.licence) url.append('licence', config.licence);
  if (config.sort) url.append('sort', config.sort);
  if (config.size) url.append('size', config.size);
  if (config.offset) url.append('offset', config.offset);
  if (config.query) url.append('query', config.query);
  if (config.skip) url.append('offset', config.skip);
  if (config.aggs) url.append('aggs', true);
  if (config.dataType) url.append('dataType', config.dataType);
  if (config.period) url.append('period', config.period);

  return url.toString();
};
