import Client from "@/client";
import axios from "axios";
import React from "react";
import BlogPage from "@/pages-components/BlogPage";

const Blog = async () => {

  const { body } = await new Client().getById('ceda9517-1ef1-44b1-957a-c37bc5beae68');
  const { data: blogsData } = await axios.get(`https://prod.api.solutionshub.epam.com/api/public/content/v2/blogs2/list?size=8&page=1`)

  return (
    <BlogPage body={body} blogsData={blogsData} category="" page="1" />
  )
}

export default Blog;
