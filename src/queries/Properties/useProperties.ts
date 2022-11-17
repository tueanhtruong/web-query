import { useState } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import { isEmpty } from 'src/validations';
import apiClient from '../apiClient';
import { PaginationResponseType, responseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';
import { GetPropertiesParams, Property } from './types';

export function useProperties(
  options?: UseQueryOptions<PaginationResponseType<Property[]>, Error>
) {
  const [params, setParams] = useState<GetPropertiesParams>(null);
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: getProperties,
  } = useQuery<PaginationResponseType<Property[]>, Error>([API_QUERIES.PROPERTY_LIST, params], {
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseType<Property[]>>(apiClient.getProperties, params);
    },
    keepPreviousData: true,
    notifyOnChangeProps: ['data'],
    enabled: !isEmpty(params),
    ...options,
  });

  const { data: properties = [], hasNext, payloadSize, totalRecords } = data || {};

  return {
    properties,
    hasNext,
    payloadSize,
    totalRecords,
    error,
    isError,
    loading: isFetching,
    getProperties,
    setParams,
  };
}
