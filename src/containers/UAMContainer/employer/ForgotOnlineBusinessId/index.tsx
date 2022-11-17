/* eslint-disable react-hooks/exhaustive-deps */
import { useMediaQuery } from '@material-ui/core';
import cn from 'classnames';
import { Formik, FormikProps } from 'formik';
import { History } from 'history';
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { muiResponsive } from 'src/appConfig/constants';
import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import {
  Button,
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
import { useForgotOnlineBusinessId } from 'src/queries';
import { ForgotOnlineBusinessIdPayload } from 'src/queries/UAM/types';
import { hideDialog, showDialog } from 'src/redux/dialog/dialogSlice';
import { DIALOG_TYPES } from 'src/redux/dialog/type';
import { IRootState } from 'src/redux/rootReducer';
import { Navigator } from 'src/services';
import { Tenants } from 'src/services/tenantService';
import EmailConfirmationModal from './EmailConfirmationModal';
import {
  initialForgotOnlineBusinessIdFormValue,
  ForgotOnlineBusinessIdFormParam,
  ForgotOnlineBusinessIdFormValue,
  ForgotOnlineBusinessIdSchema,
} from './helpers';

const ForgotOnlineBusinessId: React.FC<Props> = ({ onShowDialog, onHideDialog }) => {
  const formRef = useRef<FormikProps<ForgotOnlineBusinessIdFormValue>>(null);
  const isTabletScreen = useMediaQuery(muiResponsive.TABLET);

  const [onlineBusinessId, setOnlineBusinessId] = useState<string>(null);
  const [errorMessage, setErrorMessage] = useState<string>(null);

  const handleConfirmSuccess = (response) => {
    onHideDialog();
    setOnlineBusinessId(response.onlineBusinessId);
  };

  const { forgotOnlineBusinessId, isLoading } = useForgotOnlineBusinessId({
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
      formRef.current.setErrors({ uiAccountNumber: ' ', fein: ' ', email: ' ' });
      setErrorMessage('Incorrect data. Please try again.');
    },
  });

  // =========================== SIGN UP ===========================

  const handleSubmit = (values: ForgotOnlineBusinessIdFormValue) => {
    const payload: ForgotOnlineBusinessIdPayload = {
      ...values,
      email: `${Tenants.EMPLOYER}|${values.email}`,
      fein: values.fein?.replace(/-/g, ''),
    };

    forgotOnlineBusinessId(payload);
  };

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
              <Text isTranslatable className={cn('mb-24 text-color-grey-900')}>
                {'Please Provide Information'}
              </Text>
            </>
          )}
          {!onlineBusinessId && (
            <Formik
              initialValues={initialForgotOnlineBusinessIdFormValue}
              onSubmit={handleSubmit}
              validationSchema={ForgotOnlineBusinessIdSchema}
              innerRef={formRef}
            >
              {({ values, errors, touched, getFieldProps, handleSubmit, setFieldValue }) => {
                return (
                  <Form onSubmit={handleSubmit} autoComplete="off" className="ctn-uam__form">
                    <Grid.Wrap className="mb-1">
                      <Grid.Item variant="is-full">
                        <InputMask
                          isTranslatable
                          mask="9999999999"
                          label="Hawaii UI Account Number"
                          required
                          placeholder="Hawaii UI Account Number"
                          errorMessage={touched.uiAccountNumber ? errors.uiAccountNumber : ''}
                          {...getFieldProps(ForgotOnlineBusinessIdFormParam.UI_ACCOUNT_NUMBER)}
                        />
                      </Grid.Item>
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

                      <Grid.Item variant="is-full">
                        <View flexGrow={1}>
                          <Button
                            type="submit"
                            variant="secondary"
                            className="my-12 fw-medium"
                            isLoading={isLoading}
                            isTranslatable
                          >
                            {'Next'}
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotOnlineBusinessId);
