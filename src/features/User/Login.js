import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, userSelector, clearState } from './UserSlice';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';

const Login = ({_,}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { register, handleSubmit } = useForm();
	const { isFetching, isSuccess, isError, errorMessage } =
		useSelector(userSelector);
	const onSubmit = (data) => {
		console.log('data', data);
		dispatch(loginUser(data));
	};

	useEffect(() => {
		return () => {
			dispatch(clearState());
		};
	}, [dispatch]);

	useEffect(() => {
		if (isError) {
			toast.error(errorMessage);
			dispatch(clearState());
		}

		if (isSuccess) {
			dispatch(clearState());
			history.push('/');
		}
	}, [isError, isSuccess, dispatch, errorMessage, history]);

	return (
		<Fragment>
			<div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
						Sign in to your account
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
										id='username'
										name='username'
										type='username'
										autoComplete='username'
										ref={register({ required: true })}
										required
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
							</div>

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
								<Button type='submit' loading={isFetching}>
									Login
								</Button>
							</div>
						</form>
						<div className='mt-6'>
							<div className='relative'>
								<div className='relative flex justify-center text-sm'>
									<span className='px-2 bg-white text-gray-500'>
										Or <Link to='/users'> Signup</Link>
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

export default Login;
