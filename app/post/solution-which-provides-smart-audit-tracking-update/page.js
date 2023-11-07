
import React from "react";
import Client from "@/client";
import BlogPostPageComponent from "@/components/pages/BlogPostPageComponent";
    
const BlogPost = async () => {
  const data = await new Client().getByKey('solution-which-provides-smart-audit-tracking-update')
  return <BlogPostPageComponent data={data} />;
}
        
export default BlogPost;
    