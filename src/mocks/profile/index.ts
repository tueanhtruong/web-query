import { wrapIntoResponse } from '../helpers';
import { DEFAULT_PROFILE, fakeFileUrl, setProfileData } from './data';

const getProfile = () => {
  const data = DEFAULT_PROFILE;
  return wrapIntoResponse(data);
};

const updateProfile = (data: any) => {
  setProfileData(data);
  return wrapIntoResponse(data);
};

const updateMailingAddress = (data: any) => {
  setProfileData(data);
  return wrapIntoResponse(data);
};

const getPresignedUrl = (params: any) => {
  return wrapIntoResponse({ urll: fakeFileUrl });
};

export default {
  getProfile,
  updateProfile,
  getPresignedUrl,
  updateMailingAddress,
};
