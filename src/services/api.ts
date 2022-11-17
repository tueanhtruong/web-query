import apisauce from 'apisauce';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import appConfig from 'src/appConfig';
import { GetPropertiesParams, ProfilePayload } from 'src/queries';
import {
  ChangePasswordPayload,
  CompleteNewPasswordPayload,
  ConfirmPasswordPayload,
  ConfirmSignInPayload,
  ConfirmSignUpPayload,
  CreateOnlineProfilePayload,
  EmployerSignUpPayload,
  ForgotOnlineBusinessIdPayload,
  ForgotPasswordPayload,
  ResendSignUpPayload,
  SignInPayload,
  SignUpPayload,
  SubmitForgotPasswordPayload,
  TPACreateOnlineProfilePayload,
  TPAVerifyBusinessInfoPayload,
  TPAVerifyForgotOnlineBusinessIdPayload,
  VerifyFEINPayload,
  VerifyForgotOnlineBusinessIdPayload,
  VerifyRegistrationPayload,
  VerifyWagePayload,
} from 'src/queries/UAM/types';
import { newCancelToken, stringify } from 'src/utils';
import { NationalBanking, TokenService, ZipCodeService } from '.';
import {
  DirectDepositPayload,
  MailingAddressPayload,
  UC1FormPayload,
} from './../queries/Profile/types';
axios.defaults.withCredentials = true;

