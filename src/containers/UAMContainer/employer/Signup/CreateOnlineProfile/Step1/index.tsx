import { Formik, FormikProps } from 'formik';
import React from 'react';
import { Button, Form, Grid, InputCurrency, View } from 'src/components/common';
import { Callback } from 'src/redux/types';
import { handleGetError } from 'src/utils';
import { CreateOnlineProfile, Step1Schema } from '../helpers';

const Step3: React.FC<Props> = ({ initialValue, onSubmit, onBack, formRef, isLoading }) => {
  const fieldNames = {
    quarterlyWage: `quarterlyWage`,
  };
  return (
    <Formik
      initialValues={initialValue}
      validationSchema={Step1Schema}
      onSubmit={onSubmit}
      innerRef={formRef}
    >
      {({ values, errors, touched, getFieldProps, setFieldValue, handleSubmit, submitForm }) => {
        return (
          <Form preventDefault autoComplete="off" onSubmit={handleSubmit} customSubmit={submitForm}>
            <Grid.Wrap>
              <Grid.Item variant="is-full">
                <InputCurrency
                  isTranslatable
                  label="Your Quarterly Wage for 2022, Quarter 02"
                  required
                  placeholder="Total Gross Wages"
                  errorMessage={handleGetError(touched, errors, fieldNames.quarterlyWage)}
                  {...getFieldProps(fieldNames.quarterlyWage)}
                  onChange={setFieldValue}
                />
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
                    Next
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

type Props = {
  prefix?: string;
  initialValue: CreateOnlineProfile;
  onSubmit: Callback;
  onBack: Callback;
  formRef: React.MutableRefObject<FormikProps<CreateOnlineProfile>>;
  isLoading?: boolean;
};

export default Step3;
