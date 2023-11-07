
import React from "react";
import Client from "@/client";
import BlogPostPageComponent from "@/components/pages/BlogPostPageComponent";
    
const BlogPost = async () => {
  const data = await new Client().getByKey('want-to-boost-the-growth-of-se-try-coding-stories')
  return <BlogPostPageComponent data={data} />;
}
        
export default BlogPost;
    