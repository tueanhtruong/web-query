import { useQuery, UseQueryOptions } from 'react-query';
import apiClient from '../apiClient';
import { ApiResponseType, responseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';
import { Property } from './types';

export function usePropertyDetail(
  options?: UseQueryOptions<ApiResponseType<Property>, Error, Property> & { id: string }
) {
  const {
    data: property,
    error,
    isError,
    isFetching,
    refetch: getPropertyDetail,
  } = useQuery<ApiResponseType<Property>, Error, Property>([API_QUERIES.PROPERTY, options.id], {
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<ApiResponseType<Property>>(apiClient.getPropertyDetail, params);
    },
    select(data) {
      return data.data;
    },
    ...options,
  });

  return {
    property,
    error,
    isError,
    loading: isFetching,
    getPropertyDetail,
  };
}
