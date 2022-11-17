import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../apiClient';
import { authResponseWrapper } from '../helpers';
import { CompleteNewPasswordPayload } from './types';

export function useCompleteNewPassword(
  options?: UseMutationOptions<any, Error, CompleteNewPasswordPayload>
) {
  const { mutate, isLoading, isSuccess } = useMutation<any, Error, CompleteNewPasswordPayload>({
    mutationFn: (payload: CompleteNewPasswordPayload) =>
      authResponseWrapper(apiClient.completeNewPassword, [payload]),
    ...options,
  });

  return {
    completeNewPassword: mutate,
    isLoading,
    isSuccess,
  };
}
