import BlogPost from "@/components/blog/BlogPost";
import React from "react";
import chalk from "chalk";
import HeroBanner from "@/components/common/hero-banner";
import styles from '@/components/blog/BlogBody.module.scss';
import classNames from "classnames";
import BlogCategories from "@/components/blog/BlogCategories";
import { getLabel } from "@/utils/common";
import ThematicContent from "@/components/blogpost/ThematicContent";
import Subscription from "@/components/blogpost/Subscription";
import Pagination from "@/components/common/pagination/Pagination";

const BlogPage = async ({ body, blogsData, category, page }) => {

  const bannerItem = body?.filteredPageBanners.find(item => item.id === category)?.slides[0] || body?.heroBanner;

  const categoriesMenuTitle = getLabel('Blog Categories Title', body?.globalVariables);

  return (
    <div>
      <HeroBanner
        banner={bannerItem}
        loading={false}
        isAuthorized={false}
        headerClassName={styles.blogHeroHeader}
        bannerClassName={styles.blogBanner}
        imageCarouselClassName={styles.imageCarousel}
        textCarouselClassName={styles.textCarousel}
        meta={null}
      />

      <main className={classNames(styles.mainContainer, {
        // [styles.withPagination]: blogsData?.total > postsCount,
        [styles.singleChild]: blogsData?.blogList?.length === 1
      })}
      >


        <section className={styles.contentContainer}>
          <div className={styles.wrapper}>

            <BlogCategories
              categoryList={body?.tagsContainer?.tags}
              // setCategory={setCategory}
              categorySearch={category}
              // setMeta={setMeta}
              defaultMeta={blogsData?.meta}
              menuTitle={categoriesMenuTitle}
              // querySearch={querySearch}
            />


          </div>

          <div className={styles.postList}>
            {blogsData?.blogList?.map(post => (
              <div className={styles.postListItem} key={post?._meta?.deliveryId}>
                <BlogPost post={post} mode="blog" />
              </div>
            ))}
          </div>
        </section>

        {
          blogsData?.total > body?.postsCount &&  (
            <div className={styles.paginationContainer}>
              <Pagination
                pageCount={Math.ceil(blogsData?.total / body?.postsCount)}
                page={page ? page - 1 : 0}
                pageId={`/${category ? category : ''}`}
              />
            </div>
          )
        }
      </main>

      <ThematicContent relatedPosts={body?.recommendedPostsReferences} withBottomPadding={true} />
      <Subscription zones={body?.globalVariables?.forbiddenZones} />
    </div>
  )
}

export default BlogPage;
