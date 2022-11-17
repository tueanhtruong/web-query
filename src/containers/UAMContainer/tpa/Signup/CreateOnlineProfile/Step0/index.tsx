import { Formik, FormikProps } from 'formik';
import React, { Fragment } from 'react';
// import { connect } from 'react-redux';
import { Button, ButtonYesNo, Form, Grid, Input, InputMask, Select } from 'src/components/common';
// import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import { convertStateOptionsToOptions, handleGetError } from 'src/utils';
import { states } from 'src/appConfig/options';
import { CreateOnlineProfile, Step0Schema } from '../helpers';

const Step0: React.FC<Props> = ({ initialValue, onSubmit, formRef, isLoading, onBack }) => {
  const fieldNames = {
    isBusinessOrganization: `isBusinessOrganization`,
    federalEmployerIdentificationNumber: `federalEmployerIdentificationNumber`,
    businessName: `businessName`,
    address: `address`,
    city: `city`,
    state: `state`,
    zipCode: `zipCode`,
  };

  return (
    <Formik<CreateOnlineProfile>
      initialValues={initialValue}
      validationSchema={Step0Schema}
      onSubmit={onSubmit}
      innerRef={formRef}
    >
      {({ values, errors, touched, getFieldProps, setFieldValue, handleSubmit, submitForm }) => {
        const isBusinessOrganization = values.isBusinessOrganization;

        const handleChangeIsBusinessOrganization = (name: string, value: boolean) => {
          if (value === true) {
            setFieldValue(fieldNames.address, '');
            setFieldValue(fieldNames.city, '');
            setFieldValue(fieldNames.state, '');
            setFieldValue(fieldNames.zipCode, '');
          } else if (value === false) {
            setFieldValue(fieldNames.federalEmployerIdentificationNumber, '');
            setFieldValue(fieldNames.businessName, '');
          }
          setFieldValue(name, value);
        };

        return (
          <Form preventDefault autoComplete="off" onSubmit={handleSubmit} customSubmit={submitForm}>
            <Grid.Wrap>
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
              {isBusinessOrganization && (
                <Fragment>
                  <Grid.Item variant="is-full">
                    <InputMask
                      isTranslatable
                      mask="99-9999999"
                      label="Federal Employer Identification Number (FEIN)"
                      required
                      placeholder="XX-XXXXXXX (no dashes)"
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
                </Fragment>
              )}
              {isBusinessOrganization === false && (
                <Fragment>
                  <Grid.Item variant="is-full">
                    <Input
                      label="Street Address or P.O. Box"
                      placeholder="Street Address or P.O. Box"
                      errorMessage={handleGetError(touched, errors, fieldNames.address)}
                      {...getFieldProps(fieldNames.address)}
                      isTranslatable
                      required
                    />
                  </Grid.Item>
                  <Grid.Item>
                    <Input
                      label="City"
                      placeholder="City"
                      errorMessage={handleGetError(touched, errors, fieldNames.city)}
                      {...getFieldProps(fieldNames.city)}
                      isTranslatable
                      required
                    />
                  </Grid.Item>
                  <Grid.Item>
                    <Select
                      label="State"
                      placeholder="State"
                      options={convertStateOptionsToOptions(states)}
                      errorMessage={handleGetError(touched, errors, fieldNames.state)}
                      {...getFieldProps(fieldNames.state)}
                      onChange={setFieldValue}
                      isTranslatable
                      required
                    />
                  </Grid.Item>
                  <Grid.Item variant="is-full">
                    <InputMask
                      mask="99999"
                      label="ZIP code"
                      placeholder="XXXXX"
                      errorMessage={handleGetError(touched, errors, fieldNames.zipCode)}
                      {...getFieldProps(fieldNames.zipCode)}
                      isTranslatable
                      required
                    />
                  </Grid.Item>
                </Fragment>
              )}

              <Grid.Item className="mt-8">
                <Button
                  variant="outline"
                  className="full-width"
                  onClick={onBack}
                  isLoading={isLoading}
                  isTranslatable
                >
                  {'Back'}
                </Button>
              </Grid.Item>
              <Grid.Item className="mt-8">
                <Button
                  type="submit"
                  className="full-width"
                  disabled={values.isBusinessOrganization === null}
                  isLoading={isLoading}
                  isTranslatable
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
  onBack: Callback;
};

export default Step0;
