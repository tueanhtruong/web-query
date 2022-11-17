/* eslint-disable security/detect-non-literal-fs-filename */
import { History, LocationState } from 'history';
import appConfig from 'src/appConfig';
import urlJoin from 'url-join';

let _history: History;

const setTopHistory = (history: History) => {
  _history = history;
};

const navigate = (routeName: string, state?: LocationState) => {
  _history.push(routeName, state);
};

const getPath = () => _history.location.pathname;

const replace = (routeName: string, state?: LocationState) => {
  _history.replace(routeName, state);
};

const goBack = (defaultUrl = '/') => {
  var isCannotBack = _history.action === 'POP';
  isCannotBack ? _history.push(defaultUrl) : _history.goBack();
};

const getNextPathInBaseUrl = (nextPath?: string) => {
  const baseURL = appConfig.WEB_URL as string;
  const path = nextPath || _history.location.pathname;
  const url = urlJoin(baseURL, path);

  return url;
};

const jumpToCrossDomain = (subDomain: string, nextPath?: string) => {
  const toUrl = getNavigateUrl(getNextPathInBaseUrl(nextPath));
  const toCrossUrl = subDomain ? toUrl.replace('://', `://${subDomain}.`) : toUrl;
  window.location.href = toCrossUrl;
};

const navigateCrossSubdomain = (subdomain, routeName, params = null) => {
  if (getSubdomain() === subdomain) {
    _history.push(`/${routeName}`, params);
  } else {
    let url = `${appConfig.WEB_URL}/${routeName}`;
    url = subdomain ? url.replace('://', `://${subdomain}.`) : url;
    window.location.href = url;
  }
};

const getSubdomain = () => window.location.hostname.split('.')[0];

export const getNavigateUrl = (url: string) => (url.includes('http') ? url : `https://${url}`);

const jumpToWebClaimant = (nextPath?: string) => {
  return window.open(`${getNavigateUrl(appConfig.CLAIMANT_WEB_URL)}${nextPath}`, '_self');
};

const jumpToWebEmployer = (nextPath?: string) => {
  return window.open(`${getNavigateUrl(appConfig.EMPLOYER_WEB_URL)}${nextPath}`, '_self');
};

const jumpToWebTPA = (nextPath?: string) => {
  return window.open(`${getNavigateUrl(appConfig.TPA_WEB_URL)}${nextPath}`, '_self');
};

const jumpToWebAdmin = (nextPath?: string) => {
  return window.open(`${getNavigateUrl(appConfig.ADMIN_WEB_URL)}${nextPath}`, '_self');
};

export default {
  setTopHistory,
  navigate,
  goBack,
  replace,
  getPath,
  jumpToCrossDomain,
  navigateCrossSubdomain,
  getSubdomain,
  jumpToWebClaimant,
  jumpToWebEmployer,
  jumpToWebTPA,
  jumpToWebAdmin,
};
