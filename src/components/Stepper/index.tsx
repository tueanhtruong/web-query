/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useMemo } from 'react';
import { View } from 'src/components/common';
import { Callback } from 'src/redux/types';
import './styles.scss';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import clsx from 'clsx';
import { MuiThemeProvider, ThemeOptions } from '@material-ui/core';
import { createMuiTheme as createTheme } from '@material-ui/core/styles';
import { emptyFunction } from 'src/utils';
import { useTranslation } from 'react-i18next';
import { COLOR_CODE } from 'src/appConfig/constants';
import cn from 'classnames';

const useCustomStepIconStyles = makeStyles({
  root: {
    backgroundColor: 'transparent',
    zIndex: 1,
    color: COLOR_CODE.GRAY_600,
    width: 48,
    height: 48,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    border: `3px solid ${COLOR_CODE.GRAY_200}`,
    cursor: 'pointer',
  },
  completed: {
    backgroundColor: COLOR_CODE.SUCCESS,
    color: '#fff',
    border: 'none',
  },
  active: {
    backgroundColor: `${COLOR_CODE.PRIMARY} !important`,
    color: '#fff !important',
    border: 'none !important',
  },
  disabled: {
    pointerEvents: 'none',
  },
});

const useConnectorStyles = makeStyles({
  alternativeLabel: {
    top: 22,
    margin: '0 12px',
    height: 4,
    borderRadius: 8,
    backgroundColor: '#eaeaf0',
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)',
    position: 'absolute',
  },
  completed: {
    '& $line': {
      width: '100%',
      transitionDelay: '0s',
    },
  },
  active: {
    '& $line': {
      width: '100%',
      transitionDelay: '0s',
    },
  },
  disabled: {
    '& $line': {
      width: '0%',
    },
  },
  line: {
    height: 4,
    borderRadius: 8,
    backgroundColor: COLOR_CODE.PRIMARY,
    width: 'calc(50%)',
    border: '0',
    zIndex: 12,
    transition: 'all 0.2s linear 0.2s',
  },
});

const CustomConnector = (props) => {
  const classes = useConnectorStyles();
  const { active, completed, index, maxValidStep } = props;
  const isDefaultActive = maxValidStep >= index;
  const isDisabled = index > maxValidStep + 1;

  return (
    <div
      className={clsx(classes.alternativeLabel, {
        [classes.active]: active || isDefaultActive,
        [classes.completed]: completed,
        [classes.disabled]: isDisabled,
      })}
    >
      <div className={clsx(classes.line, {})} />
    </div>
  );
};

const getMuiTheme = (maxWidth: number = 180) =>
  createTheme({
    overrides: {
      MuiStepLabel: {
        label: {
          fontSize: 14,
          fontWeight: 500,
          color: COLOR_CODE.DISABLED,
        },
        active: {
          color: `${COLOR_CODE.GRAY_900} !important`,
        },
        completed: {
          color: `${COLOR_CODE.GRAY_900} !important`,
        },
      },
      MuiStep: {
        root: {
          maxWidth,
          transition: '0.4s',
        },
      },
      MuiPaper: {
        root: {
          backgroundColor: 'transparent',
          display: 'flex',
          justifyContent: 'center',
        },
      },
      MuiStepper: {
        root: {
          padding: '24px 0',
        },
      },
    },
  } as ThemeOptions);

const CustomStepIcon = (props) => {
  const classes = useCustomStepIconStyles();
  const { active, completed, maxValidStep, icon, onClick = emptyFunction } = props;

  const isDefaultActive = maxValidStep >= parseInt(icon);
  const isDisabled = maxValidStep < parseInt(icon) - 1;

  return (
    <div
      onClick={onClick}
      className={clsx(classes.root, {
        [classes.completed]: completed || isDefaultActive,
        [classes.active]: active,
        [classes.disabled]: isDisabled,
      })}
    >
      {String(icon)}
    </div>
  );
};

const CustomStepper: React.VFC<Props> = ({
  steps,
  activeStep,
  maxValidStep,
  onChange,
  maxWidth,
}) => {
  const { i18n } = useTranslation();
  const StepMemo = useMemo(() => {
    return steps.map((step, idx) => (
      <Step key={`stepper-${idx}-${step.label}`}>
        <StepLabel
          className={cn({ 'MuiStepLabel-error': step.isError === true })}
          classes={{
            label: 'stepper-label',
          }}
          StepIconComponent={(props) => (
            <CustomStepIcon maxValidStep={maxValidStep} onClick={() => onChange(idx)} {...props} />
          )}
        >
          {i18n.t<string>(step.label)}
        </StepLabel>
      </Step>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps, maxValidStep, activeStep]);
  return (
    <View flexGrow={1}>
      <MuiThemeProvider theme={getMuiTheme(maxWidth)}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={<CustomConnector maxValidStep={maxValidStep} />}
        >
          {StepMemo}
        </Stepper>
      </MuiThemeProvider>
    </View>
  );
};

export type StepperStep = {
  label: string;
  index: number;
  isError?: boolean;
};

type Props = {
  steps: Array<StepperStep>;
  activeStep: number;
  maxValidStep: number;
  maxWidth?: number;
  onChange: Callback;
};

export default CustomStepper;
