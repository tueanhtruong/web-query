/**
 ****************** Claimant ******************
 */
export interface SignUpPayload {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  middleName: string;
  dateOfBirth: string;
  socialSecurityNumber: string;
}

/**
 ****************** Employer ******************
 */
export interface EmployerSignUpPayload {
  username: string;
  federalEmployerIdentificationNumber: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  middleName: string;
  title: string;
  password: string;
  onlineBusinessId: string;
  employerType: string;
}
export interface CreateOnlineProfilePayload {
  username: string;
  federalEmployerIdentificationNumber: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  middleName: string;
  title: string;
  password: string;
  onlineBusinessId: string;
  employerType: string;
  employerId: string;
}
export interface ForgotFEINPayload {
  uiAccountNumber: string;
  fein: string;
  email: string;
}
export interface ForgotOnlineBusinessIdPayload {
  uiAccountNumber: string;
  fein: string;
  email: string;
}
export interface SignInPayload {
  username: string;
  password: string;
}

export interface ConfirmSignUpPayload {
  username: string;
  code: string;
}

export interface ResendSignUpPayload {
  username: string;
}

export interface SubmitForgotPasswordPayload {
  email: string;
  token: string;
  password: string;
}
export interface ForgotPasswordPayload {
  email: string;
}
export interface ChangePasswordPayload {
  user: any;
  currentPassword: string;
  newPassword: string;
}
export interface ConfirmPasswordPayload {
  password: string;
}

export interface ConfirmSignInPayload {
  code: string;
  user: any;
}

export interface VerifyFEINPayload {
  fein: string;
}

export interface VerifyForgotOnlineBusinessIdPayload {
  uiAccountNumber: string;
  fein: string;
  email: string;
  token: string;
}
export interface VerifyRegistrationPayload {
  fein: string;
  uiAccountNumber?: string;
  businessName?: string;
}

export interface VerifyWagePayload {
  fein: string;
  wage: number;
  uiAccountNumber: string;
  businessName?: string;
}

export interface VerifyWageResponse {
  data: {
    isSuccess: boolean;
    remainingVerifyAttempts: number;
    employerId: string;
  };
}

export interface CompleteNewPasswordPayload {
  user: any;
  password: string;
  requiredAttributes?: any;
}

/**
 ****************** TPA ******************
 */
export interface TPACreateOnlineProfilePayload {
  username: string;
  federalEmployerIdentificationNumber: string;
  businessName: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  middleName: string;
  title: string;
  password: string;
  onlineBusinessId: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}
export interface TPAVerifyBusinessInfoPayload {
  fein: string;
  businessName?: string;
}
export interface TPAForgotOnlineBusinessIdPayload {
  fein: string;
  email: string;
}
export interface TPAVerifyForgotOnlineBusinessIdPayload {
  fein: string;
  email: string;
  token: string;
}
