/**
 * @param href {string}
 * @return {boolean}
 */
const isExternalLink = href => !(new RegExp('https://solutionshub.epam.com/').test(href));

export default isExternalLink;
