const axios = require("axios");
const createDirDevMode = require('./utils/createDirDevMode.js');
const clearStaticData = require('./utils/clearStaticData.js');
const getBlogPostsData = require('./utils/getBlogPostData.js');
const getDigestsData = require('./utils/getDigestsData.js');
const getBlogPostKeysFromSitemap = require('./utils/getBlogPostKeysFromSitemap.js');
const { SITEMAP_URL } = require("./constants.js");
const { CONTENT_URL_QA, CONTENT_URL_PROD } = require("./constants.js");


const prefetchBlogPosts = async (url) => {
  const { data: sitemap } = await axios.get(SITEMAP_URL);
  const blogPosts = getBlogPostKeysFromSitemap(sitemap);


  for (let postId of blogPosts) {
    await getBlogPostsData(postId, url);
  }
}

(async () => {
  if (process.argv[2] === '-dev') {
    await clearStaticData();
    console.log('Fetching is disabled in DEV mode');
  } else {
    const isQa = process.argv[2] === '-qa';
    console.log('Fetching data...', 'MODE:', isQa ? 'QA' : 'PROD');

    await clearStaticData();

    try {
      const URL = isQa ? CONTENT_URL_QA : CONTENT_URL_PROD;
      await prefetchBlogPosts(URL);
    } catch (err) {
      console.log('ERROR ', err);
    }

    console.log('---------------------------------------------------');
    console.log('Fetching finished');
    console.log('---------------------------------------------------');
  }
})();





