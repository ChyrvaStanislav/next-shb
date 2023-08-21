import Image from 'next/image'
import styles from './page.module.scss'
import Client from "@/client";
import axios from "axios";
import BlogPost from "@/components/blog/BlogPost";
import React from "react";

const Blog = async () => {

  const { body } = await new Client().getById('ceda9517-1ef1-44b1-957a-c37bc5beae68');
  const { data: blogsData } = await axios.get('https://prod.api.solutionshub.epam.com/api/public/content/v2/blogs2/list?size=8&page=1')

  return (
    <main className={styles.main}>
      {blogsData?.blogList?.map(post => (
        <div className={styles.postListItem} key={post._meta.deliveryId}>
          <BlogPost post={post}  mode="blog" />
        </div>
      ))}
    </main>
  )
}

export default Blog;
