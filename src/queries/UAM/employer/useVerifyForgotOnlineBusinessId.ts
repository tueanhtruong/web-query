import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../../apiClient';
import { responseWrapper } from '../../helpers';
import { VerifyForgotOnlineBusinessIdPayload } from '../types';

export function useVerifyForgotOnlineBusinessId(
  options?: UseMutationOptions<any, Error, VerifyForgotOnlineBusinessIdPayload>
) {
  const { mutate, isLoading, isSuccess } = useMutation<
    any,
    Error,
    VerifyForgotOnlineBusinessIdPayload
  >({
    mutationFn: (payload: VerifyForgotOnlineBusinessIdPayload) =>
      responseWrapper(apiClient.verifyForgotOnlineBuisnessId, [payload]),
    ...options,
  });

  return {
    verifyForgotOnlineBusinessId: mutate,
    isVerifyingForgotOnlineBusinessId: isLoading,
    isSuccess,
  };
}
