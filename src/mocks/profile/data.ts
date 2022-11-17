export let DEFAULT_PROFILE: any = {
  firstName: 'Tue',
  lastName: 'Truong',
  email: 'tueleesin@gmail.com',
  phoneNumber: '+84 1234567899',
  addressLine1: '31 Nguyen Huu An',
  addressLine2: '45 Nguyen Huu An',
  city: 'Son Tra',
  countryId: 233,
  stateId: 2,
  zipCode: '96500',
  country: 'Viet Nam',
  state: 'Da Nang',
  departmentId: 1,
  department: 'CC_1',
  position: 'title',
  companyName: 'company name',
  directManager: {
    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    email: 'test@gmail.com',
    firstName: 'Test',
    lastName: 'Test',
  },
  userNo: '00001',
};

export const setProfileData = (data) => (DEFAULT_PROFILE = data);
export const fakeFileUrl = 'https://dummyimage.com/600x400/0b40d1/ffffff.png&text=test+image';

export const DEFAULT_ZIPCODE_CITY_STATE = [
  {
    zipCode: '02304',
    city: 'Brockton',
    state: 'Massachusetts',
  },
  {
    zipCode: '02305',
    city: 'Brockton',
    state: 'Massachusetts',
  },
  {
    zipCode: '02322',
    city: 'Avon',
    state: 'Massachusetts',
  },
  {
    zipCode: '02324',
    city: 'Bridgewater',
    state: 'Massachusetts',
  },
  {
    zipCode: '02325',
    city: 'Brockton',
    state: 'Massachusetts',
  },
  {
    zipCode: '02327',
    city: 'Bryantville',
    state: 'Massachusetts',
  },
  {
    zipCode: '02330',
    city: 'Carver',
    state: 'Massachusetts',
  },
  {
    zipCode: '00792',
    city: 'Humacao',
    state: 'Puerto Rico',
  },
  {
    zipCode: '00823',
    city: 'Christiansted',
    state: 'Virgin Islands',
  },
  {
    zipCode: '00830',
    city: 'Saint John',
    state: 'Virgin Islands',
  },
];
