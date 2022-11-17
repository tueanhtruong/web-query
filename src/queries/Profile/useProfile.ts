import React from 'react';
import { QueryFunction, useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import apiClient from '../apiClient';
import { ApiResponseType, getResponseData, responseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';
import { MyProfile, Profile } from './types';

export function useProfile(options?: UseQueryOptions<ApiResponseType<Profile>, Error, MyProfile>) {
  const handleGetProfile: QueryFunction<ApiResponseType<Profile>, API_QUERIES> = () =>
    responseWrapper<ApiResponseType<Profile>>(apiClient.getMyProfile);
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: getMyProfile,
  } = useQuery<ApiResponseType<Profile>, Error, MyProfile>([API_QUERIES.PROFILE], {
    queryFn: handleGetProfile,
    refetchOnMount: false,
    select: getResponseData,
    enabled: false,
    notifyOnChangeProps: ['data'],
    ...options,
  });

  const queryClient = useQueryClient();

  const handleSetStaleProfile = () => queryClient.invalidateQueries([API_QUERIES.PROFILE]);

  return {
    profile: React.useMemo(() => {
      if (!data) return null;
      const { claimantUser } = data;
      const { mailingAddress } = claimantUser;
      const profileResponse: Profile = {
        id: data.id,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        email: data.email,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        personalInfoId: data.id,
        status: 'active',
        personalInfo: {
          id: data.id,
          createdAt: data.createdAt,
          updatedAt: data.createdAt,
          ...claimantUser,

          ...mailingAddress,
          mailingAddress: mailingAddress?.address,
        },
      };
      return profileResponse;
    }, [data]),
    error,
    isError,
    loading: isFetching,
    getMyProfile,
    handleSetStaleProfile,
  };
}
