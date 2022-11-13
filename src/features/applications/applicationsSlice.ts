import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getApplications } from './applicationsAPI';

const initialState = {
  applications: [],
  applicationsStatus: 'idle',
};

export const getApplicationsAsync = createAsyncThunk(
  'applications/list',
  async () => {
    const response = await getApplications();
    return response.data;
  }
);

export const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApplicationsAsync.pending, (state) => {
        state.applicationsStatus = 'loading';
      })
      .addCase(getApplicationsAsync.fulfilled, (state, action) => {
        state.applicationsStatus = 'success';
        state.applications = action.payload;
      })
      .addCase(getApplicationsAsync.rejected, (state) => {
        state.applicationsStatus = 'failed';
      });
  },
});

export const applications = (state: RootState) =>
  state.applications.applications;

export default applicationSlice.reducer;
