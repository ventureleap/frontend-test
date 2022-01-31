// Heroku creds:
// ifarhanrifat@gmail.com
// Sd3973*X!?7T%g%

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const signupUser = createAsyncThunk(
	'users/signupUser',
	async ({ username, password }, thunkAPI) => {
		try {
			const response = await fetch(
				'https://frontend-test.getsandbox.com/users',
				{
					method: 'POST',

					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						username,
						password,
					}),
				},
			);
			let data = await response.json();
			console.log('data', data);

			if (response.status === 200) {
				// localStorage.setItem('token', data.token);
				return { ...data };
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (e) {
			console.log('Error', e.response.data);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
);

export const loginUser = createAsyncThunk(
	'users/login',
	async ({ username, password }, thunkAPI) => {
		try {
			const response = await fetch(
				'https://frontend-test.getsandbox.com/users/login',
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						username,
						password,
					}),
				},
			);
			let data = await response.json();
			console.log('response', data);
			if (response.status === 200) {
				// console.log('here it comes to setting session', data.session);
				Cookies.set('sessionId', data.session);
				// Cookies.set('Cookie', 'sessionId=81e1913f-4e16-5e66-72b1-2cfa5952e2ea');
				localStorage.setItem('token', data.session);
				return data;
			} else {
				return thunkAPI.rejectWithValue({
					message: 'Invalid username or password',
				});
			}
		} catch (e) {
			console.log('here it comes to error');
			console.log('Error', e.response.data);
			thunkAPI.rejectWithValue({
				message: 'Invalid username or password',
			});
		}
	},
);

export const createApplication = createAsyncThunk(
	'users/createApplication',
	async (requestData, thunkAPI) => {
		console.log('requestData', requestData);
		try {
			const response = await fetch(
				'https://authappfrontend.herokuapp.com/applications',
				{
					method: 'POST',

					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					body: JSON.stringify({
						...requestData,
						cookie: 'sessionId=' + localStorage.getItem('token'),
					}),
					// mode: 'no-cors',
				},
			);
			let data = await response.json();
			console.log('response', data);
			if (response.status === 200) {
				return data;
			} else {
				return thunkAPI.rejectWithValue({
					message: 'Error comes in creating application',
				});
			}
		} catch (e) {
			console.log('Error', e.response.data);
			thunkAPI.rejectWithValue({
				message: 'Error comes in creating application',
			});
		}
	},
);

export const updateApplication = createAsyncThunk(
	'users/updateApplication',
	async (requestData, thunkAPI) => {
		console.log('requestData', requestData);
		try {
			const response = await fetch(
				`https://authappfrontend.herokuapp.com/applications/${requestData.id}`,
				{
					method: 'PUT',

					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					body: JSON.stringify({
						...requestData,
						cookie: 'sessionId=' + localStorage.getItem('token'),
					}),
				},
			);
			let data = await response.json();
			console.log('response', data);
			if (response.status === 200) {
				return data;
			} else {
				return thunkAPI.rejectWithValue({
					message: 'Error comes in updating application',
				});
			}
		} catch (e) {
			console.log('Error', e.response.data);
			thunkAPI.rejectWithValue({
				message: 'Error comes in updating application',
			});
		}
	},
);

export const deleteApplication = createAsyncThunk(
	'users/deleteApplication',
	async (requestData, thunkAPI) => {
		console.log('requestData in delete application', requestData);
		try {
			const response = await fetch(
				`https://authappfrontend.herokuapp.com/applications/${requestData.id}`,
				{
					method: 'DELETE',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					body: JSON.stringify({
						cookie: 'sessionId=' + localStorage.getItem('token'),
					}),
				},
			);
			let data = await response.json();
			console.log('response', data);
			if (response.status === 200) {
				return data;
			} else {
				return thunkAPI.rejectWithValue({
					message: 'Error comes in deleting application',
				});
			}
		} catch (e) {
			console.log('Error', e.response.data);
			thunkAPI.rejectWithValue({
				message: 'Error comes in deleting application',
			});
		}
	},
);

