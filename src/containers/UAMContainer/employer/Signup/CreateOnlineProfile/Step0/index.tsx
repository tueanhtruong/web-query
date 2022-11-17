import { Formik, FormikProps } from 'formik';
import React from 'react';
// import { connect } from 'react-redux';
import { Button, Form, Grid, Input, InputMask } from 'src/components/common';
// import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import { handleGetError } from 'src/utils';
import { CreateOnlineProfile, Step0Schema } from '../helpers';

const Step3: React.FC<Props> = ({ initialValue, onSubmit, formRef, isLoading }) => {
  const fieldNames = {
    unemploymentInsuranceNumber: `unemploymentInsuranceNumber`,
    federalEmployerIdentificationNumber: `federalEmployerIdentificationNumber`,
    businessName: `businessName`,
  };
  return (
    <Formik
      initialValues={initialValue}
      validationSchema={Step0Schema}
      onSubmit={onSubmit}
      innerRef={formRef}
    >
      {({ values, errors, touched, getFieldProps, setFieldValue, handleSubmit, submitForm }) => {
        return (
          <Form preventDefault autoComplete="off" onSubmit={handleSubmit} customSubmit={submitForm}>
            <Grid.Wrap>
              <Grid.Item variant="is-full">
                <InputMask
                  isTranslatable
                  mask="9999999999"
                  label="Hawaii Unemployment Insurance Account Number"
                  required
                  placeholder="Hawaii Unemployment Insurance Account Number"
                  errorMessage={handleGetError(
                    touched,
                    errors,
                    fieldNames.unemploymentInsuranceNumber
                  )}
                  {...getFieldProps(fieldNames.unemploymentInsuranceNumber)}
                />
              </Grid.Item>
              <Grid.Item variant="is-full">
                <InputMask
                  isTranslatable
                  mask="99-9999999"
                  label="Federal Employer Identification Number (FEIN)"
                  required
                  placeholder="XX-XXXXXXX"
                  errorMessage={handleGetError(
                    touched,
                    errors,
                    fieldNames.federalEmployerIdentificationNumber
                  )}
                  {...getFieldProps(fieldNames.federalEmployerIdentificationNumber)}
                />
              </Grid.Item>
              <Grid.Item variant="is-full">
                <Input
                  isTranslatable
                  label="Business Name"
                  required
                  placeholder="Business Name"
                  errorMessage={handleGetError(touched, errors, fieldNames.businessName)}
                  {...getFieldProps(fieldNames.businessName)}
                />
              </Grid.Item>
              <Grid.Item variant="is-full">
                <Button
                  type="submit"
                  className="full-width mt-8"
                  isTranslatable
                  isLoading={isLoading}
                >
                  {'Next'}
                </Button>
              </Grid.Item>
            </Grid.Wrap>
          </Form>
        );
      }}
    </Formik>
  );
};

type Props = {
  prefix?: string;
  initialValue: CreateOnlineProfile;
  onSubmit: Callback;
  formRef: React.MutableRefObject<FormikProps<CreateOnlineProfile>>;
  isLoading?: boolean;
};

export default Step3;
