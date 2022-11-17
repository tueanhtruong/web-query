import { useState } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import { TableParams } from 'src/redux/types';
import { isEmpty } from 'src/validations';
import apiJsonClient from '.';
import { responseWrapper } from '../helpers';
import { API_KEYS, Post } from './types';

export function usePosts(options?: UseQueryOptions<Post[], Error>) {
  const [params, setParams] = useState<TableParams>(null);
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: getPosts,
  } = useQuery<Post[], Error>([API_KEYS.POSTS, params], {
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<Post[]>(apiJsonClient.getPosts, params);
    },
    keepPreviousData: true,
    // notifyOnChangeProps: ['data'],
    enabled: !isEmpty(params),
    ...options,
  });

  return {
    posts: data,
    error,
    isError,
    loading: isFetching,
    getPosts,
    setParams,
  };
}
