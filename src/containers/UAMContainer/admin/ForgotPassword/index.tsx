import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { History, Location } from 'history';
import { Formik, FormikProps } from 'formik';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import { Input, View, Button, Text, Image, NavLink, LoadingCommon } from 'src/components/common';
import Form from 'src/components/common/Form';

import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import { getLocationState } from 'src/utils';
// import { forgotPasswordAsync } from 'src/redux/authRedux/actions';
import { useComponentDidMount } from 'src/hooks';
import { ErrorService, Navigator, Toastify, Yup } from 'src/services';
import { ForgotPasswordPayload, useForgotPassword, useResendSignUp } from 'src/queries';

import Logo from 'src/components/Logo';
import { useMediaQuery } from '@material-ui/core';
import { muiResponsive } from 'src/appConfig/constants';
import { hideDialog, showDialog } from 'src/redux/dialog/dialogSlice';
import { DIALOG_TYPES } from 'src/redux/dialog/type';
import EmailConfirmationModal from '../../common/EmailConfirmationModal';
import { Tenants } from 'src/services/tenantService';

type FormValue = {
  email: string;
};

const INITIAL = {
  email: '',
};

const ForgotPassword: React.FC<Props> = ({ location, onHideDialog, onShowDialog }) => {
  const formRef = useRef<FormikProps<FormValue>>(null);
  const isTabletScreen = useMediaQuery(muiResponsive.TABLET);

  const [emailSent, setEmailSent] = useState('');
  const { resendSignUp } = useResendSignUp();

  useComponentDidMount(() => {
    const state = getLocationState(location);
    if (state?.email) {
      formRef.current.setValues({ email: state.email as string });
    }
  });

  const handleError = (error: AuthError, variables: ForgotPasswordPayload) => {
    switch (error.code) {
      case 'InvalidParameterException':
        resendSignUp({ username: variables.email });
        return onShowDialog({
          type: DIALOG_TYPES.CONTENT_DIALOG,
          data: {
            content: (
              <EmailConfirmationModal
                username={variables.email}
                onConfirmSuccess={() => {
                  onHideDialog();
                  Navigator.navigate(PATHS.signIn, { email: variables.email });
                }}
              />
            ),
            hideTitle: true,
          },
        });
      default:
        return ErrorService.handler(error);
    }
  };

  const { forgotPassword, isLoading } = useForgotPassword({
    onSuccess(data, variables, context) {
      setEmailSent(variables.email);
      if (emailSent) Toastify.success('A new link has been sent to your email.');
      // Navigator.navigate(PATHS.resetPassword, { email: variables.email });
    },
    onError(error, variables, context) {
      handleError(error, variables);
    },
  });

  // =========================== FORGOT PASSWORD ===========================
  const handleSubmitForgotPassword = (values: FormValue) => {
    const { email } = values;
    const preferredUsername = `${Tenants.ADMIN}|${email}`;
    forgotPassword({ email: preferredUsername });
  };

  // =========================== SCHEMA ===========================
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required().email(),
  });

  const handleResendEmail = () => {
    forgotPassword({ email: emailSent });
  };

  return (
    <View className="ctn-uam" flexGrow={1}>
      <Image className="ctn-uam__image" src={IMAGES.backgroundLoginAdmin} />
      <View className="ctn-uam__container--wrap" flexGrow={1}>
        <View className="ctn-uam__container" flexGrow={1}>
          <Logo
            className="mb-36"
            isColumn={isTabletScreen}
            subTitleSize={isTabletScreen ? 14 : 16}
          />
          <Text size={40} className={cn('fw-bold mb-16 text-color-grey-900')}>
            {'Reset Password'}
          </Text>

          {emailSent ? (
            <Text className={cn('mb-16 text-color-grey-900')}>
              {'Check your email for a link to reset your password.'}
            </Text>
          ) : (
            <Text className={cn('mb-16 text-color-grey-900')}>
              {
                'Please enter the email associated with your account and we’ll send you instructions to reset your password.'
              }
            </Text>
          )}

          {!emailSent && (
            <Formik
              initialValues={INITIAL}
              onSubmit={handleSubmitForgotPassword}
              validationSchema={ForgotPasswordSchema}
              innerRef={formRef}
            >
              {({ errors, touched, getFieldProps, handleSubmit }) => (
                <Form onSubmit={handleSubmit} autoComplete="off" className="ctn-uam__form">
                  <Input
                    label="Email Address"
                    required
                    placeholder="Email Address"
                    errorMessage={touched.email ? errors.email : ''}
                    containerClassName="mb-40"
                    {...getFieldProps('email')}
                  />

                  <Button
                    type="submit"
                    variant="secondary"
                    className="fw-medium mb-8"
                    isLoading={isLoading}
                  >
                    Continue
                  </Button>
                </Form>
              )}
            </Formik>
          )}

          {emailSent && (
            <View isRow align="center">
              <Text className="mr-8" size={16}>
                Didn't receive an email?
              </Text>
              {isLoading ? (
                <LoadingCommon />
              ) : (
                <Button className="fw-medium" variant="link" onClick={handleResendEmail}>
                  Send again
                </Button>
              )}
            </View>
          )}

          <Text className={cn('my-2', { 'text-center': !emailSent })}>
            <NavLink className={'fw-medium text-is-16'} to={PATHS.signIn}>
              Back to Log In
            </NavLink>
          </Text>
        </View>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & { history: History; location: Location<string> };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  onShowDialog: showDialog,
  onHideDialog: hideDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
