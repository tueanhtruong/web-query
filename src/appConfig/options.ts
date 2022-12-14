export type StateOption = {
  name: string;
};

export const states: StateOption[] = [
  { name: 'Alabama' },
  { name: 'Alaska' },
  { name: 'Arizona' },
  { name: 'Arkansas' },
  { name: 'California' },
  { name: 'Colorado' },
  { name: 'Connecticut' },
  { name: 'Delaware' },
  { name: 'Florida' },
  { name: 'Georgia' },
  { name: 'Hawaii' },
  { name: 'Idaho' },
  { name: 'Illinois' },
  { name: 'Indiana' },
  { name: 'Iowa' },
  { name: 'Kansas' },
  { name: 'Kentucky' },
  { name: 'Louisiana' },
  { name: 'Maine' },
  { name: 'Maryland' },
  { name: 'Massachusetts' },
  { name: 'Michigan' },
  { name: 'Minnesota' },
  { name: 'Mississippi' },
  { name: 'Missouri' },
  { name: 'Montana' },
  { name: 'Nebraska' },
  { name: 'Nevada' },
  { name: 'New Hampshire' },
  { name: 'New Jersey' },
  { name: 'New Mexico' },
  { name: 'New York' },
  { name: 'North Carolina' },
  { name: 'North Dakota' },
  { name: 'Ohio' },
  { name: 'Oklahoma' },
  { name: 'Oregon' },
  { name: 'Pennsylvania' },
  { name: 'Rhode Island' },
  { name: 'South Carolina' },
  { name: 'South Dakota' },
  { name: 'Tennessee' },
  { name: 'Texas' },
  { name: 'Utah' },
  { name: 'Vermont' },
  { name: 'Virginia' },
  { name: 'Washington' },
  { name: 'West Virginia' },
  { name: 'Wisconsin' },
  { name: 'Wyoming' },
];

