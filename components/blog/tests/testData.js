/* eslint-disable max-len */

export const blogPostData = {
  _meta: {
    schema: 'http://epam.com/blogpost',
    deliveryKey: 'swing-trading-vs-day-trading',
  },
  image: {
    _meta: {
      schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link'
    },
    id: '182d517e-2ddf-476e-a08a-acd683620bd9',
    name: 'header',
    endpoint: 'epammarketplace',
    defaultHost: 'cdn.media.amplience.net'
  },
  content: [
    {
      image: {
        _meta: {
          schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link'
        },
        id: '02dbf9c5-2405-4a76-a9c0-6275df823890',
        name: 'day_trading',
        endpoint: 'epammarketplace',
        defaultHost: 'cdn.media.amplience.net'
      },
      caption: 'Day Trading Pros and Cons',
      text: 'Although very similar, the main difference between day.',
      imageAlt: 'Day Trading Pros and Cons',
      imageTitle: 'Day Trading Pros and Cons'
    }
  ],
  tags: [
    {
      meta: {
        title: 'Fintech News and Articles  | EPAM SolutionsHub',
        description: 'Read useful articles about Fintech.'
      },
      label: 'FinTech',
      id: 'fintech'
    }
  ],
  type: [{}],
  title: 'Swing Trading vs Day Trading',
  description: 'Although very similar.',
  imageAlt: 'Swing Trading vs Day Trading',
  imageTitle: 'Swing Trading vs Day Trading',
  timeToRead: 5,
  date: 'November 8, 2022',
  publishDate: 'November 8, 2022',
};

export const solutionData = {
  _meta: {
    name: 'MarketMaker',
    schema: 'http://epam.com/solution',
    deliveryKey: 'marketmaker',
  },
  tags: [
    {
      _meta: {
        name: 'financialservices_industry_tag',
        schema: 'http://epam.com/tag',
        deliveryId: '0be0aa17-4616-41f9-9ead-1cd594f5848b'
      },
      filteredContent: {
        title: 'Financial Services Software Solutions',
        description: 'The financial services industry.'
      },
      meta: {
        description: 'Explore SolutionsHub and find what.',
        title: 'Financial Services | EPAM SolutionsHub'
      },
      label: 'Financial Services',
      id: 'financial_services'
    }
  ],
  logo: {
    _meta: {
      schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link'
    },
    id: 'ef7b9fc5-31e0-4cd6-bb77-040201a2de57',
    name: 'market_maker_logo',
    endpoint: 'epammarketplace',
    defaultHost: 'cdn.media.amplience.net'
  },
  name: 'MarketMaker',
  secondaryName: 'MarketMaker Secondary Name',
  shortDescription: 'Institutional-grade trading system is used for.',
};

