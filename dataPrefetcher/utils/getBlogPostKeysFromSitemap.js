const getBlogPostKeysFromSitemap = (sitemap) => sitemap
  .replace(/<lastmod>.*?<\/lastmod>|<url>|<\/url>|<\/loc>/gi, '')
  .split('<loc>')
  .filter(el => el.includes('blog/post'))
  .map(el => el.replace('https://solutionshub.epam.com/blog/post/', ''));

module.exports = getBlogPostKeysFromSitemap;