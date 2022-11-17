import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { authState, IAuthState } from './auth/authSlice';

import commonReducer, { commonState, ICommonState } from './common/commonSlice';
import dialogReducer, { dialogState, IDialogState } from './dialog/dialogSlice';
import fileReducer, { fileState, IFileState } from './file/fileSlice';
import formReducer, { formState, IFormState } from './form/formSlice';

export interface IRootState {
  router: RouterState;
  common: ICommonState;
  auth: IAuthState;
  dialog: IDialogState;
  file: IFileState;
  form: IFormState;
}

export const rootState: IRootState = {
  router: undefined,
  auth: authState,
  common: commonState,
  dialog: dialogState,
  file: fileState,
  form: formState,
};

/* ------------- Assemble The Reducers ------------- */
const createRootReducer = (history: History) => {
  return combineReducers<IRootState>({
    router: connectRouter(history),
    common: commonReducer,
    auth: authReducer,
    dialog: dialogReducer,
    file: fileReducer,
    form: formReducer,
  });
};

export default createRootReducer;
