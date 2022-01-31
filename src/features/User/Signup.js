import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser, userSelector, clearState } from './UserSlice';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../../components/Button';

const Signup = () => {
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();
	const history = useHistory();

	const { isFetching, isSuccess, isError, errorMessage } =
		useSelector(userSelector);
	const onSubmit = (data) => {
		dispatch(signupUser(data));
	};

	useEffect(() => {
		return () => {
			dispatch(clearState());
		};
	}, [dispatch]);

	useEffect(() => {
		if (isSuccess) {
			dispatch(clearState());
			history.push('/');
		}

		if (isError) {
			toast.error(errorMessage);
			dispatch(clearState());
		}
	}, [isSuccess, isError, dispatch, errorMessage, history]);

	return (
		<Fragment>
			<div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
						Sign Up For a New Account
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
									htmlFor='username'
									className='block text-sm font-medium text-gray-700 text-left'
								>
									Username
								</label>
								<div className='mt-1'>
									<input
										id='name'
										name='username'
										type='text'
										ref={register({ required: true })}
										autoComplete='username'
										required
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
							</div>
							<div></div>
							<div>
								<label
									htmlFor='password'
									className='block text-sm font-medium text-gray-700 text-left'
								>
									Password
								</label>
								<div className='mt-1'>
									<input
										id='password'
										name='password'
										type='password'
										ref={register({ required: true })}
										autoComplete='current-password'
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
									Signup
								</Button>
							</div>
						</form>
						<div className='mt-6'>
							<div className='relative'>
								<div className='relative flex justify-center text-sm'>
									<span className='px-2 bg-white text-gray-500'>
										Or <Link to='/users/login'> Login</Link>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Signup;
