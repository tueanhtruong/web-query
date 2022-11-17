import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../../apiClient';
import { responseWrapper } from '../../helpers';
import { TPAForgotOnlineBusinessIdPayload } from '../types';

export function useTPAForgotOnlineBusinessId(
  options?: UseMutationOptions<any, Error, TPAForgotOnlineBusinessIdPayload>
) {
  const { mutate, isLoading, isSuccess } = useMutation<
    any,
    Error,
    TPAForgotOnlineBusinessIdPayload
  >({
    mutationFn: (payload: TPAForgotOnlineBusinessIdPayload) =>
      responseWrapper(apiClient.forgotTPAOnlineBusinessId, [payload]),
    ...options,
  });

  return {
    forgotTPAOnlineBusinessId: mutate,
    isLoading,
    isSuccess,
  };
}
