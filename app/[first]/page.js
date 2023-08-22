import Client from "@/client";
import axios from "axios";
import React from "react";
import BlogPage from "@/pages-components/BlogPage";

const BlogWithCategoryOrPage = async ({ params }) => {

  const { first = "" } = params;
  let page = 0;
  let category = '';

  if (first && isNaN(+first)) {
    category = first;
  } else if (first && !isNaN(+first)) {
    page = +first;
  }

  const { body } = await new Client().getById('ceda9517-1ef1-44b1-957a-c37bc5beae68');
  const { data: blogsData } = await axios.get(`https://prod.api.solutionshub.epam.com/api/public/content/v2/blogs2/list?category=${category}&size=8&page=${page === 0 ? 1 : page}`)

  return (
    <BlogPage body={body} blogsData={blogsData} category={category} page={page} />
  )
}

export default BlogWithCategoryOrPage;
