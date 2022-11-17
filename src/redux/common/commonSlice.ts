import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { setAuthenticated } from '../auth/authSlice';

export interface ICommonState {
  loading: boolean;
  screenWidth: number;
  collapseSidebar: boolean;
  showMiniSidebar: boolean;
  showSidebar: boolean;
  showNavbar: boolean;
}

const initialState: ICommonState = {
  loading: false,
  screenWidth: 0,
  collapseSidebar: false,
  showMiniSidebar: false,
  showSidebar: false,
  showNavbar: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setScreenWidth: (state, action: PayloadAction<number>) => {
      state.screenWidth = action.payload;
    },
    setCollapseSidebar: (state, action: PayloadAction<boolean>) => {
      state.collapseSidebar = action.payload;
    },
    setShowMiniSidebar: (state, action: PayloadAction<boolean>) => {
      state.showMiniSidebar = action.payload;
    },
    setShowNavbar: (state, action: PayloadAction<boolean>) => {
      state.showNavbar = action.payload;
    },
    setShowSidebar: (state, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload;
    },
  },
  extraReducers: {
    [setAuthenticated.type]: (state, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload;
      state.showNavbar = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setScreenWidth,
  setCollapseSidebar,
  setShowMiniSidebar,
  setShowNavbar,
  setShowSidebar,
} = commonSlice.actions;

export const commonState = commonSlice.getInitialState();

export default commonSlice.reducer;
