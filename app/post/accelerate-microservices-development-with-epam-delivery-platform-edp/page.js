
import React from "react";
import Client from "@/client";
import BlogPostPageComponent from "@/components/pages/BlogPostPageComponent";
    
const BlogPost = async () => {
  const data = await new Client().getByKey('accelerate-microservices-development-with-epam-delivery-platform-edp')
  return <BlogPostPageComponent data={data} />;
}
        
export default BlogPost;
    