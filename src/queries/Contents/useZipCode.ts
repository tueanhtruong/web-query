import { useQuery, UseQueryOptions } from 'react-query';
import { isEmpty } from '../../validations';
import apiClient from '../apiClient';
import { authResponseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';
import { CityStateFromZipCode } from './types';

export function useZipCode(
  options?: UseQueryOptions<CityStateFromZipCode, Error, CityStateFromZipCode> & {
    zipCode: string;
  }
) {
  const {
    data: foundedCityState,
    error,
    isError,
    isFetching: isLoadingCityState,
    refetch: getCityStateByZipCode,
  } = useQuery<CityStateFromZipCode, Error, CityStateFromZipCode>(
    [API_QUERIES.ZIP_CODE, options.zipCode],
    {
      queryFn: (query) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, ...params] = query.queryKey;
        if (isEmpty(params[0])) return null;

        return authResponseWrapper<CityStateFromZipCode>(apiClient.getCityStateByZipCode, params);
      },
      refetchOnMount: false,
      notifyOnChangeProps: ['data'],
      ...options,
    }
  );

  return {
    foundedCityState,
    error,
    isError,
    isLoadingCityState,
    getCityStateByZipCode,
  };
}
