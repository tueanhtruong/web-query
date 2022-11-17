import React, { useEffect, useRef, useState } from 'react';
import { Button, IconSuccess, NavLink, Text, View } from 'src/components/common';
import cn from 'classnames';
import { IRootState } from 'src/redux/store';
import { hideDialog, showDialog } from 'src/redux/dialog/dialogSlice';
import { connect } from 'react-redux';
import {
  clearFormState,
  setActiveStep,
  setFormData,
  setFormSteps,
  setMaxValidStep,
} from 'src/redux/form/formSlice';
import { useComponentDidMount, useComponentWillUnmount } from 'src/hooks';
import { CreateOnlineProfile, handleCheckValidSteps, INITIAL } from './helpers';
import CustomStepper, { StepperStep } from 'src/components/Stepper';
import { FormikProps } from 'formik';
import AnimatedTabPanel from 'src/components/AnimatedTabPanel';
import Step0 from './Step0';
import Step1 from './Step1';
import { PATHS } from 'src/appConfig/paths';
import { isEmpty } from 'src/validations';
import { ErrorService, Navigator, Toastify } from 'src/services';
import Step2 from './Step2';
import { Callback } from 'src/redux/types';
import { DIALOG_TYPES } from 'src/redux/dialog/type';
import {
  CreateOnlineProfilePayload,
  useCreateOnlineProfile,
  useVerifyRegistration,
  useVerifyWage,
  VerifyRegistrationPayload,
  VerifyWagePayload,
  VerifyWageResponse,
} from 'src/queries';
import EmailConfirmationModal from 'src/containers/UAMContainer/common/EmailConfirmationModal';
import { v4 as uuidv4 } from 'uuid';

const VERIFY_REGISTRATION_STEP = 0;
const SUBMIT_STEP = 2;

const defaultSteps = [
  { label: `${'Employer Verification Information'}`, index: VERIFY_REGISTRATION_STEP },
  { label: `${'Quarterly Wage Information'}`, index: 1 },
  { label: `${'User and Business\nIdentification Information'}`, index: SUBMIT_STEP },
];

const checkDiffRegistration = (formData: CreateOnlineProfile, value: CreateOnlineProfile) =>
  formData.federalEmployerIdentificationNumber !== value.federalEmployerIdentificationNumber ||
  formData.unemploymentInsuranceNumber !== value.unemploymentInsuranceNumber;

