import { UseQueryOptions } from 'react-query';

export enum API_QUERIES {
  PROFILE = '/me',
  CONTENT = '/content',
  ZIP_CODE = '/zip-code',
  TRIPS = '/trips',
  PROPERTY_LIST = '/property-list',
  PROPERTY = '/property',
  USER_ID = '/user-id',
  BANK = '/bank',
  NAICS_CODE = '/naics-code',
  UC1_FORM = '/uc1-form',
}

export type QueryOptions<T> = Omit<UseQueryOptions, 'QueryKey'> & { QueryKey: T };
