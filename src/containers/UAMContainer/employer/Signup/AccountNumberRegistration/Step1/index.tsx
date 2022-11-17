import { Formik, FormikProps } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Grid,
  Input,
  InputPassword,
  InputPhone,
  Text,
  ValidateBusinessId,
  ValidatePassword,
  View,
} from 'src/components/common';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import { handleGetError } from 'src/utils';
import { AccountNumberRegistrationType, Step1Schema } from '../helpers';

const Step1: React.FC<Props> = ({ initialValue, onSubmit, onBack, formRef, isLoading }) => {
  const fieldNames = {
    email: 'email',
    phoneNumber: 'phoneNumber',
    firstName: 'firstName',
    lastName: 'lastName',
    middleName: 'middleName',
    title: 'title',
    password: 'password', // pragma: allowlist secret
    onlineBusinessId: 'onlineBusinessId',
  };
  return (
    <Formik
      initialValues={initialValue}
      validationSchema={Step1Schema}
      onSubmit={onSubmit}
      innerRef={formRef}
    >
      {({ values, errors, touched, getFieldProps, setFieldValue, handleSubmit }) => {
        const handleKeyDown = (event) => {
          if (event.code === 'Enter') handleSubmit();
        };

        return (
          <Form preventDefault autoComplete="off" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <Grid.Wrap>
              <Grid.Item variant="is-full">
                <Text isTranslatable>
                  The information entered here should be specific to the employer's
                  contact/representative. You will be given the opportunity to add additional users
                  after the account is approved.
                </Text>
              </Grid.Item>
              <Grid.Item variant="is-full">
                <Input
                  isTranslatable
                  label="Email Address"
                  required
                  placeholder="Email Address"
                  errorMessage={handleGetError(touched, errors, fieldNames.email)}
                  {...getFieldProps(fieldNames.email)}
                />
              </Grid.Item>
              <Grid.Item variant="is-full">
                <InputPhone
                  isTranslatable
                  label="Phone Number"
                  required
                  placeholder="Phone Number"
                  errorMessage={handleGetError(touched, errors, fieldNames.phoneNumber)}
                  {...getFieldProps(fieldNames.phoneNumber)}
                  onChange={setFieldValue}
                />
              </Grid.Item>
              <Grid.Item>
                <Input
                  isTranslatable
                  label="First Name"
                  required
                  placeholder="First Name"
                  errorMessage={handleGetError(touched, errors, fieldNames.firstName)}
                  {...getFieldProps(fieldNames.firstName)}
                />
              </Grid.Item>
              <Grid.Item>
                <Input
                  isTranslatable
                  label="Last Name"
                  required
                  placeholder="Last Name"
                  errorMessage={handleGetError(touched, errors, fieldNames.lastName)}
                  {...getFieldProps(fieldNames.lastName)}
                />
              </Grid.Item>
              <Grid.Item variant="is-full">
                <Input
                  isTranslatable
                  label="Middle Initial"
                  placeholder="Middle Initial"
                  errorMessage={handleGetError(touched, errors, fieldNames.middleName)}
                  {...getFieldProps(fieldNames.middleName)}
                />
              </Grid.Item>
              <Grid.Item variant="is-full">
                <Input
                  isTranslatable
                  label="Title/Position"
                  required
                  placeholder="Title/Position"
                  errorMessage={handleGetError(touched, errors, fieldNames.title)}
                  {...getFieldProps(fieldNames.title)}
                />
              </Grid.Item>
              <Grid.Item variant="is-full">
                <InputPassword
                  isTranslatable
                  label="Password"
                  required
                  placeholder="Password"
                  errorMessage={handleGetError(touched, errors, fieldNames.password)}
                  {...getFieldProps(fieldNames.password)}
                />
                <ValidatePassword password={values.password} />
              </Grid.Item>
              <Grid.Item variant="is-full">
                <Input
                  isTranslatable
                  label="Online Business ID"
                  required
                  placeholder="Online Business ID"
                  errorMessage={handleGetError(touched, errors, fieldNames.onlineBusinessId)}
                  {...getFieldProps(fieldNames.onlineBusinessId)}
                />
                <ValidateBusinessId businessId={values.onlineBusinessId} />
              </Grid.Item>
              <Grid.Item variant="is-full">
                <View flexGrow={1} isRowWrap className="mt-8">
                  <Button
                    onClick={() => onBack(values)}
                    variant="outline"
                    className="full-width mr-8"
                    isTranslatable
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="full-width ml-8"
                    isTranslatable
                    isLoading={isLoading}
                  >
                    Register
                  </Button>
                </View>
              </Grid.Item>
            </Grid.Wrap>
          </Form>
        );
      }}
    </Formik>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    prefix?: string;
    initialValue: AccountNumberRegistrationType;
    onSubmit: Callback;
    onBack: Callback;
    formRef: React.MutableRefObject<FormikProps<AccountNumberRegistrationType>>;
    isLoading: boolean;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Step1);
