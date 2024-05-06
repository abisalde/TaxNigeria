import * as React from 'react';

import {BiLogOutCircle} from 'react-icons/bi';
import {BiMenuAltLeft} from 'react-icons/bi';

/**
 * ? Local & Shared Imports
 */

import {resetAppState, useGlobalState} from '@lib/reducer';
import {useWindowSize} from '@hooks';
import {MobileSideBar, SideBar} from './SideBar';

export const DashboardLayout = ({children}: React.PropsWithChildren) => {
	const [collapse, setCollapse] = React.useState(false);
	const [visibleHover, setVisibleHover] = React.useState<
		Record<string, string>
	>({});
	const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);

	const {state, dispatch} = useGlobalState();

	const handleCollapse = () => setCollapse((c) => !c);
	const handleVisible = (title: string) => setVisibleHover({[title]: title});

	const handleLogout = () => resetAppState(dispatch);
	const handleMobileOpen = () => setMobileOpen((o) => !o);

	const {width} = useWindowSize();

	return (
		<div className='relative flex h-screen w-full flex-col md:flex-row'>
			<SideBar
				collapse={collapse}
				handleCollapse={handleCollapse}
				handleVisible={handleVisible}
				visibleHover={visibleHover}
				state={state}
				setVisibleHover={setVisibleHover}
			/>
			<MobileSideBar
				collapse={collapse}
				handleCollapse={handleCollapse}
				handleVisible={handleVisible}
				visibleHover={visibleHover}
				state={state}
				setVisibleHover={setVisibleHover}
				width={width}
				mobileView={mobileOpen}
				closeAction={handleMobileOpen}
			/>
			<section className='flex w-full  flex-col bg-[#F3F4FF]'>
				<header className='sticky top-0 z-20 flex w-full items-center justify-between border-b  border-dark/25 px-5 py-2.5'>
					<div
						className='block md:hidden'
						role='button'
						aria-label='Click to pop up side bar'
						onClick={handleMobileOpen}
					>
						<BiMenuAltLeft fontSize={35} />
					</div>
					<div></div>
					<div className=' flex justify-end'>
						<button
							onClick={handleLogout}
							role='button'
							aria-label='Logout'
							className='flex space-x-2 rounded-lg border-2 border-primary px-4 py-2 text-primary'
						>
							<BiLogOutCircle fontSize={28} className='text-primary' />
							<p className='text-base font-medium'>Logout</p>
						</button>
					</div>
				</header>
				<main
					className='w-full flex-grow overflow-y-auto p-4 md:p-7 lg:p-10'
					id='scrolling'
				>
					{children}
				</main>
			</section>
		</div>
	);
};
