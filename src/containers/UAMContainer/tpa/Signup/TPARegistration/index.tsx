import cn from 'classnames';
import { Formik, FormikProps } from 'formik';
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { PATHS } from 'src/appConfig/paths';
import { Button, Form, Grid, NavLink, Text, View } from 'src/components/common';
import { hideDialog, showDialog } from 'src/redux/dialog/dialogSlice';
// import { DIALOG_TYPES } from 'src/redux/dialog/type';
import { IRootState } from 'src/redux/store';
import { Callback } from 'src/redux/types';
import { SCREEN_KEY } from '..';
import { CreateProfileTip } from './commonInfo';

type FormValue = {
  isStateEmployer: boolean;
  hasUIAccountNumber: boolean;
  legalNameEntity: string;
};

const INITIAL: FormValue = { isStateEmployer: null, hasUIAccountNumber: null, legalNameEntity: '' };

const EmployerRegistration: React.FC<Props> = ({ onShowDialog, onHideDialog, onChangeScreen }) => {
  const formRef = useRef<FormikProps<FormValue>>(null);
  // const handleShowStopModal = () => {
  //   onShowDialog({
  //     type: DIALOG_TYPES.OK_DIALOG,
  //     data: {
  //       title: 'Under construction',
  //       content:
  //         'Sorry for inconvenience. We are currently working on the page or feature you are trying to reach. Please come back later.',
  //       onOk: () => onHideDialog(),
  //       okText: 'OK',
  //       maxWidth: 'xs',
  //     },
  //   });
  // };
  const handleSubmit = (value: FormValue) => {
    return onChangeScreen(SCREEN_KEY.CREATE_ONLINE_PROFILE);
  };
  return (
    <View>
      <View isRow align="center" justify="space-between" className="mb-24">
        <Text size={40} className={cn('fw-bold  text-color-grey-900')} isTranslatable>
          {'Create TPA Online Profile'}
        </Text>
      </View>
      <Formik initialValues={INITIAL} onSubmit={handleSubmit} innerRef={formRef}>
        {({ values, errors, touched, getFieldProps, handleSubmit, setFieldValue }) => {
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
                  <CreateProfileTip />
                </Grid.Item>

                <Grid.Item variant="is-full">
                  <View flexGrow={1}>
                    <Button className="mt-8" type="submit">
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
