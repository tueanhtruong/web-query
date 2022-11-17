/* eslint-disable react-hooks/exhaustive-deps */
import { useMediaQuery } from '@material-ui/core';
import cn from 'classnames';
import { Formik, FormikProps } from 'formik';
import { History } from 'history';
import React, { Fragment, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { muiResponsive } from 'src/appConfig/constants';
import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import {
  Button,
  ButtonYesNo,
  Form,
  Grid,
  IconSuccess,
  Image,
  Input,
  InputMask,
  NavLink,
  Text,
  View,
} from 'src/components/common';
import Logo from 'src/components/Logo';
import { TPAForgotOnlineBusinessIdPayload } from 'src/queries';
// import { TPAForgotOnlineBusinessIdPayload } from 'src/queries/UAM/types';
import { hideDialog, showDialog } from 'src/redux/dialog/dialogSlice';
import { DIALOG_TYPES } from 'src/redux/dialog/type';
import { IRootState } from 'src/redux/rootReducer';
import { Navigator } from 'src/services';
import { useTPAForgotOnlineBusinessId } from 'src/queries/UAM/tpa';
import EmailConfirmationModal from './EmailConfirmationModal';
import {
  ForgotOnlineBusinessIdFormParam,
  ForgotOnlineBusinessIdFormValue,
  initialTPAForgotOnlineBusinessIdFormValue,
  TPAForgotOnlineBusinessIdSchema,
} from './helpers';
import { Tenants } from 'src/services/tenantService';

const TPAForgotOnlineBusinessId: React.FC<Props> = ({ onShowDialog, onHideDialog }) => {
  const formRef = useRef<FormikProps<ForgotOnlineBusinessIdFormValue>>(null);
  const isTabletScreen = useMediaQuery(muiResponsive.TABLET);

  const [onlineBusinessId, setOnlineBusinessId] = useState<string>(null);
  const [errorMessage, setErrorMessage] = useState<string>(null);

  const handleConfirmSuccess = (response) => {
    onHideDialog();
    setOnlineBusinessId(response.onlineBusinessId);
  };

  const { isLoading, forgotTPAOnlineBusinessId } = useTPAForgotOnlineBusinessId({
    onSuccess(data, variables, context) {
      setErrorMessage(null);
      onShowDialog({
        type: DIALOG_TYPES.CONTENT_DIALOG,
        data: {
          content: (
            <EmailConfirmationModal
              formData={formRef.current.values}
              onConfirmSuccess={handleConfirmSuccess}
            />
          ),
          hideTitle: true,
        },
      });
    },
    onError(error, variables, context) {
      formRef.current.setErrors({ fein: ' ', email: ' ' });
      setErrorMessage('Incorrect data. Please try again.');
    },
  });

  const handleSubmit = (values: ForgotOnlineBusinessIdFormValue) => {
    const payload: TPAForgotOnlineBusinessIdPayload = {
      ...values,
      email: `${Tenants.TPA}|${values.email}`,
      fein: values.isBusinessOrganization ? values.fein?.replace(/-/g, '') : undefined,
    };
    forgotTPAOnlineBusinessId(payload);
  };

  return (
    <View className="ctn-uam" flexGrow={1}>
      <Image className="ctn-uam__image" src={IMAGES.backgroundLoginTPA} />
      <View className="ctn-uam__container--wrap" flexGrow={1}>
        <View className="ctn-uam__container" flexGrow={1}>
          <Logo
            className="mb-36"
            isColumn={isTabletScreen}
            subTitleSize={isTabletScreen ? 14 : 16}
          />
          {onlineBusinessId ? (
            <View>
              <View isRow align="center" className="mb-24">
                <IconSuccess size={46} />
                <h1 className={cn('ctn-uam__title ml-16')}>{'Success'}</h1>
              </View>
              <Text>
                Your Online Business ID is <strong>{onlineBusinessId}</strong>
              </Text>
              <Text isTranslatable>Please securely store your Online Business ID.</Text>
              <Button className="mt-24" onClick={() => Navigator.navigate(PATHS.signIn)}>
                Log In
              </Button>
            </View>
          ) : (
            <>
              <Text size={40} className={cn('fw-bold mb-24 text-color-grey-900')}>
                {'Forgot Online Business ID'}
              </Text>
            </>
          )}
          {!onlineBusinessId && (
            <Formik
              initialValues={initialTPAForgotOnlineBusinessIdFormValue}
              onSubmit={handleSubmit}
              validationSchema={TPAForgotOnlineBusinessIdSchema}
              innerRef={formRef}
            >
              {({ values, errors, touched, getFieldProps, handleSubmit, setFieldValue }) => {
                const handleChangeIsBusinessOrganization = (name: string, value: boolean) => {
                  if (value === false) {
                    setFieldValue('fein', '');
                  }
                  setFieldValue(name, value);
                };
                return (
                  <Form onSubmit={handleSubmit} autoComplete="off" className="ctn-uam__form">
                    <Grid.Wrap className="mb-1">
                      <Grid.Item variant="is-full">
                        <ButtonYesNo
                          label={'Are you a Business Organization?'}
                          {...getFieldProps('isBusinessOrganization')}
                          onChange={handleChangeIsBusinessOrganization}
                          yesTitle="Yes"
                          noTitle="No"
                          required
                        />
                      </Grid.Item>
                      {values.isBusinessOrganization !== null && (
                        <Fragment>
                          {values.isBusinessOrganization && (
                            <Grid.Item variant="is-full">
                              <InputMask
                                isTranslatable
                                mask="99-9999999"
                                label="FEIN"
                                required
                                placeholder="XX-XXXXXXX"
                                errorMessage={touched.fein ? errors.fein : ''}
                                {...getFieldProps(ForgotOnlineBusinessIdFormParam.FEIN)}
                              />
                            </Grid.Item>
                          )}
                          <Grid.Item variant="is-full">
                            <Input
                              label="Email Address"
                              required
                              placeholder="Email Address"
                              errorMessage={touched.email ? errors.email : ''}
                              {...getFieldProps(ForgotOnlineBusinessIdFormParam.EMAIL)}
                            />
                          </Grid.Item>
                          <Grid.Item variant="is-full">
                            <Text className="has-text-danger" size={15}>
                              {errorMessage}
                            </Text>
                          </Grid.Item>
                        </Fragment>
                      )}

                      <Grid.Item variant="is-full">
                        <View flexGrow={1}>
                          <Button
                            type="submit"
                            variant="secondary"
                            className="my-12 fw-medium"
                            isLoading={isLoading}
                            disabled={values.isBusinessOrganization === null}
                            isTranslatable
                          >
                            {'Continue'}
                          </Button>
                        </View>
                      </Grid.Item>
                    </Grid.Wrap>
                    <Text className="text-center" size={16}>
                      <NavLink className={'fw-medium text-is-16'} to={PATHS.signIn}>
                        Back to Log In
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

export default connect(mapStateToProps, mapDispatchToProps)(TPAForgotOnlineBusinessId);
