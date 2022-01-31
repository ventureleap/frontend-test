import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	userSelector,
	getApplications,
	clearState,
	deleteApplication,
} from '../User/UserSlice';
import Loader from 'react-loader-spinner';
import Button from '../../components/Button';
import { useHistory } from 'react-router-dom';
import './application.scss';

const List = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { isFetching, isError, applications, ...rest } =
		useSelector(userSelector);
	console.log('rest', rest);
	useEffect(() => {
		dispatch(getApplications({ token: localStorage.getItem('token') }));
		localStorage.removeItem('application');
	}, [dispatch]);

	useEffect(() => {
		if (isError) {
			dispatch(clearState());
			// history.push('/login');
		}
	}, [isError, dispatch]);

	return (
		<div className='container mx-auto'>
			{isFetching ? (
				<div className='flex justify-center max-h-screen align-center '>
					<Loader type='Puff' color='#00BFFF' height={100} width={100} />
				</div>
			) : (
				<>
					<div className='min-h-screen bg-gray-50 flex flex-col justify-center py-6 sm:px-6 lg:px-8'>
						<div className='sm:mx-auto sm:w-full sm:max-w-md'>
							<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 .custom-heading-font-size'>
								Applications
							</h2>
							<Button
								className='mt-4'
								onClick={() => history.push('/application/create')}
							>
								Create New
							</Button>
						</div>
						<div className='mt-8'>
							<div className='flex items-center justify-center'>
								<div className='container'>
									<table className='w-full sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5'>
										<thead className='text-black'>
											<tr className='bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0'>
												<th className='p-3 text-left'>ID</th>
												<th className='p-3 text-left'>Language</th>
												<th className='p-3 text-left'>Name</th>
												<th className='p-3 text-left'>Secret</th>
												<th className='p-3 text-left'>Username</th>
												<th className='p-3 text-left'>version</th>
												<th className='p-3 text-left' width='110px'>
													Actions
												</th>
												<th className='p-3 text-left' width='110px'>
													Actions
												</th>
											</tr>
										</thead>
										<tbody className='flex-1 sm:flex-none'>
											{applications?.map((app) => (
												<tr
													key={app.id}
													className='flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0'
												>
													<td className='border-grey-light border hover:bg-gray-100 p-3'>
														{app.id}
													</td>
													<td className='border-grey-light border hover:bg-gray-100 p-3'>
														{app.lang}
													</td>
													<td className='border-grey-light border hover:bg-gray-100 p-3 truncate'>
														{app.name}
													</td>
													<td className='border-grey-light border hover:bg-gray-100 p-3 truncate'>
														{app.secret}
													</td>
													<td className='border-grey-light border hover:bg-gray-100 p-3 truncate'>
														{app.username}
													</td>
													<td className='border-grey-light border hover:bg-gray-100 p-3 truncate'>
														{app.version}
													</td>
													<td
														onClick={async () => {
															if (window.confirm('are you sure!')) {
																await dispatch(
																	deleteApplication({ id: app.id }),
																);
																dispatch(getApplications({}));
															}
														}}
														className='border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer'
													>
														Delete
													</td>
													<td
														onClick={async () => {
															localStorage.setItem(
																'application',
																JSON.stringify(app),
															);
															history.push('/application/edit');
														}}
														className='border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer'
													>
														Edit
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default List;
