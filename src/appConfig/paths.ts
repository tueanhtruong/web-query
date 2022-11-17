export const PATHS = {
  root: '/',
  dev: '/dev',
  welcome: '/welcome',
  signIn: '/login',
  signUp: '/sign-up',
  event: '/event',
  forgotPassword: '/forgot-password',
  forgotOnlineBusinessId: '/forgot-online-business-id',
  resetPassword: '/reset-password',
  myAccount: '/my-accounts',
  dashboard: '/dashboard',
  logout: '/logout',

  // ======== Profile ========
  myProfile: '/me',
  changePassword: '/me/change-password',
  editMyProfile: '/me/edit',
  configureNotification: '/me/notification',
  uc1form: '/uc1-form',
  query: '/query',
  basicQuery: '/query/basic',
  hookQuery: '/query/hook',
  lazyQuery: '/query/lazy',
  mutationQuery: '/query/mutation',

  // ======== Feature ========
  property: '/property',
  propertyDetail: '/property/:id',
  uc1Form: '/uc1-form',
};

export const PATH_HEADERS = {
  [PATHS.myProfile]: 'My Profile',
  [PATHS.editMyProfile]: 'My Profile',
  [PATHS.changePassword]: 'Change Password', // pragma: allowlist secret
  [PATHS.configureNotification]: 'My Profile',
  [PATHS.uc1Form]: 'UC-1 Form',
};

export const HIDE_NAV_PATHS = [];
