/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import appConfig from 'src/appConfig';
import { Button, Form, Link, LoadingCommon, Text, View } from 'src/components/common';
import ComfirmationCodeField from 'src/components/ComfirmationCodeField';
import { IRootState } from 'src/redux/rootReducer';
import { RiErrorWarningFill } from 'react-icons/ri';
// import { hideModal } from 'src/redux/modal/modalSlice';
import { useConfirmSignUp, useResendSignUp } from 'src/queries';
import { Callback } from 'src/redux/types';
import { Toastify } from 'src/services';
import { hideDialog } from 'src/redux/dialog/dialogSlice';

export type EmailConfirmationModalData = {
  value?: string;
  onResend?: (...args: any) => void;
  onSubmit?: (...args: any) => void;
  onSuccess?: (...args: any) => void;
};

const EmailConfirmationModal: React.FC<Props> = ({ onCloseDialog, username, onConfirmSuccess }) => {
  // const { value: username } = modalData;
  const { resendSignUp, isResendSignUp } = useResendSignUp({
    onSuccess(data, variables, context) {
      Toastify.success('A new code has been sent to your email.');
    },
    onError(error, variables, context) {
      Toastify.error(error.message);
    },
  });
  const { confirmSignUp, isConfirmSigningUp } = useConfirmSignUp({
    onSuccess(data, variables, context) {
      onConfirmSuccess();
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
    confirmSignUp({
      username,
      code,
    });
  };

  const handleSendAgain = () => {
    resendSignUp({ username });
  };

  const handleError = (error: AuthError) => {
    setErrorMessage(error.message);
  };

  // const buttonLabel = isSubmittingCode ? 'Verifying' : 'Send Again';

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
          {isResendSignUp ? (
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
          isLoading={isConfirmSigningUp}
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
    username: string;
    onConfirmSuccess?: Callback;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  onCloseDialog: hideDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmationModal);
