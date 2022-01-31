import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import {
	createApplication,
	userSelector,
	clearState,
	updateApplication,
} from '../User/UserSlice';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import './application.scss';

const Create = () => {
	let application = localStorage.getItem('application');
	application = application ? JSON.parse(application) : {};
	const dispatch = useDispatch();
	const history = useHistory();
	const { register, handleSubmit, reset } = useForm({});
	const { isFetching, isSuccess, isError, errorMessage } =
		useSelector(userSelector);
	const onSubmit = async (data) => {
		const mutate =
			application && Object.keys(application).length
				? updateApplication({ ...data, id: application.id })
				: createApplication(data);
		await dispatch(mutate);
		localStorage.removeItem('application');
		history.push('/');
	};
	useEffect(() => {
		if (application && Object.keys(application).length) reset(application);
	}, [application, reset]);
	useEffect(() => {
		if (isError) {
			toast.error(errorMessage);
			dispatch(clearState());
		}
	}, [isError, isSuccess, dispatch, errorMessage]);

	return (
		<Fragment>
			<div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 custom-heading-font-size'>
						{application && Object.keys(application).length
							? 'Update Application'
							: 'Create Application'}
					</h2>
				</div>
				<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
					<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
						<form
							className='space-y-6'
							onSubmit={handleSubmit(onSubmit)}
							method='POST'
						>
							<div>
								<label
									htmlFor='name'
									className='block text-sm font-medium text-gray-700 text-left'
								>
									Name
								</label>
								<div className='mt-1'>
									<input
										id='name'
										name='name'
										type='name'
										autoComplete='name'
										ref={register({ required: true })}
										required
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor='secret'
									className='block text-sm font-medium text-gray-700 text-left'
								>
									Secret
								</label>
								<div className='mt-1'>
									<input
										id='secret'
										name='secret'
										type='secret'
										autoComplete='secret'
										ref={register({ required: true })}
										required
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor='lang'
									className='block text-sm font-medium text-gray-700 text-left'
								>
									Language
								</label>
								<div className='mt-1'>
									<input
										id='lang'
										name='lang'
										type='lang'
										autoComplete='lang'
										ref={register({ required: true })}
										required
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor='version'
									className='block text-sm font-medium text-gray-700 text-left'
								>
									Version
								</label>
								<div className='mt-1'>
									<input
										id='version'
										name='version'
										type='version'
										autoComplete='version'
										ref={register({ required: true })}
										required
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
							</div>
							<div>
								<Button
									type='submit'
									className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
									loading={isFetching}
								>
									{application && Object.keys(application).length
										? 'Update Application'
										: 'Create Application'}
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Create;
