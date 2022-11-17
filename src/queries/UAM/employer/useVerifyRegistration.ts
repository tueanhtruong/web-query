import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../../apiClient';
import { responseWrapper } from '../../helpers';
import { VerifyRegistrationPayload } from '../types';

export function useVerifyRegistration(
  options?: UseMutationOptions<any, Error, VerifyRegistrationPayload>
) {
  const {
    mutate: verifyRegistration,
    isLoading: isVerifyingRegistration,
    isSuccess,
  } = useMutation<any, Error, VerifyRegistrationPayload>({
    mutationFn: (payload: VerifyRegistrationPayload) =>
      responseWrapper(apiClient.verifyRegistration, [payload]),
    ...options,
  });

  return {
    verifyRegistration,
    isVerifyingRegistration,
    isSuccess,
  };
}
