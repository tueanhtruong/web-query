/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames';
import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';

import { RiErrorWarningFill } from 'react-icons/ri';
import appConfig from 'src/appConfig';
import ComfirmationCodeField from 'src/components/ComfirmationCodeField';
import { Button, Form, Link, LoadingCommon, Text, View } from 'src/components/common';
import {
  useTPAForgotOnlineBusinessId,
  useTPAVerifyForgotOnlineBusinessId,
} from 'src/queries/UAM/tpa';
import { hideDialog } from 'src/redux/dialog/dialogSlice';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import { ForgotOnlineBusinessIdFormValue } from '../helpers';
import { Tenants } from 'src/services/tenantService';

export type EmailConfirmationModalData = {
  value?: string;
  onResend?: (...args: any) => void;
  onSubmit?: (...args: any) => void;
  onSuccess?: (...args: any) => void;
};

const EmailConfirmationModal: React.FC<Props> = ({ onCloseDialog, formData, onConfirmSuccess }) => {
  const { isLoading, forgotTPAOnlineBusinessId } = useTPAForgotOnlineBusinessId({});

  const { isVerifyingForgotOnlineBusinessId, verifyForgotOnlineBusinessId } =
    useTPAVerifyForgotOnlineBusinessId({
      onSuccess({ data }, variables, context) {
        onConfirmSuccess(data);
      },
      onError(error, variables, context) {
        handleError(error);
      },
    });

  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleValueChange = (value: string) => {
    setCode(value);
  };

  const handleSubmitCode = () => {
    verifyForgotOnlineBusinessId({
      ...formData,
      email: `${Tenants.TPA}|${formData.email}`,
      fein: formData.isBusinessOrganization ? formData.fein?.replace(/-/g, '') : undefined,
      token: code,
    });
  };

  const handleSendAgain = () => {
    forgotTPAOnlineBusinessId(formData);
  };

  const handleError = (error: AuthError) => {
    setErrorMessage(error.message);
  };

  const isDisabled = useMemo(() => code.length !== appConfig.VERIFICATION_CODE_LENGTH, [code]);

  const handleCheckSubmit = () => !isDisabled && handleSubmitCode();

  return (
    <View className={cn('ctn-mfa custom-padding-mobile')}>
      <View>
        <View className="mb-4" isRow align="center">
          <RiErrorWarningFill style={{ fontSize: 24, color: '#F4762F' }} />
          <h4 className="fw-bold ml-8 ">{'Email Verification Code'}</h4>
        </View>
        <Text>Please enter the verification code sent to username</Text>

        <View className={cn('my-24')}>
          <Form customSubmit={handleCheckSubmit} preventDefault>
            <ComfirmationCodeField onChange={handleValueChange} errorMessage={errorMessage} />
          </Form>
        </View>

        <View isRow align="center" className="mb-16">
          <Text size={14} className={cn('')}>
            {"Didn't receive the code?"}{' '}
          </Text>
          {isLoading ? (
            <LoadingCommon className="fit-width" />
          ) : (
            <Link onClick={handleSendAgain} className="text-is-14 fw-medium">
              Resend
            </Link>
          )}
        </View>
      </View>

      <View isRow justify="flex-end" className="">
        <Button onClick={onCloseDialog} variant="secondary-outline" className="mr-3">
          {'Cancel'}
        </Button>
        <Button
          onClick={handleSubmitCode}
          className="mr-4"
          isLoading={isVerifyingForgotOnlineBusinessId}
          disabled={isDisabled}
        >
          {'Verify'}
        </Button>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    formData: ForgotOnlineBusinessIdFormValue;
    onConfirmSuccess?: Callback;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  onCloseDialog: hideDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmationModal);
