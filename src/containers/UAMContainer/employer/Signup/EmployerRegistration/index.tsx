import React, { useRef } from 'react';
import {
  Button,
  ButtonYesNo,
  Form,
  Grid,
  NavLink,
  Select,
  Text,
  View,
} from 'src/components/common';
import cn from 'classnames';
import { Callback } from 'src/redux/types';
import { Formik, FormikProps } from 'formik';
import { PATHS } from 'src/appConfig/paths';
import { LegalNameEntityOptions } from './helpers';
import { IRootState } from 'src/redux/store';
import { connect } from 'react-redux';
import { hideDialog, showDialog } from 'src/redux/dialog/dialogSlice';
import { DIALOG_TYPES } from 'src/redux/dialog/type';
import { CreateProfileTip, RegisterNowTip } from './commonInfo';
import { SCREEN_KEY } from '..';

type FormValue = {
  isStateEmployer: boolean;
  hasUIAccountNumber: boolean;
  legalNameEntity: string;
};

const INITIAL: FormValue = { isStateEmployer: null, hasUIAccountNumber: null, legalNameEntity: '' };

const EmployerRegistration: React.FC<Props> = ({ onShowDialog, onHideDialog, onChangeScreen }) => {
  const formRef = useRef<FormikProps<FormValue>>(null);
  const handleShowStopModal = () => {
    onShowDialog({
      type: DIALOG_TYPES.OK_DIALOG,
      data: {
        title: 'Under construction',
        content:
          'Sorry for inconvenience. We are currently working on the page or feature you are trying to reach. Please come back later.',
        onOk: () => onHideDialog(),
        okText: 'OK',
        maxWidth: 'xs',
      },
    });
  };
  const handleSubmit = (value: FormValue) => {
    return onChangeScreen(
      value.hasUIAccountNumber
        ? SCREEN_KEY.CREATE_ONLINE_PROFILE
        : SCREEN_KEY.ACCOUNT_NUMBER_REGISTRATION
    );
  };
  return (
    <View>
      <View isRow align="center" justify="space-between" className="mb-24">
        <Text size={40} className={cn('fw-bold  text-color-grey-900')} isTranslatable>
          {'Employer Registration'}
        </Text>
      </View>
      <Formik initialValues={INITIAL} onSubmit={handleSubmit} innerRef={formRef}>
        {({ values, errors, touched, getFieldProps, handleSubmit, setFieldValue }) => {
          const isNormalEmployer = values.isStateEmployer === false;
          const showCreateProfileTip = isNormalEmployer && values.hasUIAccountNumber;
          const showRegisterUIAN = isNormalEmployer && values.hasUIAccountNumber === false;

          const handleKeyDown = (event) => {
            if (event.code === 'Enter') handleSubmit();
          };

          return (
            <Form
              onSubmit={handleSubmit}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              className="ctn-uam__form"
            >
              <Grid.Wrap>
                <Grid.Item variant="is-full">
                  <ButtonYesNo
                    label={
                      <Text className="fw-normal has-text-black" isTranslatable>
                        What type of employer are you creating Online Profile for?
                      </Text>
                    }
                    {...getFieldProps('isStateEmployer')}
                    onChange={setFieldValue}
                    yesTitle="County/State employer"
                    noTitle="Normal employer"
                  />
                </Grid.Item>
                {/**************** County/State employer Create ****************/}
                <Grid.Item variant="is-full" renderIf={values.isStateEmployer}>
                  <Select
                    options={LegalNameEntityOptions}
                    label={'Legal Name of Entity (no DBA)'}
                    placeholder="Select"
                    errorMessage={touched.legalNameEntity ? errors.legalNameEntity : ''}
                    {...getFieldProps('legalNameEntity')}
                    isTranslatable
                    onChange={setFieldValue}
                  />
                </Grid.Item>
                <Grid.Item variant="is-full" renderIf={values.isStateEmployer}>
                  <View isRowWrap flexGrow={1} className="mt-8">
                    <Button
                      variant="outline"
                      className="mr-12 full-width"
                      onClick={() => setFieldValue('isStateEmployer', null)}
                      isTranslatable
                    >
                      Cancel
                    </Button>
                    <Button
                      className="ml-12 full-width"
                      onClick={handleShowStopModal}
                      disabled={!values.legalNameEntity}
                      isTranslatable
                    >
                      Continue
                    </Button>
                  </View>
                </Grid.Item>
                {/**************** County/State employer Create ****************/}

                {/**************** Normal employer ****************/}

                <Grid.Item variant="is-full" renderIf={isNormalEmployer}>
                  <ButtonYesNo
                    label={
                      <Text className="fw-normal has-text-black" isTranslatable>
                        Do you have a UI Account Number?
                      </Text>
                    }
                    {...getFieldProps('hasUIAccountNumber')}
                    onChange={setFieldValue}
                    yesTitle="Yes, create an Online Profile"
                    noTitle="No, register now "
                  />
                </Grid.Item>

                <Grid.Item variant="is-full" renderIf={showCreateProfileTip}>
                  <CreateProfileTip />
                </Grid.Item>
                <Grid.Item variant="is-full" renderIf={showRegisterUIAN}>
                  <RegisterNowTip />
                </Grid.Item>

                <Grid.Item variant="is-full" renderIf={isNormalEmployer}>
                  <View flexGrow={1}>
                    <Button
                      className="mt-8"
                      type="submit"
                      disabled={values.hasUIAccountNumber === null}
                    >
                      Continue
                    </Button>
                  </View>
                </Grid.Item>

                {/**************** Normal employer ****************/}

                <Grid.Item variant="is-full">
                  <Text className="text-center mt-8" size={16}>
                    Already had an account?{' '}
                    <NavLink className={'fw-medium text-is-16'} to={PATHS.signIn}>
                      Log In
                    </NavLink>
                  </Text>
                </Grid.Item>
              </Grid.Wrap>
            </Form>
          );
        }}
      </Formik>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    onChangeScreen: Callback;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  onShowDialog: showDialog,
  onHideDialog: hideDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployerRegistration);
