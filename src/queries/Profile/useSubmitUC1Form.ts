import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../apiClient';
import { responseWrapper } from '../helpers';
import { UC1FormPayload } from './types';
// < return Data, Error, Payload Type, Context Types >
export function useSubmitUC1Form(options?: UseMutationOptions<any, Error, UC1FormPayload>) {
  const {
    mutate: submitUC1Form,
    isLoading,
    isSuccess,
  } = useMutation<any, Error, UC1FormPayload>({
    mutationFn: (payload: UC1FormPayload) => responseWrapper(apiClient.submitUc1Form, [payload]),
    ...options,
  });

  return {
    submitUC1Form,
    isLoading,
    isSuccess,
  };
}
