import { useQuery, UseQueryOptions } from 'react-query';
import apiJsonClient from '.';
import { ApiResponseType, responseWrapper } from '../helpers';
import { API_KEYS, Post } from './types';

export function usePostsDetail(
  options?: UseQueryOptions<ApiResponseType<Post>, Error, Post> & { id: string }
) {
  const {
    data: postDetail,
    error,
    isError,
    isFetching,
    refetch: refetchPostDetail,
  } = useQuery<ApiResponseType<Post>, Error, Post>([API_KEYS.POST_DETAIL, options.id], {
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<ApiResponseType<Post>>(apiJsonClient.getPostDetail, params);
    },

    ...options,
  });

  return {
    postDetail,
    error,
    isError,
    loading: isFetching,
    refetchPostDetail,
  };
}
