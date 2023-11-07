
import React from "react";
import Client from "@/client";
import BlogPostPageComponent from "@/components/pages/BlogPostPageComponent";
    
const BlogPost = async () => {
  const data = await new Client().getByKey('software-testing-tools-and-how-to-improve-their-performance')
  return <BlogPostPageComponent data={data} />;
}
        
export default BlogPost;
    