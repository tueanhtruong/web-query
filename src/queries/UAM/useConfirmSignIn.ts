import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../apiClient';
import { authResponseWrapper } from '../helpers';
import { ConfirmSignInPayload } from './types';
export function useConfirmSignIn(options?: UseMutationOptions<any, Error, ConfirmSignInPayload>) {
  const { mutate: confirmSignIn, isLoading: isConfirmSigningIn } = useMutation<
    any,
    Error,
    ConfirmSignInPayload
  >({
    mutationFn: (payload: ConfirmSignInPayload) =>
      authResponseWrapper(apiClient.confirmSignIn, [payload]),
    ...options,
  });

  return {
    confirmSignIn,
    isConfirmSigningIn,
  };
}
