import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

// import { createWrapper } from 'next-redux-wrapper';
// import createSagaMiddleware from 'redux-saga';
// import rootSaga from './rootSaga';
import createRootReducer, { rootState } from './rootReducer';
// import {
//   sendEmailVerificationAction,
//   signInActionFailed,
//   signInActionSuccess,
//   signUpActionFailed,
//   signUpActionSuccess,
// } from './auth/authSlice';
// import { hideModal, showModal } from './modal/modalSlice';

// const sagaMiddleware = createSagaMiddleware();

const history = createBrowserHistory();

const store = configureStore({
  reducer: createRootReducer(history),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // {
      //   ignoredActions: [
      //     signInActionSuccess.type,
      //     signInActionFailed.type,
      //     sendEmailVerificationAction.type,
      //     signUpActionSuccess.type,
      //     signUpActionFailed.type,
      //     showModal.type,
      //     hideModal.type,
      //   ],
      // },
    }),
  // .concat(sagaMiddleware),
  devTools: true,
  preloadedState: rootState,
});

// sagaMiddleware.run(rootSaga);

// export const makeStore = () => store;
export type IRootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default () => ({
  store,
  history,
});
// export an assembled wrapper
// export const wrapper = createWrapper(makeStore, { debug: true });
