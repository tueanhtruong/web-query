import { Auth } from 'aws-amplify';
import { useEffect } from 'react';
import { useMutation, UseMutationOptions } from 'react-query';
import appConfig from 'src/appConfig';
import apiClient from '../apiClient';
import { authResponseWrapper } from '../helpers';
import { ConfirmPasswordPayload } from './types';

export function useConfirmPassword(
  options?: UseMutationOptions<any, Error, ConfirmPasswordPayload>
) {
  const {
    mutate: confirmPassword,
    isLoading,
    isSuccess,
  } = useMutation<any, Error, ConfirmPasswordPayload>({
    mutationFn: (payload: ConfirmPasswordPayload) =>
      authResponseWrapper(apiClient.confirmPassword, [payload]),
    ...options,
  });

  useEffect(() => {
    Auth.configure(appConfig.CUSTOM_AWS_CONFIG);
    return () => {
      Auth.configure(appConfig.AWS_CONFIG);
    };
  }, []);

  return {
    confirmPassword,
    isLoading,
    isPasswordValid: isSuccess,
  };
}
