import { Yup } from 'src/services';

export enum ForgotOnlineBusinessIdFormParam {
  FEIN = 'fein',
  EMAIL = 'email',
}

export type ForgotOnlineBusinessIdFormValue = {
  isBusinessOrganization: boolean;
  fein: string;
  email: string;
};

export const initialTPAForgotOnlineBusinessIdFormValue = {
  isBusinessOrganization: null,
  fein: '',
  email: '',
};

export const TPAForgotOnlineBusinessIdSchema = Yup.object().shape({
  isBusinessOrganization: Yup.boolean().nullable(),
  fein: Yup.string().when('isBusinessOrganization', {
    is: true,
    then: Yup.string().nullable().required().min(10, 'Federal ID Number must be 9 digits.'),
    otherwise: Yup.string().nullable(),
  }),
  email: Yup.string().required().email(),
});
