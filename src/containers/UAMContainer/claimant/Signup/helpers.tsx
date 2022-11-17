import { ErrorService, Yup } from 'src/services';

export enum SignUpFormParam {
  SOCIAL_SECURITY_NUMBER = 'socialSecurityNumber',
  DOB = 'dateOfBirth',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  MIDDLE_NAME = 'middleName',
  EMAIL = 'email',
  PASSWORD = 'password', // pragma: allowlist secret
}

export type SignUpFormValue = {
  socialSecurityNumber: string;
  dateOfBirth: string | Date;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  password: string;
};

export const initialSignUpFormValue = {
  socialSecurityNumber: '',
  dateOfBirth: null,
  firstName: '',
  lastName: '',
  middleName: '',
  email: '',
  password: '',
};

export const SignUpSchema = Yup.object().shape({
  socialSecurityNumber: Yup.string().required().ssn().min(11, 'Please enter 9-digit value.'),
  dateOfBirth: Yup.string().required().nullable(),
  firstName: Yup.string()
    .letterOnly(ErrorService.MESSAGES.pleaseUseEnglishAlphabetForInput)
    .required()
    .max(25),
  lastName: Yup.string()
    .letterOnly(ErrorService.MESSAGES.pleaseUseEnglishAlphabetForInput)
    .required()
    .max(25),
  middleName: Yup.string()
    .letterOnly(ErrorService.MESSAGES.pleaseUseEnglishAlphabetForInput)
    .max(25),
  email: Yup.string().required().email(),
  password: Yup.string().password().required(),
});
