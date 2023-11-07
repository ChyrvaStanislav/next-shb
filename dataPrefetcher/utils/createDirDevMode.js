const { resolve } = require('path');
const { mkdir } = require('fs').promises;
const { existsSync } = require('fs');
const { BLOG_POST_DATA_PATH, STATIC_DATA_PATH, DIGEST_DATA_PATH } = require("../constants.js");

const createDirForDevMode = async () => {
  try {
    if (!existsSync(resolve(`${process.cwd()}${STATIC_DATA_PATH}`))) {
      await mkdir(resolve(`${process.cwd()}${STATIC_DATA_PATH}`));
    }
    if (!existsSync(resolve(`${process.cwd()}${BLOG_POST_DATA_PATH}`))) {
      await mkdir(resolve(`${process.cwd()}${BLOG_POST_DATA_PATH}`));
    }
    if (!existsSync(resolve(`${process.cwd()}${DIGEST_DATA_PATH}`))) {
        await mkdir(resolve(`${process.cwd()}${DIGEST_DATA_PATH}`));
    }
  } catch (err) {
    console.log('ERROR createDirForDevMode', err);
  }
};

module.exports = createDirForDevMode;