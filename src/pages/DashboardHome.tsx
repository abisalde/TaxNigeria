/**
 *
 * ? Local & Shared Imports
 */
import {sayGreeting} from '@helpers';

export const DashboardHome = () => {
	return (
		<div className='w-full h-full'>
			<h2 className='text-lg md:text-xl lg:text-2xl font-semibold font-primary leading-7 text-dark'>{`${sayGreeting()}, User`}</h2>
			<p className='text-lg font-thin leading-5 text-dark font-primary'>
				Track your tax progress and activities.
			</p>
		</div>
	);
};
