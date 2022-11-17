const cache = {};

// url: https://amsamnonprod-user-storage-dev.s3.us-west-2.amazonaws.com/67640dd0-ae98-4f4c-a7fb-f4ac35086bf7/identity-proof/0d6afa8e-616f-456c-96e1-d2351bbb8efe_t0201covidfraud2_c.jpg
const getUniqueIdFromUrl = (url: string) => {
  if (!url) return null;

  const originUrl = url?.split('?')?.[0];
  const id = originUrl?.split('/')?.pop();

  return id;
};

const trimUuidFromUniqueId = (uniqueId: string) => {
  if (!uniqueId) return '';
  const splittedPath = uniqueId.split('_');
  splittedPath.shift();
  return splittedPath.join('_');
};

const getCachedUrl = (url: string) => {
  const id = getUniqueIdFromUrl(url);

  return cache[`${id}`];
};

const saveCacheUrl = (originUrl: string, decodeUrl: string) => {
  const id = getUniqueIdFromUrl(originUrl);
  cache[`${id}`] = decodeUrl;
};

export default {
  trimUuidFromUniqueId,
  getUniqueIdFromUrl,
  getCachedUrl,
  saveCacheUrl,
};
