import { useMemo } from 'react';
import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';
import { isEmpty } from 'src/validations';
import apiJsonClient from '.';
import { responseWrapper } from '../helpers';
import { API_KEYS, Post } from './types';

const search = {
  page: 1,
};

export function useLazyPosts(options?: UseInfiniteQueryOptions<Post[], Error>) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: getPosts,
    fetchNextPage,
  } = useInfiniteQuery<Post[], Error>(
    [API_KEYS.POSTS, search, 'lazy'],
    (props): Promise<Post[]> => {
      const { pageParam = search } = props;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return responseWrapper<Post[]>(apiJsonClient.getPosts, [pageParam]);
    },
    {
      keepPreviousData: true,
      getNextPageParam(lastPage, allPages) {
        if (!lastPage) return undefined;
        return {
          page: allPages.length + 1,
        };
      },
      notifyOnChangeProps: ['data', 'isFetching'],
      ...options,
    }
  );

  const posts = useMemo(() => {
    if (isEmpty(data)) return [];
    return data.pages.reduce((state, page) => [...state, ...page], []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {
    posts,
    error,
    isError,
    loading: isFetching,
    getPosts,
    fetchNextPage,
  };
}
