/* eslint-disable max-len */
import getPostTypeAndDetails, { getRelatedBlogPostAlt, getImage } from '../utils';
import { blogPostData, solutionData } from './testData';

describe('getRelatedBlogPostAlt works', () => {
  test('should getRelatedBlogPostAlt return alt from IMAGE NAME', () => {
    expect(getRelatedBlogPostAlt({ name: 'enterprise_software_heading_image' }, null, '')).toBe('enterprise software heading image');
  });

  test('should getRelatedBlogPostAlt return NULL without image and type', () => {
    expect(getRelatedBlogPostAlt(undefined, null, '')).toBeNull();
  });

  test('should getRelatedBlogPostAlt return alt from TYPE ICON if no image', () => {
    expect(getRelatedBlogPostAlt(undefined, [{ typeIcon: { name: 'enterprise_software_heading_image' } }], ''))
      .toBe('enterprise software heading image');
  });

  test('should getRelatedBlogPostAlt return TITLE without image and typeIcon', () => {
    expect(getRelatedBlogPostAlt(undefined, [{}], 'Some Title')).toBe('Some Title');
  });
});

describe('getImage works', () => {
  const image = {
    _meta: {
      schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link'
    },
    id: 'aa25d2cd-c051-46a8-9720-fc3afdca6707',
    name: 'enterprise_software_heading_image',
    endpoint: 'epammarketplace',
    defaultHost: 'cdn.media.amplience.net'
  };

  const type = [
    {
      typeIcon: {
        endpoint: 'epammarketplace',
        defaultHost: 'cdn.media.amplience.net',
        name: 'DefaultSolutionLogo_Product_1',
        _meta: {
          schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link'
        },
        id: 'ac1d0541-373f-4b14-a10c-f3f27236b19c'
      }
    }
  ];

  test('should getImage return null for solution without type', () => {
    expect(getImage(null, null, 'Solution', 'xl')).toBeNull();
  });

  test('should getImage return link for solution with type', () => {
    expect(getImage(null, type, 'Solution', 'xl'))
      .toBe('https://cdn.media.amplience.net/i/epammarketplace/DefaultSolutionLogo_Product_1?maxW=300&qlt=80&fmt=webp&bg=rgb(255,255,255)&version=');
  });

  test('should getImage return link for NON solution with sm breakpoint', () => {
    expect(getImage(image, null, 'Blog Post', 'sm'))
      .toBe('https://cdn.media.amplience.net/i/epammarketplace/enterprise_software_heading_image?maxW=300&qlt=80&fmt=webp&bg=rgb(255,255,255)&version=');
  });

  test('should getImage return link for NON solution with more than sm breakpoint', () => {
    expect(getImage(image, null, 'Blog Post', 'xl'))
      .toBe('https://cdn.media.amplience.net/i/epammarketplace/enterprise_software_heading_image?maxW=800&qlt=80&fmt=webp&bg=rgb(255,255,255)&version=');
  });

  test('should getImage return null for NON solution with less than sm breakpoint', () => {
    expect(getImage(image, null, 'Blog Post', 'xs')).toBeNull();
  });
});



describe('getPostTypeAndDetails return correct data', () => {
  test('should getPostTypeAndDetails return correct data for BLOG POST', () => {
    const blogPostResult = {
      content: [
        {
          caption: 'Day Trading Pros and Cons',
          image: {
            _meta: {
              schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
            },
            defaultHost: 'cdn.media.amplience.net',
            endpoint: 'epammarketplace',
            id: '02dbf9c5-2405-4a76-a9c0-6275df823890',
            name: 'day_trading',
          },
          imageAlt: 'Day Trading Pros and Cons',
          imageTitle: 'Day Trading Pros and Cons',
          text: 'Although very similar, the main difference between day.',
        },
      ],
      date: 'November 8, 2022',
      description: 'Although very similar.',
      image: {
        _meta: {
          schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
        },
        defaultHost: 'cdn.media.amplience.net',
        endpoint: 'epammarketplace',
        id: '182d517e-2ddf-476e-a08a-acd683620bd9',
        name: 'header',
      },
      imageAlt: 'Swing Trading vs Day Trading',
      imageTitle: 'Swing Trading vs Day Trading',
      linkSrc: '/blog/post/swing-trading-vs-day-trading',
      postType: 'Blog Post',
      tags: [
        {
          id: 'fintech',
          label: 'FinTech',
          meta: {
            description: 'Read useful articles about Fintech.',
            title: 'Fintech News and Articles  | EPAM SolutionsHub',
          },
        },
      ],
      timeToRead: 5,
      title: 'Swing Trading vs Day Trading',
    };

    expect(getPostTypeAndDetails(blogPostData)).toEqual(blogPostResult);
  });

  test('should getPostTypeAndDetails return correct data for SOLUTION', () => {
    const solutionResult = {
      date: '',
      description: 'Institutional-grade trading system is used for.',
      image: {
        _meta: {
          schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
        },
        defaultHost: 'cdn.media.amplience.net',
        endpoint: 'epammarketplace',
        id: 'ef7b9fc5-31e0-4cd6-bb77-040201a2de57',
        name: 'market_maker_logo',
      },
      linkSrc: '/solution/marketmaker',
      postType: 'Solution',
      logoAlt: null,
      logoSrc: null,
      secondName: 'MarketMaker Secondary Name',
      tags: [
        {
          _meta: {
            deliveryId: '0be0aa17-4616-41f9-9ead-1cd594f5848b',
            name: 'financialservices_industry_tag',
            schema: 'http://epam.com/tag',
          },
          filteredContent: {
            description: 'The financial services industry.',
            title: 'Financial Services Software Solutions',
          },
          id: 'financial_services',
          label: 'Financial Services',
          link: '/search?industries=financial_services&sort=most-popular',
          meta: {
            description: 'Explore SolutionsHub and find what.',
            title: 'Financial Services | EPAM SolutionsHub',
          },
        },
      ],
      timeToRead: '',
      title: 'MarketMaker',

    };

    expect(getPostTypeAndDetails(solutionData)).toEqual(solutionResult);
  });
});
