import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../apiClient';
import { authResponseWrapper } from '../helpers';
// < return Data, Error, Payload Type, Context Types >
export function useLogout(options?: UseMutationOptions<any, Error, void>) {
  const { mutate, isLoading } = useMutation<any, Error, void>({
    mutationFn: () => authResponseWrapper(apiClient.signOut),
    ...options,
  });

  return {
    logout: mutate,
    isLoggingOut: isLoading,
  };
}
