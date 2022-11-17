import { Toastify } from 'src/services';

type ApiCall = (...args: any[]) => Promise<any>;

export async function responseWrapper<T>(func: ApiCall, [...args]: any[] = []): Promise<T> {
  return new Promise(async (res, rej) => {
    try {
      const response = (await func(...args)) || {};
      if (response.ok) res(response.data);
      if (response?.originalError?.message === 'CONNECTION_TIMEOUT') {
        Toastify.error('Connection timeout. Please check your network and try again.');
      }
      rej(response.data);
    } catch (err) {
      rej(err);
    }
  });
}

export async function authResponseWrapper<T>(func: ApiCall, [...args]: any[] = []): Promise<T> {
  return new Promise(async (res, rej) => {
    try {
      const response = (await func(...args)) || {};
      res(response);
    } catch (err) {
      rej(err);
    }
  });
}

export const getResponseData = (data: { data: any }) => data.data;

export interface ApiResponseType<T> {
  data: T;
  code: number;
  success: boolean;
  timestamp: string;
}

export interface PaginationResponseType<T> {
  data: T[];
  payloadSize?: number;
  hasNext?: boolean;
  totalRecords?: number;
}
