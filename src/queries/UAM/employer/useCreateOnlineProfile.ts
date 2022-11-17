import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../../apiClient';
import { authResponseWrapper } from '../../helpers';
import { CreateOnlineProfilePayload } from '../types';

export function useCreateOnlineProfile(
  options?: UseMutationOptions<any, Error, CreateOnlineProfilePayload>
) {
  const { mutate, isLoading, isSuccess } = useMutation<any, Error, CreateOnlineProfilePayload>({
    mutationFn: (payload: CreateOnlineProfilePayload) =>
      authResponseWrapper(apiClient.createOnlineProfile, [payload]),
    ...options,
  });

  return {
    createProfile: mutate,
    isCreating: isLoading,
    isSuccess,
  };
}
