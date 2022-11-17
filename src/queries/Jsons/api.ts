import apisauce from 'apisauce';
import axios from 'axios';
import appConfig from 'src/appConfig';
import { newCancelToken, stringify } from 'src/utils';
import { Post } from './types';

axios.defaults.withCredentials = true;

const create = (baseURL = 'https://gorest.co.in/public/v2') => {
  //
  // Create and configure an apisauce-based api object.
  //

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 0,
      Accept: 'application/json',
    },
    timeout: appConfig.CONNECTION_TIMEOUT,
  });

  api.axiosInstance.interceptors.request.use((config) => {
    return new Promise((res) => {
      config.headers.Authorization =
        'Bearer d63b0c93e975c361a2ba1e74223ba18cce1a38cedca948e3c9a310db156a6fc1';
      res(config);
    });
  });

  const getRoot = () => api.get('');
  const getPosts = (params) => {
    const queryString = stringify(params);
    return api.get(`/posts?${queryString}`, {}, newCancelToken());
  };
  const getPostDetail = (id: string) => {
    return api.get(`/posts/${id}`, {}, newCancelToken());
  };
  const updatePostDetail = (body: Post) => {
    return api.put(`/posts/${body.id}`, body, newCancelToken());
  };

  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  //
  // Notice we're not returning back the `api` created in step 1. That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    getRoot,
    getPosts,
    getPostDetail,
    updatePostDetail,
  };
};

export type Apis = ReturnType<typeof create>;

export default {
  create,
};
