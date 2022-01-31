import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './helper.scss';

export const PrivateRoute = ({ component: Component, ...rest }) => {
	const location = useLocation();
	return (
		<Route
			{...rest}
			render={
				(props) =>
					localStorage.getItem('token') ? (
						<>
							<nav className='bg-white shadow-lg'>
								<div className='max-w-6xl mx-auto px-4'>
									<div className='flex justify-around'>
										<div className='flex space-x-7'>
											<div>
												<a href='/' className='flex items-center py-4 px-2'>
													{/* <img
													src='logo.png'
													alt='Logo'
													className='h-8 w-8 mr-2'
												/> */}
													<span className='font-semibold text-gray-500 text-lg'>
														Auth App
													</span>
												</a>
											</div>
											<div className={`hidden md:flex items-center space-x-1`}>
												<a
													href='/application/create'
													className={`py-4 px-2 font-semibold text-gray-500 hover:text-green-500 transition duration-300  ${
														location.pathname === '/application/create'
															? 'selected'
															: ''
													}`}
												>
													Create Application
												</a>
												<a
													href='/'
													className={`py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300  ${
														location.pathname === '/' ? 'selected' : ''
													}`}
												>
													Applications
												</a>
												{/* <a
													href=''
													className='py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300'
												>
													About
												</a>
												<a
													href=''
													className='py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300'
												>
													Contact Us
												</a> */}
											</div>
										</div>
									</div>
								</div>
							</nav>
							<Component {...props} />
						</>
					) : (
						<Redirect
							to={{ pathname: '/login', state: { from: props.location } }}
						/>
					)
				// ) : (
				//   <Redirect
				//     to={{ pathname: '/login', state: { from: props.location } }}
				//   />
				// )
			}
		/>
	);
};
