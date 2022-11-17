import { StepperStep } from 'src/components/Stepper';
import { ErrorService, Yup } from 'src/services';

export interface CreateOnlineProfile {
  isBusinessOrganization: boolean;
  federalEmployerIdentificationNumber: string;
  businessName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  middleName: string;
  title: string;
  password: string;
  onlineBusinessId: string;
}

export const INITIAL: CreateOnlineProfile = {
  isBusinessOrganization: null,
  federalEmployerIdentificationNumber: '',
  businessName: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  email: '',
  phoneNumber: '',
  firstName: '',
  lastName: '',
  middleName: '',
  title: '',
  password: '', // pragma: allowlist secret
  onlineBusinessId: '',
};

export const Step0Schema = Yup.object().shape({
  isBusinessOrganization: Yup.boolean().nullable().required(),
  federalEmployerIdentificationNumber: Yup.string().when('isBusinessOrganization', {
    is: true,
    then: Yup.string().nullable().min(10, 'FEIN must be 9 digits.').required(),
    otherwise: Yup.string().nullable(),
  }),
  businessName: Yup.string().when('isBusinessOrganization', {
    is: true,
    then: Yup.string().nullable().required(),
    otherwise: Yup.string().nullable(),
  }),
  address: Yup.string().when('isBusinessOrganization', {
    is: false,
    then: Yup.string().nullable().required().max(30),
    otherwise: Yup.string().nullable(),
  }),
  city: Yup.string().when('isBusinessOrganization', {
    is: false,
    then: Yup.string().nullable().required().max(20),
    otherwise: Yup.string().nullable(),
  }),
  state: Yup.string().when('isBusinessOrganization', {
    is: false,
    then: Yup.string().nullable().required(),
    otherwise: Yup.string().nullable(),
  }),
  zipCode: Yup.string().when('isBusinessOrganization', {
    is: false,
    then: Yup.string().nullable().min(5, 'ZIP code must be 5 digits.').required(),
    otherwise: Yup.string().nullable(),
  }),
});

export const Step1Schema = Yup.object().shape({
  email: Yup.string().email().required(),
  phoneNumber: Yup.string().phone().required(),
  firstName: Yup.string()
    .max(25)
    .required()
    .letterOnly(ErrorService.MESSAGES.pleaseUseEnglishAlphabetForInput)
    .notTrimmable(),
  lastName: Yup.string()
    .max(25)
    .required()
    .letterOnly(ErrorService.MESSAGES.pleaseUseEnglishAlphabetForInput)
    .notTrimmable(),
  middleName: Yup.string()
    .max(25)
    .letterOnly(ErrorService.MESSAGES.pleaseUseEnglishAlphabetForInput)
    .notTrimmable(),
  title: Yup.string().required(),
  password: Yup.string().password('  ').required(),
  onlineBusinessId: Yup.string().businessId('  ').required(),
});

export const handleCheckValidSteps = async (
  steps: Array<StepperStep>,
  formData: any,
  maxValidStep: number
): Promise<{ steps: Array<StepperStep>; newMaxValidStep: number }> => {
  const validResults = await Promise.all([
    Step0Schema.isValid(formData),
    Step1Schema.isValid(formData),
  ]);

  const findMaxValid = validResults.indexOf(false);

  const newMaxValidStep = findMaxValid === -1 ? maxValidStep : findMaxValid;

  return {
    steps: steps.map((step, idx) =>
      newMaxValidStep < idx
        ? { ...step, isError: undefined }
        : // eslint-disable-next-line security/detect-object-injection
          { ...step, isError: !validResults[idx] }
    ),
    newMaxValidStep,
  };
};
