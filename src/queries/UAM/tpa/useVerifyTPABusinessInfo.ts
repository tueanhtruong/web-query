import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../../apiClient';
import { responseWrapper } from '../../helpers';
import { TPAVerifyBusinessInfoPayload } from '../types';

export function useVerifyTPABusinessInfo(
  options?: UseMutationOptions<any, Error, TPAVerifyBusinessInfoPayload>
) {
  const {
    mutate: verifyTPABusinessInfo,
    isLoading: isVerifyingTPABusinessInfo,
    isSuccess,
  } = useMutation<any, Error, TPAVerifyBusinessInfoPayload>({
    mutationFn: (payload: TPAVerifyBusinessInfoPayload) =>
      responseWrapper(apiClient.verifyTPABusinessInfo, [payload]),
    ...options,
  });
  return {
    verifyTPABusinessInfo,
    isVerifyingTPABusinessInfo,
    isSuccess,
  };
}
