const UBIQUITY_APP_TOKEN = 'XXXXXX';

export default {
  AWS_USER_POOL_ID: 'XXXX',
  AWS_USER_POOL_CLIENT_ID: 'XXXX',
  AWS_IDENTITY_POOL_ID: 'ap-southeast-2:XXXXX',
  AWS_REGION: 'ap-southeast-2',
  UBIQUITY_APP_USER_REGISTRATION_URL: `https://cloud.liquid-state.com/api/appusers/v1/${UBIQUITY_APP_TOKEN}/register/`,
  // if using a PIP, the following settings are needed:
  UIS_URL: `https://XXXXXX.execute-api.ap-southeast-2.amazonaws.com/dev/app/${UBIQUITY_APP_TOKEN}/`,
  PIP_BASE_URL: 'https://pip.XXXXXX.liquid-projects.com',
  PIP_ID: 'pip',
  UBIQUITY_PIP_ID: 'ubiquity',
  DOCUMENT_SEARCH_PIP_ID: 'document-search',
};
