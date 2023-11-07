
import React from "react";
import Client from "@/client";
import BlogPostPageComponent from "@/components/pages/BlogPostPageComponent";
    
const BlogPost = async () => {
  const data = await new Client().getByKey('introducing-osci-what-you-need-to-know-about-the-open-source-contributor-index')
  return <BlogPostPageComponent data={data} />;
}
        
export default BlogPost;
    