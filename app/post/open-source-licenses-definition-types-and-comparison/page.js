
import React from "react";
import Client from "@/client";
import BlogPostPageComponent from "@/components/pages/BlogPostPageComponent";
    
const BlogPost = async () => {
  const data = await new Client().getByKey('open-source-licenses-definition-types-and-comparison')
  return <BlogPostPageComponent data={data} />;
}
        
export default BlogPost;
    