import sortingQueriesConstants from '@/constants/sortingQueries';
import { getAltTextFromName, getImageCMS } from '@/utils/getImageCMS';
import { getMultiTypeLogoSrc } from '@/components/common/utils';
import { getLogoSrc } from '@/utils/solutions';

const getPostTypeAndDetails = (post) => {
  const _meta = post?._meta;
  const schema = _meta?.schema;
  if (schema?.includes('blogpost')) {
    return {
      postType: 'Blog Post',
      linkSrc: `/post/${_meta?.deliveryKey}`,
      date: post?.date,
      description: post?.description,
      timeToRead: post?.timeToRead,
      title: post?.title,
      tags: post?.tags,
      image: post?.image,
      content: post?.content,
      imageAlt: post?.imageAlt,
      imageTitle: post?.imageTitle,
    };
  }
  if (schema?.includes('tag')) {
    return {
      postType: 'Solution Category',
      linkSrc: `/search?categories=${post?.id}&sort=${sortingQueriesConstants.default}`,
      date: '',
      timeToRead: '',
      title: post?.label,
      description: post?.meta?.description,
      secondName: post?.secondaryName,
      tags: null,
      image: post?.imageForRelatedBlock,
    };
  }
  if (schema?.includes('solution')) {
    const tags = post?.tags?.map((item) => {
      let linkType = '';
      if (item._meta?.name?.includes('industry') || item._meta?.name?.includes('industries')) {
        linkType = 'industries';
      }
      if (item._meta?.name?.includes('Categories')) {
        linkType = 'categories';
      }

      return { ...item, link: `/search?${linkType}=${item?.id}&sort=${sortingQueriesConstants.default}` };
    });

    // get default solution logo src and alt if no specific logo
    let logoSrc = null;
    let logoAlt = null;

    if (!post?.logo) {
      logoSrc = post?.type?.length > 1
        ? getMultiTypeLogoSrc(post?.type, { width: 250, isWebP: true })
        : getLogoSrc(post?.type?.[0].typeIcon, { width: 250, isWebP: true });

      logoAlt = post?.type?.length > 1 ? 'Multi-type Logo' : 'Default Logo';
    }

    return {
      postType: 'Solution',
      linkSrc: `/solution/${_meta?.deliveryKey}`,
      date: '',
      timeToRead: '',
      title: post?.name,
      description: post?.shortDescription,
      secondName: post?.secondaryName,
      tags,
      image: post?.logo,
      logoSrc,
      logoAlt,
    };
  }
  /* Save this as backup */
  // if (schema?.includes('updatepost')) {
  //   return {
  //     postType: 'Update Post',
  //     linkSrc: `/whatsnew/${_meta?.deliveryKey}`,
  //     date: post?.publishDate,
  //     timeToRead: '',
  //     title: post?.title,
  //     tags: null,
  //     image: post?.image,
  //     imageAlt: post?.imageAlt,
  //     imageTitle: post?.imageTitle,
  //   };
  // }

  return {};
};

/**
 * @param image {object}
 * @param type {array}
 * @param title {string}
 * @returns {String|null|*}
 */
export const getRelatedBlogPostAlt = (image, type, title) => {
  if (image && image?.name) return getAltTextFromName(image?.name);

  if (!type) {
    return null;
  }
  if (!image && type && type[0]?.typeIcon) return getAltTextFromName(type[0]?.typeIcon?.name);

  return title;
};

/**
 * @param image {object}
 * @param type {array}
 * @param postType {string}
 * @param breakpoint {string}
 * @returns {null|*|string}
 */
export const getImage = (image, type, postType, breakpoint) => {
  if (breakpoint !== 'xs' && breakpoint !== 'none' && postType === 'Solution') {
    if (!type) {
      return null;
    }

    return !image && type?.length > 1
      ? getMultiTypeLogoSrc(type, { width: '94' })
      : getImageCMS(image || (type && type[0]?.typeIcon), '?maxW=300&qlt=80&fmt=webp&bg=rgb(255,255,255)');
  }

  switch (breakpoint) {
    case 'none':
      return null;
    case 'xs':
      return null;
    case 'sm':
      return getImageCMS(image, '?maxW=300&qlt=80&fmt=webp&bg=rgb(255,255,255)');
    default:
      return getImageCMS(image, '?maxW=800&qlt=80&fmt=webp&bg=rgb(255,255,255)');
  }
};

export default getPostTypeAndDetails;
