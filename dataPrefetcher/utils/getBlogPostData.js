const { resolve } = require('path');
const { mkdir, writeFile } = require('fs').promises;
const { existsSync } = require('fs');
const axios = require("axios");
const { BLOG_POST_URL_PART, BLOG_POST_DATA_PATH } = require("../constants.js");

const getBlogPostsData = async (postId, contentUrl) => {
  try {
    const data = await axios.get(`${contentUrl}${BLOG_POST_URL_PART}${postId}`);
    if (!existsSync(`${process.cwd()}${BLOG_POST_DATA_PATH}`)) {
      await mkdir(`${process.cwd()}${BLOG_POST_DATA_PATH}`);
    }

    await mkdir(`${process.cwd()}${BLOG_POST_DATA_PATH}${postId}`);
    await writeFile(resolve(`${process.cwd()}${BLOG_POST_DATA_PATH}${postId}/page.js`), `
import React from "react";
import Client from "@/client";
import BlogPostPageComponent from "@/components/pages/BlogPostPageComponent";
    
const BlogPost = async () => {
  const data = await new Client().getByKey('${postId}')
  return <BlogPostPageComponent data={data} />;
}
        
export default BlogPost;
    `);
    console.log(`Fetched "${postId}: post data`);
  } catch (e) {
    console.log(`ERROR getBlogPostsData: from ${postId}; ${e.message}`);
  }
};

module.exports = getBlogPostsData;