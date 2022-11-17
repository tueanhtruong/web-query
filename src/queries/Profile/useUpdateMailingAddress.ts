import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../apiClient';
import { responseWrapper } from '../helpers';
import { MailingAddressPayload } from './types';
// < return Data, Error, Payload Type, Context Types >
export function useUpdateMailingAddress(
  options?: UseMutationOptions<any, Error, MailingAddressPayload>
) {
  const {
    mutate: updateMailingAddress,
    isLoading,
    isSuccess,
  } = useMutation<any, Error, MailingAddressPayload>({
    mutationFn: (payload: MailingAddressPayload) =>
      responseWrapper(apiClient.updateMailingAddress, [payload]),
    ...options,
  });

  return {
    updateMailingAddress,
    isLoading,
    isSuccess,
  };
}
