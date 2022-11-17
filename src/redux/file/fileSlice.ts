import { createSlice } from '@reduxjs/toolkit';

export interface IFileState {}

const initialState: IFileState = {};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
// export const {} = fileSlice.actions;

export const fileState = fileSlice.getInitialState();

export default fileSlice.reducer;
