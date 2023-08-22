const oauthEndpoint = process.env.OAUTH_ENDPOINT;
const oauthLogoutEndpoint = process.env.OAUTH_LOGOUT_ENDPOINT;
const oauthClientId = process.env.OAUTH_CLIENT_ID;
const HTTP_RESPONSE_UNAUTHORIZED = 401;

// This util creates links for our login (getAuthLink) and logout (getLogoutLink) buttons which depends on environment

export const getAuthLink = (mode = undefined) => {
  // mode === 'iframe' means that this link is generated by iframe and redirect uri must be another one
  const { origin } = window.location;
  const redirectLink = mode === 'iframe' ? `${origin}/auth/iframe-handler` : `${origin}/auth/signin-oauth`;

  // eslint-disable-next-line max-len
  return `${oauthEndpoint}?response_type=code&scope=openid&client_id=${oauthClientId}&redirect_uri=${redirectLink}${mode === 'iframe' ? '&prompt=none' : ''}`;
};

export const getLogoutLink = () => `${oauthLogoutEndpoint}?redirect_uri=${origin}`;

export const handleError = (error, callback) => {
  if (error.response && error.response.status === HTTP_RESPONSE_UNAUTHORIZED) {
    window.location.assign(getAuthLink());
  } else {
    callback();
  }
};
