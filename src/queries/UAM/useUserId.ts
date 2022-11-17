import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../apiClient';
import { responseWrapper } from '../helpers';
// < return Data, Error, Payload Type, Context Types >
export function useUserId(
  options?: UseMutationOptions<any, Error, { username: string; password: string }>
) {
  const { mutate, isLoading: isGettingUserId } = useMutation<
    any,
    Error,
    { username: string; password: string }
  >({
    mutationFn: (payload: { username: string }) => responseWrapper(apiClient.getUserId, [payload]),
    ...options,
  });

  return {
    getUserId: mutate,
    isGettingUserId,
  };
}
