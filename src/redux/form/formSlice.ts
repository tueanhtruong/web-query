import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFormState {
  formData: any;
  activeStep: number;
  maxValidStep: number;
  formSteps: Array<any>;
}
export const FIRST_STEP = 0;

const initialState: IFormState = {
  activeStep: FIRST_STEP,
  maxValidStep: 0,
  formData: null,
  formSteps: [],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<any>) => {
      state.formData = action.payload;
    },
    setFormSteps: (state, action: PayloadAction<Array<any>>) => {
      state.formSteps = action.payload;
    },
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
      if (state.maxValidStep < action.payload) {
        state.maxValidStep = action.payload;
      }
    },
    clearFormSteps: (state, action: PayloadAction<any>) => {
      state.activeStep = initialState.activeStep;
      state.maxValidStep = initialState.maxValidStep;
      state.formData = action.payload;
    },
    setMaxValidStep: (state, action: PayloadAction<number>) => {
      state.maxValidStep = action.payload;
      if (state.activeStep > action.payload) {
        state.activeStep = action.payload;
      }
    },
    clearFormState: (state) => {
      state.activeStep = initialState.activeStep;
      state.formSteps = initialState.formSteps;
      state.maxValidStep = initialState.maxValidStep;
      state.formData = initialState.formData;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setFormData,
  setActiveStep,
  setFormSteps,
  clearFormState,
  setMaxValidStep,
  clearFormSteps,
} = formSlice.actions;

export const formState = formSlice.getInitialState();

export default formSlice.reducer;
