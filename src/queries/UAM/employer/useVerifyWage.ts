import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../../apiClient';
import { responseWrapper } from '../../helpers';
import { VerifyWagePayload } from '../types';

export function useVerifyWage(options?: UseMutationOptions<any, Error, VerifyWagePayload>) {
  const {
    mutate: verifyWage,
    isLoading: isVerifyingWage,
    isSuccess,
  } = useMutation<any, Error, VerifyWagePayload>({
    mutationFn: (payload: VerifyWagePayload) => responseWrapper(apiClient.verifyWage, [payload]),
    ...options,
  });

  return {
    verifyWage,
    isVerifyingWage,
    isSuccess,
  };
}
