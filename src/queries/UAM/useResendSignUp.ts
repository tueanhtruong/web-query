import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../apiClient';
import { authResponseWrapper } from '../helpers';
import { ResendSignUpPayload } from './types';
export function useResendSignUp(options?: UseMutationOptions<any, Error, ResendSignUpPayload>) {
  const { mutate: resendSignUp, isLoading: isResendSignUp } = useMutation<
    any,
    Error,
    ResendSignUpPayload
  >({
    mutationFn: (payload: ResendSignUpPayload) =>
      authResponseWrapper(apiClient.resendSignUp, [payload]),
    ...options,
  });

  return {
    resendSignUp,
    isResendSignUp,
  };
}
