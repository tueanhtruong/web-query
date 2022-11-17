import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../../apiClient';
import { authResponseWrapper } from '../../helpers';
import { TPACreateOnlineProfilePayload } from '../types';

export function useTPACreateOnlineProfile(
  options?: UseMutationOptions<any, Error, TPACreateOnlineProfilePayload>
) {
  const { mutate, isLoading, isSuccess } = useMutation<any, Error, TPACreateOnlineProfilePayload>({
    mutationFn: (payload: TPACreateOnlineProfilePayload) =>
      authResponseWrapper(apiClient.createTPAOnlineProfile, [payload]),
    ...options,
  });

  return {
    createProfile: mutate,
    isCreating: isLoading,
    isSuccess,
  };
}
