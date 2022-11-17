import { QueryFunction, useQuery, UseQueryOptions } from 'react-query';
import apiClient from '../apiClient';
import { ApiResponseType, responseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';

export function useUC1Form(options?: UseQueryOptions<ApiResponseType<any>, Error, any>) {
  const handleGetUc1Form: QueryFunction<ApiResponseType<any>, API_QUERIES> = () =>
    responseWrapper<ApiResponseType<any>>(apiClient.getUC1Form);
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: getUC1Form,
  } = useQuery<ApiResponseType<any>, Error, any>([API_QUERIES.UC1_FORM], {
    queryFn: handleGetUc1Form,
    refetchOnMount: false,
    enabled: false,
    ...options,
  });

  return {
    data,
    error,
    isError,
    loading: isFetching,
    getUC1Form,
  };
}
