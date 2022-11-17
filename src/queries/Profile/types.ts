export interface MyProfile {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  claimantUser: ClaimantUser;
}

export interface ClaimantUser {
  socialSecurityNumber: string;
  dateOfBirth: string;
  phoneNumber: string;
  mailingAddress: MailingAddress;
  directDeposit: DirectDeposit;
}

export interface DirectDeposit {
  accountType: string;
  routingNumber: number;
  accountNumber: string;
}

export interface MailingAddress {
  deliverTo: string;
  careOf: string;
  address: string;
  country: string;
  zipCode: string;
  city: string;
  state: string;
}

////===========================
export interface Profile {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  personalInfoId: string;
  status: string;
  personalInfo: PersonalInfo;
}

export interface PersonalInfo {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  socialSecurityNumber: string;
  dateOfBirth: string;
  phoneNumber: string;
  deliverTo: string;
  careOf: string;
  mailingAddress: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
  directDeposit: DirectDeposit;
}

export interface ProfilePayload {
  phoneNumber: string;
  mailingAddress: string;
  country: string;
  zipCode: string;
  city: string;
  state: string;
  careOf: string;
}
export interface MailingAddressPayload {
  phoneNumber: string;
  address: string;
  country: string;
  zipCode: string;
  city: string;
  state: string;
  careOf: string;
}

export interface DirectDepositPayload {
  existingRoutingNumber?: string;
  existingAccountNumber?: string;
  accountType: string;
  routingNumber: string;
  accountNumber: string;
}

export interface UC1FormEmployee {
  firstName: string;
  lastName: string;
  encryptedSsn: string;
  encryptedSsnSalt: string;
  ssnMask: string;
  relationship: string;
}

export interface UC1FormPartner {
  identitificationNumber: string;
  identificationNumberType: string;
  identificationNumberSalt: string;
  identificationNumberMask: string;
  name: string;
  title: string;
  titleOther: string;
  residentialAddress: string;
  city: string;
  zipcode: string;
  phone: string;
}

export interface UC1FormPayload {
  employerId: string;
  employerUserId: string;
  createdById: string;
  createdByName: string;
  formUc1: {
    startDate: Date;
    fein?: string;
    employerName: string;
    dbaName: string;
    ownershipType: string;
    subchapter: boolean;
    nonprofit: boolean;
    naicsCode: string;
    naicsDescriptor?: string;
    businessDescription?: string;
    numberOfBranches: number;
    acquireBusiness: boolean;
    acquireAmount: string;
    acquireDate: Date;
    previousName: string;
    previousDba: string;
    previousAddress: string;
    previousCity: string;
    previousState: string;
    previousZipcode: string;
    previousFin: string;
    previousUan: string;
    physicalAddress: string;
    physicalApartment: string;
    physicalCity: string;
    physicalState: string;
    physicalZipCode: string;
    isSameMailingAddress: boolean;
    isMailingAddressForeign: boolean;
    mailingAddress: string;
    mailingApartment: string;
    mailingCareOf: string;
    mailingCity: string;
    mailingState: string;
    mailingZipcode: string;
    businessPhone: string;
    businessPhoneExt: string;
    residentialPhone: string;
    fax: string;
    numberOfEmployees: number;
    mealsFurnished: boolean;
    nonagriculturalEmployees: boolean;
    agriculturalAlien: boolean;
    agriculturalWagesPrevQ1: number;
    agriculturalWagesPrevQ2: number;
    agriculturalWagesPrevQ3: number;
    agriculturalWagesPrevQ4: number;
    agriculturalWagesPrevEmployees: number;
    agriculturalWagesPrevWeeks: number;
    agriculturalWagesCurrQ1: number;
    agriculturalWagesCurrQ2: number;
    agriculturalWagesCurrQ3: number;
    agriculturalWagesCurrQ4: number;
    agriculturalWagesCurrEmployees: number;
    agriculturalWagesCurrWeeks: number;
    allServicesPerformedForeign: boolean;
  };
  formUc1Employees: UC1FormEmployee[];
  formUc1Partners: UC1FormPartner[];
}
