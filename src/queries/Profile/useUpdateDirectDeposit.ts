import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../apiClient';
import { responseWrapper } from '../helpers';
import { DirectDepositPayload } from './types';

export function useUpdateDirectDeposit(
  options?: UseMutationOptions<any, Error, DirectDepositPayload>
) {
  const {
    mutate: updateDirectDeposit,

    isLoading,
    isSuccess,
  } = useMutation<any, Error, DirectDepositPayload>({
    mutationFn: (payload: DirectDepositPayload) =>
      responseWrapper(apiClient.updateDirectDeposit, [payload]),
    ...options,
  });

  return {
    updateDirectDeposit,
    isLoading,
    isSuccess,
  };
}
