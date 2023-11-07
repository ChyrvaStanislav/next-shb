
import React from "react";
import Client from "@/client";
import BlogPostPageComponent from "@/components/pages/BlogPostPageComponent";
    
const BlogPost = async () => {
  const data = await new Client().getByKey('unleashing-the-power-of-ai-introducing-chatgpt')
  return <BlogPostPageComponent data={data} />;
}
        
export default BlogPost;
    