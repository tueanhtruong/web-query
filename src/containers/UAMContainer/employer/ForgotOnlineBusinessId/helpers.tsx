import { Yup } from 'src/services';

export enum ForgotOnlineBusinessIdFormParam {
  FEIN = 'fein',
  UI_ACCOUNT_NUMBER = 'uiAccountNumber',
  EMAIL = 'email',
}

export type ForgotOnlineBusinessIdFormValue = {
  uiAccountNumber: string;
  fein: string;
  email: string;
};

export const initialForgotOnlineBusinessIdFormValue = {
  uiAccountNumber: '',
  fein: '',
  email: '',
};

export const ForgotOnlineBusinessIdSchema = Yup.object().shape({
  uiAccountNumber: Yup.string().required().min(10, 'UI Account Number must be 10 digits.'),
  fein: Yup.string().required().min(9, 'Federal ID Number must be 9 digits.'),
  email: Yup.string().required().email(),
});
