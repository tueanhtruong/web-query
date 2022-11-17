import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../../apiClient';
import { responseWrapper } from '../../helpers';
import { VerifyFEINPayload } from '../types';

export function useVerifyFEIN(options?: UseMutationOptions<any, Error, VerifyFEINPayload>) {
  const {
    mutate: verifyFEIN,
    isLoading: isVerifyingFEIN,
    isSuccess,
  } = useMutation<any, Error, VerifyFEINPayload>({
    mutationFn: (payload: VerifyFEINPayload) => responseWrapper(apiClient.verifyTPAFEIN, [payload]),
    ...options,
  });

  return {
    verifyFEIN,
    isVerifyingFEIN,
    isSuccess,
  };
}
