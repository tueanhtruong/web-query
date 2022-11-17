/* eslint-disable no-unused-vars */
import { Callback } from '../types';

export enum FileUploadType {
  signature = 'signature',
  proof_of_identity = 'proof_of_identity',
  avatar = 'avatar',
  shop = 'shop',
  banner = 'banner',
}

export interface GetPresignedPayload {
  fileName?: string;
  contentType?: string;
  fileData?: File;
  type?: FileUploadType | null;
  callback?: Callback;
  fullPath?: string;
  keepOriginalQuality?: boolean;
  keyId?: string;
  url?: string;
}
export interface GetMultiPresignedPayload {
  files: GetPresignedPayload[];
  callback?: Callback;
}
export type AttachmentPayload = {
  fileUrl: string;
  name: string;
};
