import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../../apiClient';
import { responseWrapper } from '../../helpers';
import { TPAVerifyForgotOnlineBusinessIdPayload } from '../types';

export function useTPAVerifyForgotOnlineBusinessId(
  options?: UseMutationOptions<any, Error, TPAVerifyForgotOnlineBusinessIdPayload>
) {
  const { mutate, isLoading, isSuccess } = useMutation<
    any,
    Error,
    TPAVerifyForgotOnlineBusinessIdPayload
  >({
    mutationFn: (payload: TPAVerifyForgotOnlineBusinessIdPayload) =>
      responseWrapper(apiClient.verifyTPAForgotOnlineBusinessId, [payload]),
    ...options,
  });

  return {
    verifyForgotOnlineBusinessId: mutate,
    isVerifyingForgotOnlineBusinessId: isLoading,
    isSuccess,
  };
}