export const getApplications = createAsyncThunk(
	'users/getApplications',
	async ({ token }, thunkAPI) => {
		try {
			const response = await fetch(
				`https://authappfrontend.herokuapp.com/applications?sessionId=${localStorage.getItem(
					'token',
				)}`,
				{
					method: 'GET',
					// credentials: 'include',
					headers: {
						Accept: 'application/json',
						authorization: `Bearer ${localStorage.getItem('token')}`,
						'Content-Type': 'application/json',
					},
				},
			);
			let data = await response.json();
			console.log('data', data, response.status);

			if (response.status === 200) {
				return { ...data };
			} else {
				return thunkAPI.rejectWithValue({
					message: 'Error comes in getting applications',
				});
			}
		} catch (e) {
			console.log('Error', e.response.data);
			return thunkAPI.rejectWithValue({
				message: 'Error comes in getting applications',
			});
		}
	},
);

export const getApplication = createAsyncThunk(
	'users/getApplication',
	async ({ id }, thunkAPI) => {
		try {
			const response = await fetch(`/applications/${id}`, {
				method: 'GET',

				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			let data = await response.json();

			if (response.status === 200) {
				return { ...data };
			} else {
				return thunkAPI.rejectWithValue({
					message: 'Error comes in getting application',
				});
			}
		} catch (e) {
			console.log('Error', e.response.data);
			return thunkAPI.rejectWithValue({
				message: 'Error comes in getting application',
			});
		}
	},
);

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		username: '',
		email: '',
		isFetching: false,
		isSuccess: false,
		isError: false,
		errorMessage: '',
		applications: [],
		application: {},
	},
	reducers: {
		clearState: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isFetching = false;

			return state;
		},
	},
	extraReducers: {
		[signupUser.fulfilled]: (state, { payload }) => {
			console.log('payload', payload);
			state.isFetching = false;
			state.isSuccess = true;
			state.email = payload?.user?.email;
			state.username = payload?.user?.name;
		},
		[signupUser.pending]: (state) => {
			state.isFetching = true;
		},
		[signupUser.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
		[loginUser.fulfilled]: (state, { payload }) => {
			console.log('payload', payload);
			state.email = payload?.email;
			state.username = payload?.name;
			state.isFetching = false;
			state.isSuccess = true;
			return state;
		},
		[loginUser.rejected]: (state, { payload }) => {
			console.log('payload', payload);
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
		[loginUser.pending]: (state) => {
			state.isFetching = true;
		},
		[createApplication.fulfilled]: (state, { payload }) => {
			console.log('payload', payload);
			state.isFetching = false;
			state.isSuccess = true;
			state.applications = payload?.data;
			return state;
		},
		[createApplication.rejected]: (state, { payload }) => {
			console.log('payload', payload);
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
		[createApplication.pending]: (state) => {
			state.isFetching = true;
		},
		[updateApplication.fulfilled]: (state, { payload }) => {
			console.log('payload', payload);
			state.isFetching = false;
			state.isSuccess = true;
			state.application = payload?.data;
			return state;
		},
		[updateApplication.rejected]: (state, { payload }) => {
			console.log('payload', payload);
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
		[updateApplication.pending]: (state) => {
			state.isFetching = true;
		},
		[getApplications.pending]: (state) => {
			state.isFetching = true;
		},
		[getApplications.fulfilled]: (state, { payload }) => {
			state.isFetching = false;
			state.isSuccess = true;
			console.log('paylaod', payload);
			state.applications = Object.values(payload || {});
		},
		[getApplications.rejected]: (state) => {
			console.log('getApplications');
			state.isFetching = false;
			state.isError = true;
		},
		[getApplication.pending]: (state) => {
			state.isFetching = true;
		},
		[getApplication.fulfilled]: (state, { payload }) => {
			state.isFetching = false;
			state.isSuccess = true;

			state.application = payload?.data;
		},
		[getApplication.rejected]: (state) => {
			console.log('getApplication');
			state.isFetching = false;
			state.isError = true;
		},
	},
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
