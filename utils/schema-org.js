/**
 * @description Return random rating within 3.8 - 4.9. Used in schema.org aggregationRating ratingValue;
 * @return {string}
 */
export const getRandomRating = () => (3.8 + Math.random()).toFixed(1);

/**
 * @description Return random review count within 101 - 1099. Used in schema.org aggregationRating ratingCount;
 * @return {string}
 */
export const getRandomRatingCount = () => `${Math.floor(Math.random() * 999) + 100}`;


/**
 * @description Return Date + 1 year in ISO string format. Used in schema.org priceValidUntil;
 * @return {string}
 */
export const getNextYearDate = () => {
  const date = new Date(new Date());
  date.setDate(date.getDate() + 366);

  return date.toISOString();
};
