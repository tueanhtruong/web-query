import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../apiClient';
import { authResponseWrapper } from '../helpers';
import { SignUpPayload } from './types';

export function useSignUp(options?: UseMutationOptions<any, Error, SignUpPayload>) {
  const { mutate, isLoading, isSuccess } = useMutation<any, Error, SignUpPayload>({
    mutationFn: (payload: SignUpPayload) => authResponseWrapper(apiClient.signUp, [payload]),
    ...options,
  });

  return {
    signup: mutate,
    isSigningUp: isLoading,
    isSuccess,
  };
}
