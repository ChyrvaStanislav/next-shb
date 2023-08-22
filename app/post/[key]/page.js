import React from "react";
import Client from "@/client";
import BlogPostContent from "@/components/blogpost/BlogPostContent";
// import BlogPostBody from "@/components/blogpost/BlogPostBody";
import chalk from "chalk";
import Image from "next/image";
import { getImageCMS, getAltTextFromName } from "@/utils/getImageCMS";
import styles from '@/components/blogpost/BlogPostBody.module.scss';
import { Typography } from "@/components/html";
import classNames from "classnames";

const BlogPost = async ({ params }) => {

  const data = await new Client().getByKey(params.key)

  const {
    title,
    date,
    timeToRead,
    image,
    imageAlt,
    imageTitle,
    content,
    tags,
    seoKeywords,
    isDarkMode,
    authorCard,
  } = data?.body;

  return (
    <div className={styles.mainContainer}>
      {/*<BlogPostBody*/}
      {/*  relatedPosts={mainPost?.recommendedPostsReferences}*/}
      {/*  post={data.mainPpost}*/}
      {/*  authorCard={data?.mainPost?.authorCard}*/}
      {/*  forbiddenZones={data?.globalVariables?.forbiddenZones}*/}
      {/*/>*/}
      <section className={styles.contentContainer}>
        <div>


          <div className={classNames(styles.blogPostheader, { [styles.dark]: isDarkMode })}>
            <section className={styles.headerContainer}>
              <Typography itemProp="headline" type="h1" className={styles.title}>{title}</Typography>
              <div className={styles.additionalInfoContainer}>
                <div className={styles.blogpostDates}>
                  <Typography itemProp="datePublished" type="span" variant="small_secondary"
                              className={styles.date}>{date}</Typography>
                  <Typography
                    type="span"
                    variant="small_secondary"
                    className={styles.timeRead}
                  >
                    {`${timeToRead} min read`}
                  </Typography>
                </div>
                {/*{tags && (*/}
                {/*  <div className={styles.tagsContainer}>*/}
                {/*    {tags.map(tag => (*/}
                {/*      <TagChip*/}
                {/*        key={tag?.id}*/}
                {/*        className={styles.tagItem}*/}
                {/*        label={tag?.label}*/}
                {/*        link={`/blog?category=${tag?.id}`}*/}
                {/*      />*/}
                {/*    ))}*/}
                {/*  </div>*/}
                {/*)}*/}
              </div>
              {/*{ tags?.length > 0 ? <meta itemProp="articleSection" content={tags[0]?.label} /> : null }*/}
              {/*{ tags?.length > 0 ? <meta itemProp="keywords" content={seoKeywords} /> : null }*/}
              <meta itemType="https://schema.org/Organization" itemProp="author" content={authorCard?.name} />
            </section>
          </div>


          <figure className={styles.withoutMargin}>
            <Image
              className={styles.image}
              src={getImageCMS(image, '?maxW=1200&qlt=80&fmt=jpg&bg=rgb(255,255,255)')}
              alt={imageAlt || getAltTextFromName(image.name)}
              title={imageTitle || null}
              itemProp="image"
              width="600"
              height="300"
            />
          </figure>

          <BlogPostContent
            content={content}
          />
        </div>

      </section>
    </div>
  )
    ;
}

export default BlogPost;