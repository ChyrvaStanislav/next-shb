import axios from 'axios';
import cancellable from './cancellable_request';
import { payloadBuilder } from './utils';

export default {
  getPage: (id, token, config) => axios.get(`${process.env.CONTENT_URL}/v2/pages/${id}`, config),
  getInternalPage: (id, token, config) => axios.get(`${process.env.CONTENT_URL}/v2/pages/private/${id}?token=${token}`, config),
  getPart: (id, token, config) => axios.get(`${process.env.CONTENT_URL}/v2/parts/${id}`, config),
  getInternalPart: (id, token, config) => axios.get(`${process.env.CONTENT_URL}/v2/parts/private/${id}?token=${token}`, config),
  searchItems: config => axios.get(`${process.env.CONTENT_URL}/v2/search2/list?${payloadBuilder(config)}`),
  cancellableSearchItems: config => cancellable(`${process.env.CONTENT_URL}/v2/search2/list?${payloadBuilder(config)}`),
  internalSearchItems: (config, token) => axios.get(`${process.env.CONTENT_URL}/v2/search2/private/list?${payloadBuilder(config)}&token=${token}`),
  cancellableInternalSearchItems: (config, token) => (
    cancellable(`${process.env.CONTENT_URL}/v2/search2/private/list?${payloadBuilder(config)}&token=${token}`)
  ),
  getItemsCount: config => axios.get(`${process.env.CONTENT_URL}/v2/search2/count?${payloadBuilder(config)}`),
  getCancellableItemsCount: config => cancellable(`${process.env.CONTENT_URL}/v2/search2/count?${payloadBuilder(config)}`),
  getInternalItemsCount: (config, token) => axios.get(`${process.env.CONTENT_URL}/v2/search2/private/count?${payloadBuilder(config)}&token=${token}`),
  getCancellableInternalItemsCount: (config, token) => (
    cancellable(`${process.env.CONTENT_URL}/v2/search2/private/count?${payloadBuilder(config)}&token=${token}`)
  ),
  sendForm: fields => axios.post(process.env.FORM_REQUEST_URL, fields),
  sendFormMailingSync: fields => axios.post(process.env.FORM_REQUEST_MAILING_SYNC_URL, fields),
  sendSurveyMail: fields => axios.post(process.env.SURVEYMAIL_REQUEST_URL, fields),
  sendSurveySave: fields => axios.post(process.env.SURVEYSAVE_REQUEST_URL, fields),
  sendQuestionForm: fields => axios.post(process.env.FORM_REQUEST_QUESTION, fields),
  sendReviewForm: fields => axios.post(process.env.FORM_REVIEW_SEND_URL, fields),
  refreshToken: refreshToken => axios.post(`${process.env.CONTENT_URL}/v2/auth/refresh-token`, {
    refreshToken,
  }),
  getUserCountry: () => axios.post(`${process.env.COUNTRY_URL}`),
  getCountries: () => axios.get('https://restcountries.com/v3.1/all'),
  getInternalAnalyticsData: (config, token) => (
    axios.get(`${process.env.CONTENT_URL}/v2/parts/private/analytics/data?${payloadBuilder(config)}&token=${token}`)
  ),
  getBlogPosts: ({
    category = null, page = 1, size = 5, query = null
  }) => axios.get(`${process.env.CONTENT_URL}/v2/blogs2/list`, {
    params: {
      category,
      query,
      size,
      page
    },
  }),
  searchBlogPosts: config => axios.get(`${process.env.CONTENT_URL}/v2/blogs2/list?${payloadBuilder(config)}`),
  markHelpful: (solutionName, reviewId) => axios.post(
    `${process.env.HELPFUL_REVIEW_URL}`,
    { itemName: solutionName, reviewId, publishCase: 'helpful' }
  ),
};
