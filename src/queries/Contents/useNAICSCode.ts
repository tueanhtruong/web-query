import { QueryFunction, useQuery, UseQueryOptions } from 'react-query';
import apiClient from '../apiClient';
import { ApiResponseType, responseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';
import { NAICSCode } from './types';

export function useNAICSCode(
  options?: UseQueryOptions<ApiResponseType<{ data: NAICSCode[] }>, Error, NAICSCode[]>
) {
  const handleGetNaicsCode: QueryFunction<
    ApiResponseType<{ data: NAICSCode[] }>,
    API_QUERIES
  > = () => responseWrapper<ApiResponseType<{ data: NAICSCode[] }>>(apiClient.getNaicsCode);
  const {
    data: naicsCodes,
    error,
    isError,
    isFetching: isLoadingNAICSCodes,
    refetch: getNAICSCodes,
  } = useQuery<ApiResponseType<{ data: NAICSCode[] }>, Error, NAICSCode[]>(
    [API_QUERIES.NAICS_CODE],
    {
      queryFn: handleGetNaicsCode,
      refetchOnMount: false,
      select: (data) => data.data.data,
      enabled: false,
      ...options,
    }
  );

  return {
    naicsCodes,
    error,
    isError,
    isLoadingNAICSCodes,
    getNAICSCodes,
  };
}
