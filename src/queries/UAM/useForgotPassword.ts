import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../apiClient';
import { authResponseWrapper } from '../helpers';
import { ForgotPasswordPayload } from './types';
export function useForgotPassword(options?: UseMutationOptions<any, Error, ForgotPasswordPayload>) {
  const { mutate: forgotPassword, isLoading } = useMutation<any, Error, ForgotPasswordPayload>({
    mutationFn: (payload: ForgotPasswordPayload) =>
      authResponseWrapper(apiClient.forgotPassword, [payload]),
    ...options,
  });

  return {
    forgotPassword,
    isLoading,
  };
}
