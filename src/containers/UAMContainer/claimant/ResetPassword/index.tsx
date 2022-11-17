/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Location } from 'history';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import {
  View,
  Button,
  Text,
  Image,
  InputPassword,
  NavLink,
  ValidatePassword,
  Grid,
  IconSuccess,
} from 'src/components/common';
// import PasswordRequirements from 'src/components/PasswordRequirements';
import Form from 'src/components/common/Form';

import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import { ErrorService, Navigator, Yup } from 'src/services';

import { useSubmitForgotPassword } from 'src/queries';
import Logo from 'src/components/Logo';
import { useMediaQuery } from '@material-ui/core';
import { muiResponsive } from 'src/appConfig/constants';
import { Tenants } from 'src/services/tenantService';

type FormValue = {
  email: string;
  password: string;
  confirmPassword: string;
  code?: string;
};

const INITIAL = { password: '', confirmPassword: '', email: '', code: '' };

const ResetPassword: React.FC<Props> = ({ location }) => {
  // const query = new URLSearchParams(location.search);
  const query = new URLSearchParams(location.search);
  const isTabletScreen = useMediaQuery(muiResponsive.TABLET);

  const formRef = useRef<FormikProps<FormValue>>(null);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  const { submitForgotPassword, isLoading } = useSubmitForgotPassword({
    onSuccess(data, variables, context) {
      setIsPasswordUpdated(true);
    },
    onError(error, variables, context) {
      ErrorService.handler(error);
    },
  });

  useEffect(() => {
    // Check for query params "email" and "token". Should be included in link sent to email from forgot password submission.
    if (!query.has('email') || !query.has('token')) {
      Navigator.navigate(PATHS.forgotPassword);
    }
  }, []);

  // =========================== RESET PASSWORD ===========================
  const handleResetPassword = (values: FormValue, helpers: FormikHelpers<FormValue>) => {
    const { password, confirmPassword } = values;

    // eslint-disable-next-line security/detect-possible-timing-attacks
    if (password !== confirmPassword) {
      formRef.current.setErrors({ confirmPassword: 'Password and Confirm Password do not match.' }); // pragma: allowlist secret
      return;
    } else {
      const body = {
        email: `${Tenants.CLAIMANT}|${query.get('email')}`,
        password: password,
        token: query.get('token'),
      };
      return submitForgotPassword(body);
    }
  };

  const handleBackToLogin = () => {
    Navigator.navigate(PATHS.signIn);
  };

  // =========================== SCHEMA ===========================
  const ResetSchema = Yup.object().shape({
    password: Yup.string().required().password(),
    // code: Yup.string().min(6).required(),
  });

  return (
    <View className="ctn-uam" flexGrow={1}>
      <Image className="ctn-uam__image" src={IMAGES.backgroundLogin} />
      <View className="ctn-uam__container--wrap" flexGrow={1}>
        <View className="ctn-uam__container" flexGrow={1}>
          <Logo
            className="mb-36"
            isColumn={isTabletScreen}
            subTitleSize={isTabletScreen ? 14 : 16}
          />

          {isPasswordUpdated ? (
            <View isRow align="center" className="mb-24">
              <IconSuccess size={46} />
              <h1 className={cn('ctn-uam__title ml-16')}>{'Password Updated'}</h1>
            </View>
          ) : (
            <Text size={40} className={cn('fw-bold mb-24 text-color-grey-900')} isTranslatable>
              Reset Password
            </Text>
          )}

          {isPasswordUpdated ? (
            <>
              <Text className={cn('mb-36')}>{'Your password has been successfully updated.'}</Text>
              <Button onClick={handleBackToLogin} variant="secondary" className="mb-8">
                Log In
              </Button>
            </>
          ) : (
            <Formik
              initialValues={INITIAL}
              onSubmit={handleResetPassword}
              validationSchema={ResetSchema}
              innerRef={formRef}
            >
              {({ values, errors, touched, getFieldProps, handleSubmit }) => {
                return (
                  <Form onSubmit={handleSubmit} autoComplete="off" className="ctn-uam__form">
                    <Grid.Wrap>
                      <Grid.Item variant="is-full">
                        <InputPassword
                          label="New Password"
                          required
                          placeholder="New Password"
                          errorMessage={touched.password ? errors.password : ''}
                          {...getFieldProps('password')}
                        />
                        <ValidatePassword className="" password={values.password} />
                      </Grid.Item>
                      <Grid.Item variant="is-full">
                        <InputPassword
                          label="Confirm Password"
                          required
                          placeholder="Confirm Password"
                          errorMessage={touched.confirmPassword ? errors.confirmPassword : ''}
                          containerClassName="mb-24"
                          {...getFieldProps('confirmPassword')}
                        />
                      </Grid.Item>
                      <Grid.Item variant="is-full">
                        <View flexGrow={1}>
                          <Button
                            type="submit"
                            variant="secondary"
                            className="mb-8 fw-medium"
                            isLoading={isLoading}
                          >
                            Reset
                          </Button>
                        </View>
                      </Grid.Item>
                    </Grid.Wrap>
                  </Form>
                );
              }}
            </Formik>
          )}

          {!isPasswordUpdated && (
            <Text className="my-2 fw-medium text-center">
              <NavLink to={PATHS.signIn} className="text-is-16">
                Back to Log In
              </NavLink>
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & { location: Location<string> };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