const create = (baseURL = appConfig.API_URL) => {
  //
  // Create and configure an apisauce-based api object.
  //

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 0,
      Accept: 'application/json',
    },
    timeout: appConfig.CONNECTION_TIMEOUT,
  });

  api.axiosInstance.interceptors.request.use((config) => {
    return TokenService.getToken()
      .then((token) => {
        config.headers.Authorization = 'Bearer ' + token;
        return Promise.resolve(config);
      })
      .catch(() => {
        return Promise.resolve(config);
      });
  });
  const getRoot = () => api.get('');

  // ====================== Auth ======================
  const signIn = (body: SignInPayload) => Auth.signIn(body.username, body.password);
  const signUp = (body: SignUpPayload) => {
    const params = {
      username: body.username,
      password: body.password,
    };

    const attributes = {
      email: body.email,
      given_name: body.firstName,
      family_name: body.lastName,
      middle_name: body.middleName,
      birthdate: body.dateOfBirth,
      'custom:ssn': body.socialSecurityNumber,
      'custom:user_type': 'CLAIMANT',
    };

    return Auth.signUp({ ...params, attributes });
  };

  const employerSignUp = (body: EmployerSignUpPayload) => {
    const params = {
      username: body.username,
      password: body.password,
    };

    const attributes = {
      email: body.email,
      given_name: body.firstName,
      family_name: body.lastName,
      middle_name: body.middleName,
      phone_number: body.phoneNumber,
      'custom:fein': body.federalEmployerIdentificationNumber,
      'custom:title': body.title,
      'custom:online_business_id': body.onlineBusinessId,
      'custom:employer_type': body.employerType,
      'custom:user_type': 'EMPLOYER',
    };

    return Auth.signUp({ ...params, attributes });
  };

  const createOnlineProfile = (body: CreateOnlineProfilePayload) => {
    const params = {
      username: body.username,
      password: body.password,
    };

    const attributes = {
      email: body.email,
      given_name: body.firstName,
      family_name: body.lastName,
      middle_name: body.middleName,
      phone_number: body.phoneNumber,
      'custom:fein': body.federalEmployerIdentificationNumber,
      'custom:title': body.title,
      'custom:online_business_id': body.onlineBusinessId,
      'custom:employer_type': body.employerType,
      'custom:user_type': 'EMPLOYER',
      'custom:employer_id': body.employerId,
    };

    return Auth.signUp({ ...params, attributes });
  };

  const createTPAOnlineProfile = (body: TPACreateOnlineProfilePayload) => {
    const params = {
      username: body.username,
      password: body.password,
    };

    const attributes = {
      email: body.email,
      given_name: body.firstName,
      family_name: body.lastName,
      middle_name: body.middleName,
      phone_number: body.phoneNumber,
      address: body.address,
      'custom:fein': body.federalEmployerIdentificationNumber,
      'custom:business_name': body.businessName,
      'custom:city': body.city,
      'custom:state': body.state,
      'custom:zip_code': body.zipCode,
      'custom:title': body.title,
      'custom:online_business_id': body.onlineBusinessId,
      'custom:user_type': 'TPA',
    };

    return Auth.signUp({ ...params, attributes });
  };

  const resendSignUp = (body: ResendSignUpPayload) => Auth.resendSignUp(body.username);

  const confirmSignUp = (body: ConfirmSignUpPayload) =>
    Auth.confirmSignUp(body.username, body.code);

  const signOut = () => Auth.signOut();

  const forgotPassword = (body: ForgotPasswordPayload) => Auth.forgotPassword(body.email);

  const submitForgotPassword = (body: SubmitForgotPasswordPayload) =>
    Auth.forgotPasswordSubmit(body.email, body.token, body.password);

  const changePassword = (body: ChangePasswordPayload) =>
    Auth.changePassword(body.user, body.currentPassword, body.newPassword);

  const confirmSignIn = (body: ConfirmSignInPayload) =>
    Auth.sendCustomChallengeAnswer(body.user, body.code);

  const confirmPassword = (password: ConfirmPasswordPayload) => {
    return Auth.currentAuthenticatedUser().then((user) =>
      Auth.signIn({
        username: user.username,
        password: password.password,
      })
    );
  };

  const completeNewPassword = (body: CompleteNewPasswordPayload) =>
    Auth.completeNewPassword(body.user, body.password, body.requiredAttributes);

  // ====================== Profile ======================
  const getUserId = (params: { username: string }) => {
    const username = { username: params.username };
    const queryString = stringify(username);
    return api.get(`/account-svc/v1/users/user-id?${queryString}`, {}, newCancelToken());
  };

  // ====================== Claimant Profile ======================
  const getMyProfile = () => api.get('/account-svc/v1/claimant/me', {}, newCancelToken());

  const getMyProfileMock = () => {
    const response = {
      id: '115176d7-2d27-4ee3-9f43-47c4eeb02d1e',
      createdAt: '2022-01-19T17:23:30.530Z',
      updatedAt: '2022-01-19T17:23:30.530Z',
      email: 'john_doe@gmail.com',
      firstName: 'John',
      lastName: 'Christopher',
      middleName: 'Doe',
      claimantUser: {
        socialSecurityNumber: 783910003,
        dateOfBirth: '1983-03-27',
        phoneNumber: 12012987481,
        mailingAddress: {
          deliverTo: 'John Doe',
          careOf: 'Edward Moore',
          address: '1100 Manor Dr., Chalfont, PA 18914',
          country: 'United States',
          zipCode: 55000,
          city: 'New York',
          state: 'New York',
        },
        directDeposit: {
          accountType: 'CHECKING',
          routingNumber: 1236789043,
          accountNumber: 'TPA423465235NH',
        },
      },
    };
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ok: true, data: response }), 600);
    });
  };

  const updateUserAvatar = (body: { avatarUrl: string }) =>
    api.patch(`/me/avatar`, body, newCancelToken());

  const updateMyProfile = (body: ProfilePayload) =>
    api.put(`/account-svc/v1/claimant/me`, body, newCancelToken());
  const updateMailingAddress = (body: MailingAddressPayload) =>
    api.put(`/account-svc/v1/claimant/me/mailing-address`, body, newCancelToken());

  const updateDirectDeposit = (body: DirectDepositPayload) =>
    api.put(`account-svc/v1/claimant/me/direct-deposit`, body, newCancelToken());

  // ====================== Employer ======================
  const forgotOnlineBuisnessId = (body: ForgotOnlineBusinessIdPayload) =>
    api.post(`account-svc/v1/employers/forgot-online-business-id`, body, newCancelToken());
  const verifyForgotOnlineBuisnessId = (body: VerifyForgotOnlineBusinessIdPayload) =>
    api.post(`account-svc/v1/employers/forgot-online-business-id/verify`, body, newCancelToken());
  const verifyFEIN = (body: VerifyFEINPayload) =>
    api.post(`account-svc/v1/employers/verify-fein`, body, newCancelToken());
  const verifyRegistration = (body: VerifyRegistrationPayload) =>
    api.post(`account-svc/v1/employers/verify-registration`, body, newCancelToken());
  const verifyWage = (body: VerifyWagePayload) =>
    api.post(`account-svc/v1/employers/verify-wage`, body, newCancelToken());

  const getUC1Form = () => api.get(`/account-svc/v1/employers/form-uc1`, {}, newCancelToken());
  const submitUc1Form = (body: UC1FormPayload) =>
    api.post(`/account-svc/v1/employers/form-uc1`, body, newCancelToken());

  // ====================== TPA ======================
  const forgotTPAOnlineBusinessId = (body: ForgotOnlineBusinessIdPayload) =>
    api.post(`account-svc/v1/tpas/forgot-online-business-id`, body, newCancelToken());
  const verifyTPAForgotOnlineBusinessId = (body: TPAVerifyForgotOnlineBusinessIdPayload) =>
    api.post(`account-svc/v1/tpas/forgot-online-business-id/verify`, body, newCancelToken());
  const verifyTPAFEIN = (body: VerifyFEINPayload) =>
    api.post(`account-svc/v1/tpas/verify-fein`, body, newCancelToken());
  const verifyTPARegistration = (body: VerifyRegistrationPayload) =>
    api.post(`account-svc/v1/tpas/verify-registration`, body, newCancelToken());
  const verifyTPABusinessInfo = (body: TPAVerifyBusinessInfoPayload) =>
    api.post(`account-svc/v1/tpas/verify-business-info`, body, newCancelToken());

  // ====================== Content ======================
  // const getContent = () => api.get('/content', {}, newCancelToken());
  const getContents = () => api.get('/account-svc/v1/contents', {}, newCancelToken());

  const getCityStateByZipCode = (params) => ZipCodeService.getPopulatedCityStateFromZipCode(params);

  const getNationalBanking = (params) => NationalBanking.getNationalBanking(params);

  const getNaicsCode = () => api.get('/account-svc/v1/employers/naics', {}, newCancelToken());

  // ====================== File ======================
  // const getPresignedUserServiceUrl = (params: GetPresignedPayload) =>
  //   api.get('/files/presigned-upload-url', params, newCancelToken());
  // const uploadFile = (body: UploadFilePayload) => axios.put(body.url, body.fileData);

  const getDecodeUserServiceUrl = (params: { filePath: string }) =>
    api.get('/files/presigned-download-url', params, newCancelToken());

  // const uploadFileWithProgress = (body: UploadFilePayload, callback: Callback) =>
  //   axios.put(body.url, body.fileData, {
  //     headers: {
  //       'Content-Type': getFileType(body.fileData),
  //     },
  //     onUploadProgress: (progress) => {
  //       const { loaded, total } = progress;
  //       const percentageProgress = Math.floor((loaded / total) * 100);
  //       callback({ id: body.id, progress: percentageProgress });
  //     },
  //   });

  // ====================== System Accounts ======================
  const searchUserAccounts = (params: { search: string }) => {
    const queryString = stringify(params);
    return api.get(`/users/search?${queryString}`, {}, newCancelToken());
  };
  const searchUserAccountsAxios = (params: { search: string; skip: number; take: number }) => {
    const queryString = stringify(params);
    return api.get(`${appConfig.API_URL}/users/search?${queryString}`, {}, newCancelToken());
  };
  const searchUserAccountsByOrderAxios = (params: {
    search: string;
    skip: number;
    take: number;
    order: string;
  }) => {
    const queryString = stringify(params);
    return api.get(`${appConfig.API_URL}/users/search?${queryString}`, {}, newCancelToken());
  };

  // ====================== Trips ======================
  const getAllTrips = () => api.get('/trip?timezoneOffset=7', {}, newCancelToken());
  const getTripDetail = (id) => api.get(`/trip/${id}`, {}, newCancelToken());

  // ====================== Properties ======================
  const getProperties = (params: GetPropertiesParams) => {
    const queryString = stringify(params);
    return api.get(`/property-svc/v1/properties?${queryString}`, {}, newCancelToken());
  };
  const getPropertyDetail = (params: { id: string }) =>
    api.get(`/property-svc/v1/properties/${params.id}`, {}, newCancelToken());
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  //
  // Notice we're not returning back the `api` created in step 1. That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    getRoot,
    // ====================== Auth ======================
    // getPermission,
    confirmSignIn,
    signIn,
    signUp,
    employerSignUp,
    resendSignUp,
    confirmSignUp,
    signOut,
    forgotPassword,
    submitForgotPassword,
    changePassword,
    // setPreferredMfa,
    createOnlineProfile,
    createTPAOnlineProfile,

    completeNewPassword,

    // ====================== File ======================
    // getPresignedUserServiceUrl,
    // uploadFile,
    // uploadFileWithProgress,
    getDecodeUserServiceUrl,

    // ====================== Content ======================
    getContents,
    getCityStateByZipCode,
    getNationalBanking,
    getNaicsCode,

    // ====================== Users ======================
    getUserId,

    // ====================== Profile ======================
    getMyProfile,
    getMyProfileMock,
    // updateMyProfile,
    updateUserAvatar,
    updateMyProfile,
    updateMailingAddress,
    updateDirectDeposit,
    confirmPassword,

    // ====================== Employer ======================
    forgotOnlineBuisnessId,
    verifyForgotOnlineBuisnessId,
    verifyFEIN,
    verifyRegistration,
    verifyWage,
    getUC1Form,
    submitUc1Form,

    // ====================== TPA ======================
    forgotTPAOnlineBusinessId,
    verifyTPAForgotOnlineBusinessId,
    verifyTPAFEIN,
    verifyTPARegistration,
    verifyTPABusinessInfo,

    // ====================== System Accounts ======================
    searchUserAccounts,
    searchUserAccountsAxios,
    searchUserAccountsByOrderAxios,
    // ====================== Properties ======================
    getProperties,
    getPropertyDetail,
    // ====================== Trips ======================
    getAllTrips,
    getTripDetail,
  };
};

export type Apis = ReturnType<typeof create>;

export default {
  create,
};
