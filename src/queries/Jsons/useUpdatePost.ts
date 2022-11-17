import { useMutation, UseMutationOptions } from 'react-query';
import apiJsonClient from '.';
import { responseWrapper } from '../helpers';
import { Post } from './types';

export function useUpdatePost(options?: UseMutationOptions<Post, Error, Post>) {
  const {
    data,
    mutate: updatePostDetailByMutation,
    isLoading,
    isSuccess,
  } = useMutation<Post, Error, Post>({
    mutationFn: (id: Post) => responseWrapper(apiJsonClient.updatePostDetail, [id]),

    ...options,
  });

  return { data, updatePostDetailByMutation, isLoading, isSuccess };
}
