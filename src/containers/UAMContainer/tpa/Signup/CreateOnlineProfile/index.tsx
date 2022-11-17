import cn from 'classnames';
import { FormikProps } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { PATHS } from 'src/appConfig/paths';
import AnimatedTabPanel from 'src/components/AnimatedTabPanel';
import { Button, IconSuccess, NavLink, Text, View } from 'src/components/common';
import CustomStepper, { StepperStep } from 'src/components/Stepper';
import EmailConfirmationModal from 'src/containers/UAMContainer/common/EmailConfirmationModal';
import { useComponentDidMount, useComponentWillUnmount } from 'src/hooks';
import { TPACreateOnlineProfilePayload, VerifyRegistrationPayload } from 'src/queries';
import { useTPACreateOnlineProfile, useVerifyTPABusinessInfo } from 'src/queries/UAM/tpa';
import { hideDialog, showDialog } from 'src/redux/dialog/dialogSlice';
import { DIALOG_TYPES } from 'src/redux/dialog/type';
import { v4 as uuidv4 } from 'uuid';
import {
  clearFormState,
  setActiveStep,
  setFormData,
  setFormSteps,
  setMaxValidStep,
} from 'src/redux/form/formSlice';
import { IRootState } from 'src/redux/store';
import { Callback } from 'src/redux/types';
import { ErrorService, Navigator, Toastify } from 'src/services';
import { isEmpty } from 'src/validations';
import { SCREEN_KEY } from '..';
import { CreateOnlineProfile, handleCheckValidSteps, INITIAL } from './helpers';
import Step0 from './Step0';
import Step1 from './Step1';

const VERIFY_REGISTRATION_STEP = 0;
const SUBMIT_STEP = 1;

const defaultSteps = [
  { label: `${'Employer Verification Information'}`, index: VERIFY_REGISTRATION_STEP },
  { label: `${'User and Business\nIdentification Information'}`, index: SUBMIT_STEP },
];

const checkDiffRegistration = (formData: CreateOnlineProfile, value: CreateOnlineProfile) =>
  formData.federalEmployerIdentificationNumber !== value.federalEmployerIdentificationNumber ||
  formData.businessName !== value.businessName;

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
  onChangeScreen,
}) => {
  const formRef = useRef<FormikProps<any>>(null);

  const isSubmitStep = activeStep === SUBMIT_STEP;
  const isVerifyRegistrationStep = activeStep === VERIFY_REGISTRATION_STEP;

  const { verifyTPABusinessInfo, isVerifyingTPABusinessInfo } = useVerifyTPABusinessInfo();
  const [isSignUpSuccess, setSignUpSuccess] = useState<boolean>(false);

  const handleConfirmSuccess = () => {
    onHideDialog();
    // login(payload);
    setSignUpSuccess(true);
  };

  const { isCreating, createProfile } = useTPACreateOnlineProfile({
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
    onError: (error) => {
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

  const handleVerifyError = (error) => {
    switch (error.errorId) {
      case ErrorService.TYPES.badRequest:
        return formRef.current?.setErrors({
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
    };
    verifyTPABusinessInfo(payload, {
      onSuccess(data, variables, context) {
        if (data?.data?.isAvailable === true) {
          onSetFormData(value);
          onSetActiveStep(activeStep + 1);
        } else {
          formRef.current?.setErrors({
            federalEmployerIdentificationNumber: '   ',
            businessName: '   ',
          });
          return Toastify.warning('An account with given information already exists');
        }
      },
      onError(error, variables, context) {
        handleVerifyError(error);
      },
    });
  };

  const logicSubmit = (value) => {
    onSetFormData(value);
    onSetActiveStep(activeStep + 1);
  };

  const handleSubmit = (value: CreateOnlineProfile) => {
    if (isSubmitStep) {
      onSetFormData(value);
      const payload: TPACreateOnlineProfilePayload = {
        ...value,
        federalEmployerIdentificationNumber: value.federalEmployerIdentificationNumber.replace(
          /-/g,
          ''
        ),
        username: uuidv4(),
      };
      return createProfile(payload);
    } else if (
      isVerifyRegistrationStep &&
      checkDiffRegistration(formData, value) &&
      value.isBusinessOrganization
    ) {
      return handleVerifyRegistration(value);
    }

    logicSubmit(value);
  };

  const logicBack = (value) => {
    onSetFormData(value);
    onSetActiveStep(activeStep - 1);
  };

  const handleBack = (value: CreateOnlineProfile) => {
    if (activeStep === 0) {
      return onChangeScreen(SCREEN_KEY.TPA_REGISTRATION);
    }
    logicBack(value);
  };

  const changeStep = (value, step) => {
    onSetFormData(value);
    onSetActiveStep(step);
  };

  const preLogicChangeStep = (value, step: number) => {
    if (isVerifyRegistrationStep && checkDiffRegistration(formData, value)) {
      return handleVerifyRegistration(value);
    }

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

  if (isEmpty(formData)) return null;

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
            {'Create TPA Online Profile'}
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
              isLoading={isVerifyingTPABusinessInfo}
              onBack={handleBack}
            />
          </View>

          <View renderIf={activeStep === 1}>
            <Step1
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

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    onChangeScreen: Callback;
  };

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
