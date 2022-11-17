import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../../apiClient';
import { authResponseWrapper } from '../../helpers';
import { EmployerSignUpPayload } from '../types';

export function useEmployerSignUp(options?: UseMutationOptions<any, Error, EmployerSignUpPayload>) {
  const { mutate, isLoading, isSuccess } = useMutation<any, Error, EmployerSignUpPayload>({
    mutationFn: (payload: EmployerSignUpPayload) =>
      authResponseWrapper(apiClient.employerSignUp, [payload]),
    ...options,
  });

  return {
    signup: mutate,
    isSigningUp: isLoading,
    isSuccess,
  };
}
