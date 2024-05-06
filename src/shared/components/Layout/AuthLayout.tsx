import * as React from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';

export const AuthLayout = ({children}: React.PropsWithChildren) => {
	const location = useLocation();

	const options = React.useMemo(() => {
		const isSignIn = location.pathname === '/sign-in';
		return {
			show: isSignIn || location.pathname === '/sign-up',
			path: isSignIn ? '/sign-up' : '/sign-in',
			text: isSignIn ? "Don't have an account?" : 'Existing user?',
			pathText: isSignIn ? 'Sign Up' : 'Sign In',
		};
	}, [location.pathname]);

	return (
		<section className='relative h-screen w-full bg-[#F3F4FF] px-4'>
			<div>
				<h1 className='font-bold leading-7 text-dark font-primary md:text-3xl py-4 text-2xl'>
					TaxNigeria
				</h1>
				{options.show && (
					<div className='absolute top-0 right-0 p-4'>
						<div className='inline-flex items-center space-x-3'>
							<p className='text-base font-medium'>{options.text}</p>
							<Link to={options.path} className='font-bold text-primary'>
								{options.pathText}
							</Link>
						</div>
					</div>
				)}
			</div>
			<div className='flex h-full w-full mb-6'>
				<div className='hidden items-center justify-center lg:flex lg:w-4/6  mb-8 mx-10 '>
					<div className='bg-primary-light h-[90%] w-full flex items-center justify-center rounded-md p-8 flex-col space-y-5'>
						<div>
							<h2 className='text-2xl font-extrabold leading-8'>
								Exploring tax options in Nigeria?
							</h2>
							<p className='text-xl font-semibold'>
								Discover the perfect tax solution for every need!
							</p>
						</div>
						<img
							src='/images/financials.webp'
							alt='TaxNigeria ::: Authentication'
							loading='lazy'
						/>
						<p className='text-xl font-medium leading-5 font-primary'>
							Access tax resources on-the-go!
						</p>
					</div>
				</div>
				<div
					className='relative flex w-full flex-col items-center justify-center overflow-y-auto overscroll-none px-5 lg:w-1/2'
					id='scrolling'
				>
					{children}
					<Outlet />
				</div>
			</div>
		</section>
	);
};
