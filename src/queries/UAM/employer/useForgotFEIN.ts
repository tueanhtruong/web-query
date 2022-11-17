import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from 'src/queries/apiClient';
import { authResponseWrapper } from 'src/queries/helpers';
import { ForgotFEINPayload } from '../types';
export function useForgotFEIN(options?: UseMutationOptions<any, Error, ForgotFEINPayload>) {
  const { mutate: forgotFEIN, isLoading } = useMutation<any, Error, ForgotFEINPayload>({
    mutationFn: (payload: ForgotFEINPayload) =>
      authResponseWrapper(apiClient.forgotPassword, [payload]),
    ...options,
  });

  return {
    forgotFEIN,
    isLoading,
  };
}
