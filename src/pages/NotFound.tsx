import {Link} from 'react-router-dom';

export const NotFound = () => {
	return (
		<div className='w-full h-screen flex flex-col justify-center items-center space-y-6'>
			<h2 className='text-3xl font-semibold font-primary text-dark leading-6'>
				OOPS!!!
			</h2>
			<p className='text-xl font-medium text-dark'>Page Not Found</p>
			<Link
				className='w-96  text-center bg-primary px-6 py-3 rounded-md  text-xl font-medium text-white'
				aria-label='Go back to home'
				to='/'
			>
				Go Home
			</Link>
		</div>
	);
};
