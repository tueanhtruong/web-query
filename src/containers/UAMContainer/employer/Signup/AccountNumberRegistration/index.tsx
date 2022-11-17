import React, { useEffect, useRef, useState } from 'react';
import { Button, IconSuccess, NavLink, Text, View } from 'src/components/common';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
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
import { AccountNumberRegistrationType, handleCheckValidSteps, INITIAL } from './helpers';
import CustomStepper, { StepperStep } from 'src/components/Stepper';
import { FormikProps } from 'formik';
import AnimatedTabPanel from 'src/components/AnimatedTabPanel';
import Step0 from './Step0';
import Step1 from './Step1';
import { PATHS } from 'src/appConfig/paths';
import { isEmpty } from 'src/validations';
import { ErrorService, Navigator, Toastify } from 'src/services';
import {
  EmployerSignUpPayload,
  SignInPayload,
  useVerifyFEIN,
  VerifyFEINPayload,
} from 'src/queries';
import { useEmployerSignUp } from 'src/queries/UAM/employer/useEmployerSignup';
import { DIALOG_TYPES } from 'src/redux/dialog/type';
import EmailConfirmationModal from 'src/containers/UAMContainer/common/EmailConfirmationModal';

const VERIFY_STEP = 0;
const SUBMIT_STEP = 1;

const defaultSteps = [
  { label: `${'Employer Verification Information'}`, index: VERIFY_STEP },
  { label: `${'User and Business Identification\nInformation'}`, index: SUBMIT_STEP },
];

const AccountNumberRegistration: React.FC<Props> = ({
  activeStep,
  formData,
  maxValidStep,
  steps,
  onClearFormState,
  onSetActiveStep,
  onSetFormData,
  onSetMaxValidStep,
  onSetFormSteps,
  onShowDialog,
  onHideDialog,
}) => {
  const formRef = useRef<FormikProps<any>>(null);

  const [isSignUpSuccess, setSignUpSuccess] = useState<boolean>(false);

  const handleConfirmSuccess = (payload: SignInPayload) => {
    onHideDialog();
    // login(payload);
    setSignUpSuccess(true);
  };

  const { verifyFEIN, isVerifyingFEIN } = useVerifyFEIN({
    onError: (error) => {
      if ((error as any).code === 400)
        formRef.current.setFieldError('federalEmployerIdentificationNumber', error?.message);
      else Toastify.error(error?.message);
    },
  });

  const { signup, isSigningUp } = useEmployerSignUp({
    onSuccess(data, variables, context) {
      onShowDialog({
        type: DIALOG_TYPES.CONTENT_DIALOG,
        data: {
          content: (
            <EmailConfirmationModal
              username={variables.username}
              onConfirmSuccess={() =>
                handleConfirmSuccess({ username: variables.username, password: variables.password })
              }
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

  const handleCreateAccount = (values: AccountNumberRegistrationType) => {
    const payload: EmployerSignUpPayload = {
      ...values,
      username: uuidv4(),
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      middleName: values.middleName.trim(),
      federalEmployerIdentificationNumber: values.federalEmployerIdentificationNumber.replace(
        /-/g,
        ''
      ),
      employerType: 'NORMAL',
    };
    signup(payload);
  };

  const isSubmitStep = activeStep === SUBMIT_STEP;
  const isVerifyStep = activeStep === VERIFY_STEP;
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
  ///////////////// -- Submit -- ///////////////////

  const handleSubmit = (value: AccountNumberRegistrationType) => {
    if (isSubmitStep) handleCreateAccount(value);
    // if moving from first step, verify FEIN number available
    else if (
      isVerifyStep &&
      value.federalEmployerIdentificationNumber !== formData.federalEmployerIdentificationNumber
    ) {
      const payload: VerifyFEINPayload = {
        fein: value.federalEmployerIdentificationNumber?.replace(/-/g, ''),
      };
      return verifyFEIN(payload, {
        onSuccess: (response) => {
          const isAvailable = response.data?.isAvailable;
          if (isAvailable) {
            onSetActiveStep(activeStep + 1);
            onSetFormData(value);
          } else
            formRef.current.setFieldError(
              'federalEmployerIdentificationNumber',
              'This FEIN already exists. Please try again.'
            );
        },
      });
    } else {
      onSetActiveStep(activeStep + 1);
      onSetFormData(value);
    }
  };
  ///////////////// -- Back -- ///////////////////

  const handleBack = (value: AccountNumberRegistrationType) => {
    onSetFormData(value);
    onSetActiveStep(activeStep - 1);
  };
  ///////////////// -- Change Step -- ///////////////////

  const logicChangeStep = (value, step) => {
    if (
      isVerifyStep &&
      value.federalEmployerIdentificationNumber !== formData.federalEmployerIdentificationNumber
    ) {
      const payload: VerifyFEINPayload = {
        fein: value.federalEmployerIdentificationNumber?.replace(/-/g, ''),
      };
      return verifyFEIN(payload, {
        onSuccess(data, variables, context) {
          const isAvailable = data.data?.isAvailable;
          if (isAvailable) {
            onSetFormData(value);
            onSetActiveStep(step);
          } else
            formRef.current.setFieldError(
              'federalEmployerIdentificationNumber',
              'This FEIN already exists. Please try again.'
            );
        },
      });
    }
    onSetFormData(value);
    onSetActiveStep(step);
  };

  const handleChangeStep = async (step: number) => {
    const value = formRef.current?.values;
    if (step < activeStep) {
      logicChangeStep(value, step);
    } else if (step >= activeStep) {
      const { newMaxValidStep } = await handleCheckValidSteps(steps, value, maxValidStep);
      if (newMaxValidStep >= step) logicChangeStep(value, step);
    }
  };

  return (
    <View>
      {isSignUpSuccess ? (
        <View>
          <View isRow align="center" className="mb-24">
            <IconSuccess size={46} />
            <h1 className={cn('ctn-uam__title ml-16')}>{'Success'}</h1>
          </View>
          <Text isTranslatable>
            Welcome to DLIR UI. Your account has been successfully created.
          </Text>
          <Button className="mt-24" onClick={() => Navigator.navigate(PATHS.signIn)}>
            Log In
          </Button>
        </View>
      ) : (
        <View isRow align="center" justify="space-between" className="">
          <Text size={40} className={cn('fw-bold  text-color-grey-900')}>
            {'UI Account Number Registration'}
          </Text>
        </View>
      )}

      {!isSignUpSuccess && (
        <>
          <CustomStepper
            steps={steps}
            activeStep={activeStep}
            onChange={handleChangeStep}
            maxValidStep={maxValidStep}
          />
          <AnimatedTabPanel key={`Registration-step-${activeStep}`}>
            <View renderIf={activeStep === 0}>
              <Step0
                formRef={formRef}
                initialValue={formData}
                onSubmit={handleSubmit}
                isLoading={isVerifyingFEIN}
              />
            </View>
            <View renderIf={activeStep === 1}>
              <Step1
                formRef={formRef}
                initialValue={formData}
                onSubmit={handleSubmit}
                onBack={handleBack}
                isLoading={isSigningUp}
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
        </>
      )}
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
