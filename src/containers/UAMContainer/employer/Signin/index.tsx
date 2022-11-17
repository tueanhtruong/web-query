/* eslint-disable react-hooks/exhaustive-deps */
import { useMediaQuery } from '@material-ui/core';
import cn from 'classnames';
import { Formik, FormikProps } from 'formik';
import { History } from 'history';
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { muiResponsive } from 'src/appConfig/constants';
import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import {
  Button,
  Form,
  Grid,
  Image,
  Input,
  InputPassword,
  NavLink,
  Text,
  View,
} from 'src/components/common';
import Logo from 'src/components/Logo';
import { SignInPayload, useLogin, useProfile, useResendSignUp } from 'src/queries';
import { hideDialog, showDialog } from 'src/redux/dialog/dialogSlice';
import { DIALOG_TYPES } from 'src/redux/dialog/type';
import { IRootState } from 'src/redux/rootReducer';
import { ErrorService, Navigator, Yup } from 'src/services';
import { Tenants } from 'src/services/tenantService';
import EmailConfirmationModal from '../../common/EmailConfirmationModal';
import MFAConfirmationModal from '../../common/MFAConfirmationModal';

type FormValue = {
  email: string;
  password: string;
  businessId: string;
};

const INITIAL: FormValue = { email: '', password: '', businessId: '' };

const Signin: React.FC<Props> = ({ onShowDialog, onHideDialog }) => {
  const formRef = useRef<FormikProps<FormValue>>(null);

  const isTabletScreen = useMediaQuery(muiResponsive.TABLET);

  const { login, isSigning } = useLogin({
    onSuccess(data, variables, context) {
      if (data.challengeName === 'CUSTOM_CHALLENGE')
        onShowDialog({
          type: DIALOG_TYPES.CONTENT_DIALOG,
          data: {
            content: <MFAConfirmationModal user={data} signInPayload={variables} />,
            hideTitle: true,
          },
        });
    },
    onError(error, variables, context) {
      handleError(error, variables);
    },
  });
  const { loading } = useProfile();

  const { resendSignUp } = useResendSignUp();

  const handleLogin = (values: FormValue) => {
    const { businessId, email, password } = values;
    const username = `${Tenants.EMPLOYER}|${businessId}|${email.trim().toLowerCase()}`;
    login({ username, password });
  };

  const handleConfirmSuccess = (payload: SignInPayload) => {
    onHideDialog();
    login(payload);
  };

  const handleError = (error: AuthError, variables: SignInPayload) => {
    switch (error.code) {
      case ErrorService.TYPES.NotAuthorizedException:
        return formRef.current.setErrors({
          businessId: '  ',
          email: '  ',
          password: ErrorService.MESSAGES.incorrectCredentials,
        });

      case ErrorService.TYPES.UserNotFoundException:
        return formRef.current.setErrors({ email: ErrorService.MESSAGES.accountNotExist });

      case ErrorService.TYPES.UserNotConfirmedException:
        resendSignUp({ username: variables.username });
        return onShowDialog({
          type: DIALOG_TYPES.CONTENT_DIALOG,
          data: {
            content: (
              <EmailConfirmationModal
                username={variables.username}
                onConfirmSuccess={() =>
                  handleConfirmSuccess({
                    username: variables.username,
                    password: variables.password,
                  })
                }
              />
            ),
            hideTitle: true,
          },
        });
      case ErrorService.TYPES.UsernameExistsException:
        return;

      default:
        return ErrorService.handler(error);
    }
  };

  // =========================== FORGOT PASSWORD ===========================
  const handleForgotPassword = (data: FormValue) => {
    Navigator.navigate(PATHS.forgotPassword, { email: data.email });
  };
  const handleForgotOnlineBusinessId = (data: FormValue) => {
    Navigator.navigate(PATHS.forgotOnlineBusinessId, { email: data.email });
  };

  // =========================== SCHEMA ===========================
  const SigninSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    businessId: Yup.string().required().businessId(),
    password: Yup.string().required(),
  });

  return (
    <View className="ctn-uam" flexGrow={1}>
      <Image className="ctn-uam__image" src={IMAGES.backgroundLoginEmployer} />
      <View className="ctn-uam__container--wrap" flexGrow={1}>
        <View className="ctn-uam__container" flexGrow={1}>
          <Logo
            className="mb-36"
            isColumn={isTabletScreen}
            subTitleSize={isTabletScreen ? 14 : 16}
          />
          <View isRow align="center" justify="space-between" className="mb-24">
            <Text size={40} className={cn('fw-bold  text-color-grey-900')}>
              {'Log In'}
            </Text>
          </View>
          <Formik
            initialValues={INITIAL}
            onSubmit={handleLogin}
            validationSchema={SigninSchema}
            innerRef={formRef}
          >
            {({ values, errors, touched, getFieldProps, handleSubmit }) => (
              <Form onSubmit={handleSubmit} autoComplete="off" className="ctn-uam__form">
                <Grid.Wrap>
                  <Grid.Item variant="is-full">
                    <Input
                      label="Online Business ID"
                      required
                      placeholder="Online Business ID"
                      errorMessage={touched.businessId ? errors.businessId : ''}
                      {...getFieldProps('businessId')}
                    />
                  </Grid.Item>
                  <Grid.Item variant="is-full">
                    <Input
                      label="Email Address"
                      required
                      placeholder="Email Address"
                      errorMessage={touched.email ? errors.email : ''}
                      {...getFieldProps('email')}
                    />
                  </Grid.Item>
                  <Grid.Item variant="is-full">
                    <InputPassword
                      label="Password"
                      required
                      placeholder="Password"
                      errorMessage={touched.password ? errors.password : ''}
                      {...getFieldProps('password')}
                    />
                  </Grid.Item>
                  <Grid.Item variant="is-full">
                    <View flexGrow={1} isRowWrap justify="flex-end">
                      <Button
                        type="button"
                        variant="link"
                        className="ctn-uam__link text-is-16 my-1 fw-medium fit-width mr-32"
                        onClick={() => handleForgotOnlineBusinessId(values)}
                      >
                        Forgot Online Business ID?
                      </Button>
                      <Button
                        type="button"
                        variant="link"
                        className="ctn-uam__link text-is-16 my-1 fw-medium fit-width"
                        onClick={() => handleForgotPassword(values)}
                      >
                        Forgot Password?
                      </Button>
                    </View>
                  </Grid.Item>
                  <Grid.Item variant="is-full">
                    <View flexGrow={1}>
                      <Button
                        type="submit"
                        variant="secondary"
                        className="my-2 fw-medium"
                        isLoading={isSigning || loading}
                      >
                        Log In
                      </Button>
                    </View>
                  </Grid.Item>
                  <Grid.Item variant="is-full">
                    <View flexGrow={1}>
                      <Text className="text-center my-2" size={16}>
                        Don’t have account?
                        <NavLink className={'fw-medium ml-1 text-is-16'} to={PATHS.signUp}>
                          Create Account
                        </NavLink>
                      </Text>
                    </View>
                  </Grid.Item>
                </Grid.Wrap>
              </Form>
            )}
          </Formik>
        </View>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { history: History };

const mapStateToProps = (state: IRootState) => ({
  // isSigningIn: state.auth.is,
  // error: state.auth.error,
});

const mapDispatchToProps = {
  onShowDialog: showDialog,
  onHideDialog: hideDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
