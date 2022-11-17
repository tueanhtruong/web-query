import { Formik, FormikProps } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Grid, InputMask } from 'src/components/common';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import { handleGetError } from 'src/utils';
import { AccountNumberRegistrationType, Step0Schema } from '../helpers';

const Step0: React.FC<Props> = ({ initialValue, onSubmit, formRef, isLoading }) => {
  const fieldNames = {
    federalEmployerIdentificationNumber: `federalEmployerIdentificationNumber`,
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={Step0Schema}
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

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    prefix?: string;
    initialValue: AccountNumberRegistrationType;
    onSubmit: Callback;
    formRef: React.MutableRefObject<FormikProps<AccountNumberRegistrationType>>;
    isLoading: boolean;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Step0);
