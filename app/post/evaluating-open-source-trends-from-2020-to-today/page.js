
import React from "react";
import Client from "@/client";
import BlogPostPageComponent from "@/components/pages/BlogPostPageComponent";
    
const BlogPost = async () => {
  const data = await new Client().getByKey('evaluating-open-source-trends-from-2020-to-today')
  return <BlogPostPageComponent data={data} />;
}
        
export default BlogPost;
    