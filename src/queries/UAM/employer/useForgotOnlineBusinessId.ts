import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../../apiClient';
import { responseWrapper } from '../../helpers';
import { ForgotOnlineBusinessIdPayload } from '../types';

export function useForgotOnlineBusinessId(
  options?: UseMutationOptions<any, Error, ForgotOnlineBusinessIdPayload>
) {
  const { mutate, isLoading, isSuccess } = useMutation<any, Error, ForgotOnlineBusinessIdPayload>({
    mutationFn: (payload: ForgotOnlineBusinessIdPayload) =>
      responseWrapper(apiClient.forgotOnlineBuisnessId, [payload]),
    ...options,
  });

  return {
    forgotOnlineBusinessId: mutate,
    isLoading,
    isSuccess,
  };
}
