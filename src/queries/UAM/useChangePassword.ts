import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../apiClient';
import { authResponseWrapper } from '../helpers';
import { ChangePasswordPayload } from './types';

export function useChangePassword(options?: UseMutationOptions<any, Error, ChangePasswordPayload>) {
  const { mutate: changePassword, isLoading } = useMutation<any, Error, ChangePasswordPayload>({
    mutationFn: (payload: ChangePasswordPayload) =>
      authResponseWrapper(apiClient.changePassword, [payload]),
    ...options,
  });

  return {
    changePassword,
    isLoading,
  };
}
