
import React from "react";
import Client from "@/client";
import BlogPostPageComponent from "@/components/pages/BlogPostPageComponent";
    
const BlogPost = async () => {
  const data = await new Client().getByKey('test-case-creation-for-further-automation')
  return <BlogPostPageComponent data={data} />;
}
        
export default BlogPost;
    