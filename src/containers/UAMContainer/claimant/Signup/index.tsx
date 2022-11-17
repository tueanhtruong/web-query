/* eslint-disable react-hooks/exhaustive-deps */
import { useMediaQuery } from '@material-ui/core';
import cn from 'classnames';
import dayjs from 'dayjs';
import { Formik, FormikProps } from 'formik';
import { History } from 'history';
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { muiResponsive } from 'src/appConfig/constants';
import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import {
  Button,
  DatePicker,
  Form,
  Grid,
  IconSuccess,
  Image,
  Input,
  InputMaskPassword,
  InputPassword,
  NavLink,
  Text,
  ValidatePassword,
  View,
} from 'src/components/common';
import Logo from 'src/components/Logo';
import { useSignUp } from 'src/queries';
import { SignInPayload, SignUpPayload } from 'src/queries/UAM/types';
import { hideDialog, showDialog } from 'src/redux/dialog/dialogSlice';
import { DIALOG_TYPES } from 'src/redux/dialog/type';
// import { hideModal, showModal } from 'src/redux/modal/modalSlice';
import { IRootState } from 'src/redux/rootReducer';
import { ErrorService, Navigator } from 'src/services';
import { formatDate } from 'src/utils';
import EmailConfirmationModal from '../../common/EmailConfirmationModal';
import { initialSignUpFormValue, SignUpFormParam, SignUpFormValue, SignUpSchema } from './helpers';
import './styles.scss';
import { v4 as uuidv4 } from 'uuid';

