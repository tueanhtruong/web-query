import { StepperStep } from 'src/components/Stepper';
import { ErrorService, Yup } from 'src/services';

export interface AccountNumberRegistrationType {
  federalEmployerIdentificationNumber: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  middleName: string;
  title: string;
  password: string;
  onlineBusinessId: string;
}

export const INITIAL: AccountNumberRegistrationType = {
  federalEmployerIdentificationNumber: '',
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
  federalEmployerIdentificationNumber: Yup.string().min(10, 'FEIN must be 9 digits.').required(),
});
export const Step1Schema = Yup.object().shape({
  email: Yup.string().email().required(),
  phoneNumber: Yup.string().phone().required(),
  firstName: Yup.string()
    .max(25)
    .required()
    .letterOnly(ErrorService.MESSAGES.pleaseUseEnglishAlphabetForInput),
  lastName: Yup.string()
    .max(25)
    .required()
    .letterOnly(ErrorService.MESSAGES.pleaseUseEnglishAlphabetForInput),
  middleName: Yup.string()
    .max(25)
    .letterOnly(ErrorService.MESSAGES.pleaseUseEnglishAlphabetForInput),
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
