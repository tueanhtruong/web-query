/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames';
import React, { useState, useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import { BsExclamationCircleFill as ExclamationIcon } from 'react-icons/bs';
import appConfig from 'src/appConfig';
import ComfirmationCodeField from 'src/components/ComfirmationCodeField';
import { Text, View, Button, Link, LoadingCommon, Form } from 'src/components/common';

import { IRootState } from 'src/redux/rootReducer';
// import { hideModal } from 'src/redux/modal/modalSlice';
import { SignInPayload, useConfirmSignIn, useLogin } from 'src/queries';
import { Toastify } from 'src/services';
import './styles.scss';
import { hideDialog } from 'src/redux/dialog/dialogSlice';

export type MFAConfirmationModalData = {
  user?: any;
};

const MFAConfirmationModal: React.FC<Props> = ({ onCloseDialog, user, signInPayload }) => {
  const [code, setCode] = useState('');
  const formUser = useRef(user);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { confirmSignIn, isConfirmSigningIn } = useConfirmSignIn({
    onSuccess(data, variables, context) {
      const signInSession = data.signInUserSession;
      if (signInSession) onCloseDialog();
      else setErrorMessage('Incorrect Verification Code. Please try again.');
    },
    onError(error, variables, context) {
      setErrorMessage(error.message);
    },
  });

  const { login, isSigning } = useLogin({
    onSuccess(data, variables, context) {
      formUser.current = data;
      Toastify.success('A new code has been sent to your email.');
    },
  });

  const handleValueChange = (value: string) => {
    setCode(value);
  };

  const isDisabled = useMemo(() => code.length !== appConfig.VERIFICATION_CODE_LENGTH, [code]);

  const handleConfirmSignIn = () => {
    confirmSignIn({ code, user: formUser.current });
  };
  const handleCheckSubmit = () => !isDisabled && handleConfirmSignIn();

  return (
    <View className={cn('ctn-mfa')}>
      <View isRow align="center" className=" mb-4">
        <ExclamationIcon style={{ fontSize: 24, color: '#F4762F' }} />
        <h4 className="ml-8 fw-bold">{'Multi-Factor Authentication'}</h4>
      </View>
      <Text>{'Please enter the code that was sent to your email'}</Text>

      <View className={cn('my-32')}>
        <Form customSubmit={handleCheckSubmit} autoComplete="off" preventDefault>
          <ComfirmationCodeField onChange={handleValueChange} errorMessage={errorMessage} />
        </Form>
      </View>

      <View className="mb-24" isRow align="center">
        <Text size={14} className="mr-8">
          Did not receive email?
        </Text>
        {isSigning ? (
          <LoadingCommon />
        ) : (
          <Link onClick={() => login(signInPayload)} className="text-is-14 fw-medium">
            Resend
          </Link>
        )}
      </View>

      <View isRow justify="flex-end" className="">
        <Button onClick={onCloseDialog} variant="secondary-outline" className="mr-3">
          {'Cancel'}
        </Button>
        <Button
          onClick={handleConfirmSignIn}
          className=""
          disabled={isDisabled}
          isLoading={isConfirmSigningIn}
        >
          {'Verify'}
        </Button>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & { user: any; signInPayload: SignInPayload };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  onCloseDialog: hideDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(MFAConfirmationModal);
