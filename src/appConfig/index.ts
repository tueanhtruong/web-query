const configs = {
  WEB_URL: process.env.REACT_APP_WEB_URL,
  API_URL: process.env.REACT_APP_API_URL,
  CLAIMANT_WEB_URL: process.env.REACT_APP_CLAIMANT_WEB_URL,
  EMPLOYER_WEB_URL: process.env.REACT_APP_EMPLOYER_WEB_URL,
  TPA_WEB_URL: process.env.REACT_APP_TPA_WEB_URL,
  ADMIN_WEB_URL: process.env.REACT_APP_ADMIN_WEB_URL,
  NODE_ENV: process.env.NODE_ENV,
  REACT_APP_COOKIE_DOMAIN: process.env.REACT_APP_COOKIE_DOMAIN,
  TIME_ZONE: process.env.REACT_APP_TIME_ZONE,
  APP_ENV: process.env.REACT_APP_BUILD_MODE,
  AWS_S3_WEB_LOGIN_BUCKET_URL: process.env.REACT_APP_AWS_S3_WEB_LOGIN_BUCKET_URL,
};

const googleServices = {
  CAPTCHA_KEY: process.env.REACT_APP_RECAPTCHA_CLIENT_KEY,
  TRACKING_ID: process.env.REACT_APP_TRACKING_ID,
};

const common = {
  CONNECTION_TIMEOUT: 30000,
  MAXIMUM_FILE_SIZE: 1024 * 1024 * 7, //7 MB
  WAITING_TIME: 5000, // 5 secs
  ANIMATION_TIME: 300,
  MAXIMUM_AVATAR_SIZE: 16 * 1024 * 1024, // 16MB
};

const table = {
  ROWS_PER_PAGE_OPTIONS: [10, 25, 50, 100],
  ROWS_PER_PAGE: 10,
};

const textLength = {
  CODE_LENGTH: 16,
  TEXT_SHORT_LENGTH: 50,
  TEXT_MEDIUM_LENGTH: 100,
  TEXT_MAX_LENGTH: 255,
  VERIFICATION_CODE_LENGTH: 6,
};

const AWS_CONFIG = {
  region: process.env.REACT_APP_AWS_IDENTITY_REGION,
  userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID,
  authenticationFlowType: 'CUSTOM_AUTH',
  oauth: {
    domain: process.env.REACT_APP_AWS_USER_POOL_DOMAIN,
    scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    redirectSignIn: process.env.REACT_APP_WEB_URL + '/signin',
    redirectSignOut: process.env.REACT_APP_WEB_URL + '/signin',
    responseType: 'code',
  },
  cookieStorage: {
    domain: configs.REACT_APP_COOKIE_DOMAIN,
    secure: configs.NODE_ENV === 'test',
    path: '/',
    expires: 365,
  },
};

const CUSTOM_AWS_CONFIG = {
  ...AWS_CONFIG,
  authenticationFlowType: 'USER_PASSWORD_AUTH',
};

const PERMISSIONS = {
  DASHBOARD_PERMISSION: [],
  WED_ADMIN: ['web_admin:read', 'web_admin:create', 'web_admin:update', 'web_admin:delete'],
  USER_MANAGEMENT: ['user:read', 'user:create', 'user:update', 'user:delete'],
  ROLE_MANAGEMENT: ['role:read', 'role:create', 'role:update', 'role:delete'],
  PROPERTY_MANAGEMENT: ['property:read', 'property:create', 'property:update', 'property:delete'],
  PROPERTY_TYPE_MANAGEMENT: [
    'property_type:read',
    'property_type:create',
    'property_type:update',
    'property_type:delete',
  ],
  PERMISSION: ['permission:read', 'permission:create', 'permission:update', 'permission:delete'],
  FORM: ['form:read', 'form:create', 'form:update', 'form:delete'],
};

export default {
  ...configs,
  ...googleServices,
  ...common,
  ...textLength,
  ...table,
  ...PERMISSIONS,
  AWS_CONFIG,
  CUSTOM_AWS_CONFIG,
};
