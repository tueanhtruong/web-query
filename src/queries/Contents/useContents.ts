import { useQuery, UseQueryOptions } from 'react-query';
import { ContentStore } from 'src/redux/common/types';
import apiClient from '../apiClient';
import { ApiResponseType, responseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';

export function useContents(
  options?: UseQueryOptions<ApiResponseType<ContentStore>, Error, ContentStore>
) {
  const {
    data: contents,
    error,
    isError,
    isFetching,
    refetch: getContents,
  } = useQuery<ApiResponseType<ContentStore>, Error, ContentStore>([API_QUERIES.CONTENT], {
    queryFn: () => responseWrapper<ApiResponseType<ContentStore>>(apiClient.getContents),
    enabled: false,
    select: (data) => data.data,
    ...options,
  });

  return {
    contents,
    error,
    isError,
    loading: isFetching,
    getContents,
  };
}
