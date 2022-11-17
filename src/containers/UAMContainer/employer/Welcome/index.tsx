/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { Location } from 'history';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import {
  Button,
  Grid,
  IconSuccess,
  Image,
  Input,
  InputPassword,
  Text,
  ValidatePassword,
  View,
} from 'src/components/common';
import { IRootState } from 'src/redux/rootReducer';
// import PasswordRequirements from 'src/components/PasswordRequirements';
import Form from 'src/components/common/Form';

import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import { Navigator, Toastify, Yup } from 'src/services';

import { useMediaQuery } from '@material-ui/core';
import { muiResponsive } from 'src/appConfig/constants';
import Logo from 'src/components/Logo';
import { useCompleteNewPassword, useLogin, useLogout } from 'src/queries';
import { setIsWelcomeScreen } from 'src/redux/auth/authSlice';
import { useComponentWillUnmount } from 'src/hooks';
import { Tenants } from 'src/services/tenantService';

type FormValue = {
  businessId: string;
  email: string;
  password: string;
};

const Welcome: React.FC<Props> = ({ location, onSetWelcomeScreen }) => {
  const query = new URLSearchParams(location.search);
  const isTabletScreen = useMediaQuery(muiResponsive.TABLET);
  const [cognitoUser, setCognitoUser] = useState(null);
  const [isSetupAccountSuccess, setIsSetupAccountSuccess] = useState<boolean>(false);

  const { logout } = useLogout();

  const { completeNewPassword, isLoading } = useCompleteNewPassword({
    onSuccess: () => {
      logout();
      setIsSetupAccountSuccess(true);
    },
  });

  const { login, isSigning } = useLogin({
    onSuccess(data, variables, context) {
      setCognitoUser(data);
    },
    onError(error, variables, context) {
      Toastify.error(error.message);
    },
  });

  const initialValue = {
    businessId: query.get('onlineBusinessId'),
    email: query.get('username'),
    password: '',
  };

  const formRef = useRef<FormikProps<FormValue>>(null);

  useEffect(() => {
    onSetWelcomeScreen(true);
    // Check for query params "username", "onlineBusinessId" and "token". Should be included in link sent to email from setup account.
    if (!query.has('onlineBusinessId') || !query.has('username') || !query.has('token')) {
      Navigator.navigate(PATHS.signIn);
    } else {
      const email = query.get('username');
      const onlineBusinessId = query.get('onlineBusinessId');
      const password = query.get('token');
      const username = `${Tenants.EMPLOYER}|${onlineBusinessId}|${email.trim().toLowerCase()}`;
      login({ username, password });
    }
  }, []);

  useComponentWillUnmount(() => onSetWelcomeScreen(false));

  // =========================== SET UP PASSWORD ===========================
  const handleSetUpPassword = (values: FormValue, helpers: FormikHelpers<FormValue>) => {
    // eslint-disable-next-line security/detect-possible-timing-attacks
    const body = {
      user: cognitoUser,
      password: values.password,
    };
    completeNewPassword(body);
  };

  const handleBackToLogin = () => {
    Navigator.navigate(PATHS.signIn);
  };

  // =========================== SCHEMA ===========================
  const WelcomeSchema = Yup.object().shape({
    password: Yup.string().required().password(),
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

          {isSetupAccountSuccess ? (
            <View>
              <View isRow align="center" className="mb-24">
                <IconSuccess size={46} />
                <h1 className={cn('ctn-uam__title ml-16')}>{'Success'}</h1>
              </View>
              <Text>Your password was successfully created. You can now log in to the system.</Text>
              <View isRow>
                <Button className="fw-medium mt-16" variant="link" onClick={handleBackToLogin}>
                  Go to Log In
                </Button>
              </View>
            </View>
          ) : (
            <View>
              <View>
                <Text size={40} className={cn('fw-bold mb-24 text-color-grey-900')}>
                  {'Welcome!'}
                </Text>
                <Text className={cn('mb-24')}>
                  {'Please set your password to proceed further.'}
                </Text>
              </View>

              <Formik
                initialValues={initialValue}
                onSubmit={handleSetUpPassword}
                validationSchema={WelcomeSchema}
                innerRef={formRef}
              >
                {({ values, errors, touched, getFieldProps, handleSubmit }) => {
                  return (
                    <Form
                      preventDefault
                      onSubmit={handleSubmit}
                      autoComplete="off"
                      className="ctn-uam__form"
                    >
                      <Grid.Wrap>
                        <Grid.Item variant="is-full">
                          <Input
                            label="Online Business ID"
                            required
                            placeholder="Online Business ID"
                            errorMessage={touched.businessId ? errors.businessId : ''}
                            {...getFieldProps('businessId')}
                            disabled
                          />
                        </Grid.Item>
                        <Grid.Item variant="is-full">
                          <Input
                            label="Email address"
                            required
                            placeholder="Email address"
                            errorMessage={touched.email ? errors.email : ''}
                            {...getFieldProps('email')}
                            disabled
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
                          <ValidatePassword className="" password={values.password} />
                        </Grid.Item>

                        <Grid.Item variant="is-full">
                          <View flexGrow={1}>
                            <Button
                              type="submit"
                              variant="secondary"
                              className="my-12 fw-medium"
                              isLoading={isSigning || isLoading}
                            >
                              Confirm
                            </Button>
                          </View>
                        </Grid.Item>
                      </Grid.Wrap>
                    </Form>
                  );
                }}
              </Formik>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & { location?: Location<string> };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  onSetWelcomeScreen: setIsWelcomeScreen,
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
