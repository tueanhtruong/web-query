import { useMutation, UseMutationOptions } from 'react-query';
import apiJsonClient from '.';
import { responseWrapper } from '../helpers';
import { Post } from './types';

export function usePostDetailByMutation(options?: UseMutationOptions<Post, Error, string>) {
  const {
    data,
    mutate: getPostDetailByMutation,
    isLoading,
    isSuccess,
  } = useMutation<Post, Error, string>({
    mutationFn: (id: string) => responseWrapper(apiJsonClient.getPostDetail, [id]),
    ...options,
  });

  return { data, getPostDetailByMutation, isLoading, isSuccess };
}
