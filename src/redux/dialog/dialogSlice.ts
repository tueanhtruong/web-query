/* eslint-disable security/detect-object-injection */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { DialogData, DialogDataKey, DIALOG_TYPES } from './type';

export interface IDialogState {
  isVisible: {
    [key: DialogDataKey | string]: boolean;
  };
  type: {
    [key: DialogDataKey | string]: string;
  };
  data: {
    [key: DialogDataKey | string]: DialogData;
  };
  loading: {
    [key: DialogDataKey | string]: boolean;
  };
}

const initialState: IDialogState = {
  isVisible: {},
  type: {},
  data: {},
  loading: {},
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    hideDialog: (state) => {
      const keys = Object.keys(state.isVisible);
      const newKey = Object.values(DialogDataKey)[keys.length - 1];
      // delete state.data[newKey];
      // delete state.type[newKey];
      delete state.isVisible[newKey];
    },
    hideAllDialog: (state) => {
      state.isVisible = initialState.isVisible;
      // state.type = initialState.type;
      // state.data = initialState.data;
      state.loading = initialState.loading;
    },
    showDialog: (state, action: PayloadAction<{ data: DialogData; type: DIALOG_TYPES }>) => {
      const keys = Object.keys(state.isVisible);
      const newKey = Object.values(DialogDataKey)[keys.length];

      state.data = {
        ...state.data,
        [newKey]: action.payload.data,
      };

      state.type = {
        ...state.type,
        [newKey]: action.payload.type,
      };
      state.isVisible = {
        ...state.isVisible,
        [newKey]: true,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { hideDialog, showDialog, hideAllDialog } = dialogSlice.actions;

export const dialogState = dialogSlice.getInitialState();

export default dialogSlice.reducer;