const AccountNumberRegistration: React.FC<Props> = ({
  activeStep,
  formData,
  maxValidStep,
  steps,
  onShowDialog,
  onHideDialog,
  onClearFormState,
  onSetActiveStep,
  onSetFormData,
  onSetFormSteps,
  onSetMaxValidStep,
}) => {
  const formRef = useRef<FormikProps<any>>(null);

  const isSubmitStep = activeStep === SUBMIT_STEP;
  const isVerifyRegistrationStep = activeStep === VERIFY_REGISTRATION_STEP;

  const { verifyRegistration, isVerifyingRegistration } = useVerifyRegistration();
  const { verifyWage, isVerifyingWage } = useVerifyWage();
  const [isSignUpSuccess, setSignUpSuccess] = useState<boolean>(false);

  const handleConfirmSuccess = () => {
    onHideDialog();
    // login(payload);
    setSignUpSuccess(true);
  };

  const { createProfile, isCreating } = useCreateOnlineProfile({
    onSuccess(data, variables, context) {
      onShowDialog({
        type: DIALOG_TYPES.CONTENT_DIALOG,
        data: {
          content: (
            <EmailConfirmationModal
              username={variables.username}
              onConfirmSuccess={() => handleConfirmSuccess()}
            />
          ),
          hideTitle: true,
        },
      });
    },
    onError(error, variables, context) {
      handleError(error);
    },
  });
  const handleError = (error: AuthError) => {
    switch (error.code) {
      case ErrorService.TYPES.InvalidPasswordException:
        return formRef.current.setErrors({ password: error.message });

      case ErrorService.TYPES.UsernameExistsException:
        return formRef.current.setErrors({ email: error.message });

      case ErrorService.TYPES.UserLambdaValidationException:
        formRef.current.setErrors({ email: ' ', onlineBusinessId: ' ' });
        return Toastify.warning('An account with given credentials already exists.');

      default:
        return ErrorService.handler(error);
    }
  };
  ///////////////// -- STEP STATUS -- ///////////////////

  const handleUpdateNewSteps = async (
    steps: Array<StepperStep>,
    formData: any,
    maxValidStep: number
  ) => {
    const { steps: newSteps, newMaxValidStep } = await handleCheckValidSteps(
      steps,
      formData,
      maxValidStep
    );
    onSetFormSteps(newSteps);
    if (newMaxValidStep !== maxValidStep) onSetMaxValidStep(newMaxValidStep);
  };

  useEffect(() => {
    if (!isEmpty(steps)) {
      handleUpdateNewSteps(steps, formData, maxValidStep);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  useComponentDidMount(() => {
    onSetFormData(INITIAL);
    onSetFormSteps(defaultSteps);
  });

  useComponentWillUnmount(() => onClearFormState());

  if (isEmpty(formData)) return null;

  ///////////////// -- Verify Registration -- ///////////////////

  const handleVerifyError = (error) => {
    switch (error.errorId) {
      case ErrorService.TYPES.badRequest:
        return formRef.current?.setErrors({
          unemploymentInsuranceNumber: error.message,
          federalEmployerIdentificationNumber: error.message,
        });
      default:
        return Toastify.error(error.message);
    }
  };

  const handleVerifyRegistration = (value: CreateOnlineProfile) => {
    const payload: VerifyRegistrationPayload = {
      fein: value.federalEmployerIdentificationNumber.replace(/-/g, ''),
      businessName: value.businessName,
      uiAccountNumber: value.unemploymentInsuranceNumber,
    };
    verifyRegistration(payload, {
      onSuccess(data, variables, context) {
        onSetFormData(value);
        onSetActiveStep(activeStep + 1);
      },
      onError(error, variables, context) {
        handleVerifyError(error);
      },
    });
  };

  ///////////////// -- Verify Wage -- ///////////////////

  const handleVerifyWageError = (onSuccess: Callback, value: CreateOnlineProfile) => {
    const updatedValue: CreateOnlineProfile = {
      ...value,
      wageValidationAttempt: formData.wageValidationAttempt - 1,
    };
    onShowDialog({
      type: DIALOG_TYPES.YESNO_DIALOG,
      data: {
        content: `The information you provided does not match our records. Correct the information on this page or if the information you provided is correct, please continue, You have ${updatedValue.wageValidationAttempt} more attempts.`,
        title: 'Attention',
        okText: 'Continue',
        cancelText: 'Revise',
        onOk: () => {
          onSuccess(updatedValue);
          onHideDialog();
        },
        onCancel: () => {
          onSetFormData({ ...formData, wageValidationAttempt: updatedValue.wageValidationAttempt });
          onHideDialog();
        },
      },
    });
  };

  const handleCheckQuarterlyWage = (onSuccess: Callback, value: CreateOnlineProfile) => {
    const payload: VerifyWagePayload = {
      fein: value.federalEmployerIdentificationNumber.replace(/-/g, ''),
      businessName: value.businessName,
      uiAccountNumber: value.unemploymentInsuranceNumber,
      wage: value.quarterlyWage,
    };

    return verifyWage(payload, {
      onSuccess(data: VerifyWageResponse, variables, context) {
        const { data: resData } = data;
        const updatedValue = { ...value, employerId: resData.employerId };
        if (resData.isSuccess) onSuccess(updatedValue);
        else {
          handleVerifyWageError(onSuccess, updatedValue);
        }
      },
      onError(error, variables, context) {
        handleVerifyWageError(onSuccess, value);
      },
    });
  };

  ///////////////// -- Submit -- ///////////////////

  const logicSubmit = (value) => {
    onSetFormData(value);
    onSetActiveStep(activeStep + 1);
  };

  const handleSubmit = (value: CreateOnlineProfile) => {
    const isNeedCheckQuarterlyWage =
      formData.wageValidationAttempt &&
      value.quarterlyWage !== null &&
      value.quarterlyWage !== formData.quarterlyWage;
    if (isSubmitStep) {
      onSetFormData(value);
      const payload: CreateOnlineProfilePayload = {
        ...value,
        federalEmployerIdentificationNumber: value.federalEmployerIdentificationNumber.replace(
          /-/g,
          ''
        ),
        employerType: 'NORMAL',
        username: uuidv4(),
      };

      return createProfile(payload);

      // Toastify.warning('TODO:// cal api Create Online Profile');
    } else if (isVerifyRegistrationStep && checkDiffRegistration(formData, value)) {
      return handleVerifyRegistration(value);
    }
    if (isNeedCheckQuarterlyWage)
      return handleCheckQuarterlyWage((value) => logicSubmit(value), value);

    logicSubmit(value);
  };

  ///////////////// -- Back -- ///////////////////

  const logicBack = (value) => {
    onSetFormData(value);
    onSetActiveStep(activeStep - 1);
  };

  const handleBack = (value: CreateOnlineProfile) => {
    const isNeedCheckQuarterlyWage =
      formData.wageValidationAttempt &&
      value.quarterlyWage !== null &&
      value.quarterlyWage !== formData.quarterlyWage;
    if (isNeedCheckQuarterlyWage) handleCheckQuarterlyWage((value) => logicBack(value), value);
    else logicBack(value);
  };

  ///////////////// -- Change Step -- ///////////////////

  const changeStep = (value, step) => {
    onSetFormData(value);
    onSetActiveStep(step);
  };

  const preLogicChangeStep = (value, step: number) => {
    if (isVerifyRegistrationStep && checkDiffRegistration(formData, value)) {
      return handleVerifyRegistration(value);
    }
    const isNeedCheckQuarterlyWage =
      formData.wageValidationAttempt &&
      value.quarterlyWage !== null &&
      value.quarterlyWage !== formData.quarterlyWage;
    if (isNeedCheckQuarterlyWage)
      return handleCheckQuarterlyWage((value) => changeStep(value, step), value);
    changeStep(value, step);
  };

  const handleChangeStep = async (step: number) => {
    const value = formRef.current?.values;

    if (step < activeStep) {
      preLogicChangeStep(value, step);
    } else if (step >= activeStep) {
      const { newMaxValidStep } = await handleCheckValidSteps(steps, value, maxValidStep);
      if (newMaxValidStep >= step) {
        preLogicChangeStep(value, step);
      }
    }
  };

  return (
    <View>
      <View renderIf={isSignUpSuccess}>
        <View isRow align="center" className="mb-24">
          <IconSuccess size={46} />
          <h1 className={cn('ctn-uam__title ml-16')}>{'Success'}</h1>
        </View>
        <Text isTranslatable>Welcome to DLIR UI. Your account has been successfully created.</Text>
        <Button className="mt-24" onClick={() => Navigator.navigate(PATHS.signIn)}>
          Log In
        </Button>
      </View>
      <View renderIf={!isSignUpSuccess}>
        <View isRow align="center" justify="space-between" className="">
          <Text size={40} className={cn('fw-bold  text-color-grey-900')}>
            {'Create Online Profile'}
          </Text>
        </View>
        <CustomStepper
          steps={steps}
          activeStep={activeStep}
          onChange={handleChangeStep}
          maxValidStep={maxValidStep}
          maxWidth={220}
        />
        <AnimatedTabPanel key={`Registration-step-${activeStep}`}>
          <View renderIf={activeStep === 0}>
            <Step0
              formRef={formRef}
              initialValue={formData}
              onSubmit={handleSubmit}
              isLoading={isVerifyingRegistration}
            />
          </View>
          <View renderIf={activeStep === 1}>
            <Step1
              formRef={formRef}
              initialValue={formData}
              onSubmit={handleSubmit}
              onBack={handleBack}
              isLoading={isVerifyingWage}
            />
          </View>
          <View renderIf={activeStep === 2}>
            <Step2
              formRef={formRef}
              initialValue={formData}
              onSubmit={handleSubmit}
              onBack={handleBack}
              isLoading={isCreating}
            />
          </View>
        </AnimatedTabPanel>
        <View isRow className="mt-32" justify="center">
          <Text className="text-center" size={16}>
            Already had an account?{' '}
            <NavLink className={'fw-medium text-is-16'} to={PATHS.signIn}>
              Log In
            </NavLink>
          </Text>
        </View>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

const mapStateToProps = (state: IRootState) => ({
  formData: state.form.formData,
  activeStep: state.form.activeStep,
  maxValidStep: state.form.maxValidStep,
  steps: state.form.formSteps,
});

const mapDispatchToProps = {
  onShowDialog: showDialog,
  onHideDialog: hideDialog,
  onSetFormData: setFormData,
  onSetActiveStep: setActiveStep,
  onSetFormSteps: setFormSteps,
  onClearFormState: clearFormState,
  onSetMaxValidStep: setMaxValidStep,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountNumberRegistration);
