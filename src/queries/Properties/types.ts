import { TableParams } from 'src/redux/types';

export interface Property {
  id: string;
  propertyNo: string;
  accountNumber: string;
  propertyType: string;
  propertyOwner: string;
  parcelNumber: string;
  location: string;
  locationCode: string;
  propertyStatus: string;
  lastModifiedDate: string;
  createdAt: string;
  updatedAt: string;
}

export type GetPropertiesParams = TableParams & {
  [key: string]: string | number | string[];
};