const SignUp: React.FC<Props> = ({ onShowDialog, onHideDialog }) => {
  const formRef = useRef<FormikProps<SignUpFormValue>>(null);
  const isTabletScreen = useMediaQuery(muiResponsive.TABLET);

  const [isSignUpSuccess, setSignUpSuccess] = useState<boolean>(false);

  const handleConfirmSuccess = (payload: SignInPayload) => {
    onHideDialog();
    // login(payload);
    setSignUpSuccess(true);
  };

  const { signup, isSigningUp } = useSignUp({
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

  // =========================== SIGN UP ===========================

  const handleCreateAccount = (values: SignUpFormValue) => {
    const payload: SignUpPayload = {
      ...values,
      username: uuidv4(),
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      dateOfBirth: formatDate((values.dateOfBirth as Date).toISOString(), 'YYYY-MM-DD'),
      socialSecurityNumber: values.socialSecurityNumber.replaceAll('-', ''),
    };

    signup(payload);
  };

  const handleError = (error: AuthError) => {
    switch (error.code) {
      case ErrorService.TYPES.InvalidPasswordException:
        return formRef.current.setErrors({ password: error.message });

      case ErrorService.TYPES.UsernameExistsException:
        return formRef.current.setErrors({ email: error.message });

      case ErrorService.TYPES.UserLambdaValidationException:
        if (error.message.includes(ErrorService.MESSAGES.userExistError))
          return formRef.current.setErrors({
            email: ErrorService.MESSAGES.accountExist,
          });
        return formRef.current.setErrors({
          socialSecurityNumber: ErrorService.MESSAGES.SSNMessage,
        });

      case ErrorService.TYPES.NotAuthorizedException:
        return;

      default:
        return ErrorService.handler(error);
    }
  };

  return (
    <View className="ctn-uam" flexGrow={1}>
      <Image className="ctn-uam__image" src={IMAGES.backgroundLogin} />
      <View className="ctn-uam__container--wrap" flexGrow={1}>
        <View className="ctn-uam__container pt-24" flexGrow={1}>
          <Logo
            className="mb-16"
            isColumn={isTabletScreen}
            subTitleSize={isTabletScreen ? 14 : 16}
          />
          {isSignUpSuccess ? (
            <View>
              <View isRow align="center" className="mb-24">
                <IconSuccess size={46} />
                <h1 className={cn('ctn-uam__title ml-16')}>{'Success'}</h1>
              </View>
              <Text>Welcome to DLIR UI. Your account has been successfully created.</Text>
              <Button className="mt-24" onClick={() => Navigator.navigate(PATHS.signIn)}>
                Log In
              </Button>
            </View>
          ) : (
            <Text size={40} className={cn('fw-bold mb-24 text-color-grey-900')}>
              {'Create New Account'}
            </Text>
          )}
          {!isSignUpSuccess && (
            <Formik
              initialValues={initialSignUpFormValue}
              onSubmit={handleCreateAccount}
              validationSchema={SignUpSchema}
              innerRef={formRef}
            >
              {({ values, errors, touched, getFieldProps, handleSubmit, setFieldValue }) => {
                return (
                  <Form onSubmit={handleSubmit} autoComplete="off" className="ctn-uam__form">
                    <Grid.Wrap className="mb-1">
                      <Grid.Item variant="is-full">
                        <InputMaskPassword
                          mask="999-99-9999"
                          label="Social Security Number"
                          required
                          placeholder="AAA-GG-SSSS (no dashes)"
                          errorMessage={
                            touched.socialSecurityNumber
                              ? (errors.socialSecurityNumber as string)
                              : ''
                          }
                          {...getFieldProps(SignUpFormParam.SOCIAL_SECURITY_NUMBER)}
                        />
                      </Grid.Item>
                      <Grid.Item variant="is-full">
                        <DatePicker
                          label={`Date of Birth`}
                          required
                          errorMessage={touched.dateOfBirth ? (errors.dateOfBirth as string) : ''}
                          placeholder={'MM/DD/YYYY'}
                          {...getFieldProps(SignUpFormParam.DOB)}
                          selected={values.dateOfBirth}
                          onChange={setFieldValue}
                          maxDate={dayjs().subtract(14, 'year').toDate()}
                        />
                      </Grid.Item>
                      <Grid.Item>
                        <Input
                          label="First Name"
                          required
                          placeholder="First Name"
                          errorMessage={touched.firstName ? errors.firstName : ''}
                          {...getFieldProps(SignUpFormParam.FIRST_NAME)}
                        />
                      </Grid.Item>

                      <Grid.Item>
                        <Input
                          label="Last Name"
                          required
                          placeholder="Last Name"
                          errorMessage={touched.lastName ? errors.lastName : ''}
                          {...getFieldProps(SignUpFormParam.LAST_NAME)}
                        />
                      </Grid.Item>

                      <Grid.Item variant="is-full">
                        <Input
                          label="Middle Name"
                          placeholder="Middle Name"
                          errorMessage={touched.middleName ? errors.middleName : ''}
                          {...getFieldProps(SignUpFormParam.MIDDLE_NAME)}
                        />
                      </Grid.Item>

                      <Grid.Item variant="is-full">
                        <Input
                          label="Email Address"
                          required
                          placeholder="Email Address"
                          errorMessage={touched.email ? errors.email : ''}
                          {...getFieldProps(SignUpFormParam.EMAIL)}
                        />
                      </Grid.Item>

                      <Grid.Item variant="is-full">
                        <InputPassword
                          label="Password"
                          required
                          placeholder="Password"
                          errorMessage={touched.password ? errors.password : ''}
                          {...getFieldProps(SignUpFormParam.PASSWORD)}
                        />
                        <ValidatePassword password={values.password} />
                      </Grid.Item>
                      {/* <Grid.Item variant="is-full">
                      </Grid.Item> */}
                    </Grid.Wrap>

                    <Button
                      type="submit"
                      variant="secondary"
                      className="mb-1 mt-16 fw-medium"
                      isLoading={isSigningUp}
                    >
                      {'Create Account'}
                    </Button>

                    <Text className="text-center mt-24" size={16}>
                      Already had an account?{' '}
                      <NavLink className={'fw-medium text-is-16'} to={PATHS.signIn}>
                        Log In
                      </NavLink>
                    </Text>
                  </Form>
                );
              }}
            </Formik>
          )}
        </View>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { history: History };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  onShowDialog: showDialog,
  onHideDialog: hideDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
