import { useQuery, UseQueryOptions } from 'react-query';
import { isEmpty } from '../../validations';
import apiClient from '../apiClient';
import { authResponseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';
import { BankingFromZipFolder } from './types';

export function useNationalBanking(
  options?: UseQueryOptions<BankingFromZipFolder, Error, BankingFromZipFolder> & {
    routingNumber: string;
  }
) {
  const {
    data: bankExists,
    error,
    isError,
    isFetching: isLoadingNationBank,
    refetch: getNationalBanking,
  } = useQuery<BankingFromZipFolder, Error, BankingFromZipFolder>(
    [API_QUERIES.BANK, options.routingNumber],
    {
      queryFn: (query) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, ...params] = query.queryKey;
        if (isEmpty(params[0])) return null;
        return authResponseWrapper<BankingFromZipFolder>(apiClient.getNationalBanking, params);
      },
      refetchOnMount: false,
      notifyOnChangeProps: ['data'],
      ...options,
    }
  );
  return {
    bankExists,
    error,
    isError,
    isLoadingNationBank,
    getNationalBanking,
  };
}
