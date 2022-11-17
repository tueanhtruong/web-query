import API from './api';

const apiJsonClient = API.create();

export default apiJsonClient;
export * from './types';
export * from './useLazyPosts';
export * from './usePostDetail';
export * from './usePostDetailByMutation';
export * from './usePosts';