// const states: StateOption[] = [
//   { id: 1, code: 'HI', name: 'Hawaii', countryId: 233 },
//   { id: 2, code: 'AL', name: 'Alabama', countryId: 233 },
//   { id: 3, code: 'AK', name: 'Alaska', countryId: 233 },
//   { id: 4, code: 'AS', name: 'American Samoa', countryId: 233 },
//   { id: 5, code: 'AZ', name: 'Arizona', countryId: 233 },
//   { id: 6, code: 'AR', name: 'Arkansas', countryId: 233 },
//   { id: 7, code: 'CA', name: 'California', countryId: 233 },
//   { id: 8, code: 'CO', name: 'Colorado', countryId: 233 },
//   { id: 9, code: 'CT', name: 'Connecticut', countryId: 233 },
//   { id: 10, code: 'DE', name: 'Delaware', countryId: 233 },
//   { id: 11, code: 'DC', name: 'District Of Columbia', countryId: 233 },
//   {
//     id: 12,
//     code: 'FM',
//     name: 'Federated States Of Micronesia',
//     countryId: 233,
//   },
//   { id: 13, code: 'FL', name: 'Florida', countryId: 233 },
//   { id: 14, code: 'GA', name: 'Georgia', countryId: 233 },
//   { id: 15, code: 'GU', name: 'Guam', countryId: 233 },
//   { id: 16, code: 'ID', name: 'Idaho', countryId: 233 },
//   { id: 17, code: 'IL', name: 'Illinois', countryId: 233 },
//   { id: 18, code: 'IN', name: 'Indiana', countryId: 233 },
//   { id: 19, code: 'IA', name: 'Iowa', countryId: 233 },
//   { id: 20, code: 'KS', name: 'Kansas', countryId: 233 },
//   { id: 21, code: 'KY', name: 'Kentucky', countryId: 233 },
//   { id: 22, code: 'LA', name: 'Louisiana', countryId: 233 },
//   { id: 23, code: 'ME', name: 'Maine', countryId: 233 },
//   { id: 24, code: 'MH', name: 'Marshall Islands', countryId: 233 },
//   { id: 25, code: 'MD', name: 'Maryland', countryId: 233 },
//   { id: 26, code: 'MA', name: 'Massachusetts', countryId: 233 },
//   { id: 27, code: 'MI', name: 'Michigan', countryId: 233 },
//   { id: 28, code: 'MN', name: 'Minnesota', countryId: 233 },
//   { id: 29, code: 'MS', name: 'Mississippi', countryId: 233 },
//   { id: 30, code: 'MO', name: 'Missouri', countryId: 233 },
//   { id: 31, code: 'MT', name: 'Montana', countryId: 233 },
//   { id: 32, code: 'NE', name: 'Nebraska', countryId: 233 },
//   { id: 33, code: 'NV', name: 'Nevada', countryId: 233 },
//   { id: 34, code: 'NH', name: 'New Hampshire', countryId: 233 },
//   { id: 35, code: 'NJ', name: 'New Jersey', countryId: 233 },
//   { id: 36, code: 'NM', name: 'New Mexico', countryId: 233 },
//   { id: 37, code: 'NY', name: 'New York', countryId: 233 },
//   { id: 38, code: 'NC', name: 'North Carolina', countryId: 233 },
//   { id: 39, code: 'ND', name: 'North Dakota', countryId: 233 },
//   { id: 40, code: 'MP', name: 'Northern Mariana Islands', countryId: 233 },
//   { id: 41, code: 'OH', name: 'Ohio', countryId: 233 },
//   { id: 42, code: 'OK', name: 'Oklahoma', countryId: 233 },
//   { id: 43, code: 'OR', name: 'Oregon', countryId: 233 },
//   { id: 44, code: 'PW', name: 'Palau', countryId: 233 },
//   { id: 45, code: 'PA', name: 'Pennsylvania', countryId: 233 },
//   { id: 46, code: 'PR', name: 'Puerto Rico', countryId: 233 },
//   { id: 47, code: 'RI', name: 'Rhode Island', countryId: 233 },
//   { id: 48, code: 'SC', name: 'South Carolina', countryId: 233 },
//   { id: 49, code: 'SD', name: 'South Dakota', countryId: 233 },
//   { id: 50, code: 'TN', name: 'Tennessee', countryId: 233 },
//   { id: 51, code: 'TX', name: 'Texas', countryId: 233 },
//   { id: 52, code: 'UT', name: 'Utah', countryId: 233 },
//   { id: 53, code: 'VT', name: 'Vermont', countryId: 233 },
//   { id: 54, code: 'VI', name: 'Virgin Islands', countryId: 233 },
//   { id: 55, code: 'VA', name: 'Virginia', countryId: 233 },
//   { id: 56, code: 'WA', name: 'Washington', countryId: 233 },
//   { id: 57, code: 'WV', name: 'West Virginia', countryId: 233 },
//   { id: 58, code: 'WI', name: 'Wisconsin', countryId: 233 },
//   { id: 59, code: 'WY', name: 'Wyoming', countryId: 233 },
// ];

const businessTypes = [
  { label: 'Personal Business', value: 'Personal Business' },
  { label: 'Personal Property', value: 'Personal Property' },
];

const ownershipType = [
  { label: 'Proprietorship', value: 'Proprietorship' },
  { label: 'Partnership', value: 'Partnership' },
  { label: 'Corporation', value: 'Corporation' },
  { label: 'Other', value: '' },
];
const businessDescription = [
  { label: 'Retail', value: 'Retail' },
  { label: 'Wholesale', value: 'Wholesale' },
  { label: 'Manufacturer', value: 'Manufacturer' },
  { label: 'Service/Professional', value: 'Service/Professional' },
];
const saleContract = [
  { label: 'Leased equipment', value: 'Leased equipment' },
  { label: 'Lease-purchase option equipment', value: 'Lease-purchase option equipment' },
  { label: 'Capitalized leased equipment', value: 'Capitalized leased equipment' },
  { label: 'Vending equipment', value: 'Vending equipment' },
  { label: 'Other businesses', value: 'Other businesses' },
  { label: 'Government-owned property', value: 'Government-owned property' },
];
const taxObligation = [
  { label: 'Lessor', value: 'Lessor' },
  { label: 'Lessee', value: 'Lessee' },
];
const year = [
  { label: '2015', value: '2015' },
  { label: '2016', value: '2016' },
  { label: '2017', value: '2017' },
  { label: '2018', value: '2018' },
  { label: '2019', value: '2019' },
  { label: '2020', value: '2020' },
  { label: '2021', value: '2021' },
];
export const OPTIONS = {
  states,
  businessTypes,
  ownershipType,
  businessDescription,
  saleContract,
  taxObligation,
  year,
};
