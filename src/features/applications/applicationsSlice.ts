import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Application } from '../../types';
import { createApplication, getApplications } from './applicationsAPI';

const initialState = {
  applications: [],
  applicationsStatus: 'idle', // should be a enum
  createApplicationStatus: 'idle', // should be a enum
};

export const getApplicationsAsync = createAsyncThunk(
  'applications/list',
  async () => {
    const response = await getApplications();

    return response.data;
  }
);

export const createApplicationAsync = createAsyncThunk(
  'application/create',
  async (application: Application) => {
    const response = await createApplication(application);

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
      })
      .addCase(createApplicationAsync.pending, (state) => {
        state.createApplicationStatus = 'loading';
      })
      .addCase(createApplicationAsync.fulfilled, (state, action) => {
        state.createApplicationStatus = 'success';
      })
      .addCase(createApplicationAsync.rejected, (state) => {
        state.createApplicationStatus = 'failed';
      });
  },
});

export const selectApplications = (state: RootState) =>
  state.applications.applications;

export const selectApplicationCreationStatus = (state: RootState) =>
  state.applications.createApplicationStatus;

export default applicationSlice.reducer;
