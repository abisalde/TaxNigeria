import * as React from 'react';
import {PiCaretDoubleLeftBold} from 'react-icons/pi';
import {Link, NavLink} from 'react-router-dom';
import {CiSettings} from 'react-icons/ci';
import {FaList, FaNetworkWired} from 'react-icons/fa6';
import {MdPerson} from 'react-icons/md';
import {GiReceiveMoney} from 'react-icons/gi';

/**
 *
 * ? Local Shared Imports
 */
import {clsMerge} from '@helpers';
import {type AppState} from '@lib/reducer';

interface SideBarProps {
	collapse: boolean;
	handleCollapse: () => void;
	handleVisible: (t: string) => void;
	visibleHover: Record<string, string>;
	state: AppState;
	setVisibleHover: React.Dispatch<React.SetStateAction<Record<string, string>>>;
	options?: 'mobile' | 'web';
	closeAction?: () => void;
}

export const SideBar: React.FC<SideBarProps> = ({
	collapse,
	closeAction = () => {},
	handleCollapse,
	handleVisible,
	visibleHover,
	state,
	setVisibleHover,
	options = 'web',
}) => {
	return (
		<aside
			className={clsMerge(
				'sticky left-0 top-0 h-screen w-max flex-col bg-[#F0F0F0] px-4 py-4 pt-6 text-white transition-[width] duration-500 ease-linear',
				collapse && ['w-20'],
				options === 'web' && ['hidden md:flex']
			)}
		>
			<button
				role='button'
				aria-label='Close to collapse the side bar'
				onClick={options === 'web' ? handleCollapse : closeAction}
				type='button'
				className='absolute -right-5 top-2 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary'
			>
				<PiCaretDoubleLeftBold
					fontSize={20}
					className={clsMerge('text-dark/80', collapse && [' rotate-180'])}
				/>
			</button>
			<div className='flex w-max items-start py-2.5'>
				<Link
					className='flex items-center justify-start gap-4 text-dark/80'
					to='/'
					aria-label='UniPatrons Home'
					rel='norefferer noopenner'
					role='link'
				>
					<GiReceiveMoney className='text-dark' fontSize={40} />
					<h3
						className={clsMerge(
							'text-xl font-semibold',
							collapse && ['hidden']
						)}
					>
						TaxNigeria
					</h3>
				</Link>
			</div>
			<nav className='mt-1 border-t border-dark py-5'>
				<ul className='relative'>
					{sidebar_data.map(({id, title, Icon, path}) => {
						const isActive = visibleHover[title] === title;
						return (
							<li
								className='relative'
								key={id}
								onMouseEnter={() => handleVisible(title)}
								onMouseLeave={() => setVisibleHover({})}
							>
								<NavLink
									to={path}
									aria-label='UniPatrons Home'
									rel='norefferer noopenner'
									role='link'
									title={title}
									className={({isActive}) =>
										clsMerge(
											'relative mt-2 flex h-14 items-center justify-start gap-4 rounded-md p-3 text-lg font-medium text-white transition-all duration-200 ease-in-out hover:bg-slate-300 hover:outline-none focus:bg-primary-light focus:outline-none active:bg-primary-light active:outline-none',
											isActive && ['bg-primary-light']
										)
									}
								>
									<Icon fontSize={30} className='text-dark/90' />
									<span
										className={clsMerge(
											'font-semibold text-dark/70',
											collapse && ['hidden']
										)}
									>
										{title}
									</span>
									<span
										className={clsMerge(
											'invisible absolute left-20 z-10 rounded-lg bg-primary px-4 py-2 text-center text-white/90 whitespace-nowrap',
											collapse && isActive && ['visible']
										)}
									>
										{title}
									</span>
								</NavLink>
							</li>
						);
					})}
				</ul>
			</nav>
			<div className='mt-auto flex flex-col justify-center py-3'>
				<div className='w-full  gap-4 border-t border-dark py-2'>
					<ul className='relative'>
						{more_data.map(({id, title, Icon, path}) => {
							const isActive = visibleHover[title] === title;
							return (
								<li
									className='relative'
									key={id}
									onMouseEnter={() => handleVisible(title)}
									onMouseLeave={() => setVisibleHover({})}
								>
									<NavLink
										to={path}
										aria-label='UniPatrons Home'
										rel='norefferer noopenner'
										role='link'
										title={title}
										className={({isActive}) =>
											clsMerge(
												'relative mt-2 flex h-14 items-center justify-start gap-4 rounded-md p-3 text-lg font-medium text-white transition-all duration-200 ease-in-out hover:bg-slate-400 hover:outline-none focus:bg-primary -light focus:outline-none active:bg-primary-light active:outline-none',
												isActive && ['bg-primary-light']
											)
										}
									>
										<Icon fontSize={30} className='text-dark/90' />
										<span
											className={clsMerge(
												'font-semibold text-dark/70',
												collapse && ['hidden']
											)}
										>
											{title}
										</span>
										<span
											className={clsMerge(
												'invisible absolute left-20 z-10 rounded-lg bg-primary px-4 py-2 text-center text-white/90 whitespace-nowrap',
												collapse && isActive && ['visible']
											)}
										>
											{title}
										</span>
									</NavLink>
								</li>
							);
						})}
					</ul>
				</div>
				<div className='mt-1 flex w-max items-center gap-4 border-t border-dark py-4'>
					<img
						loading='lazy'
						className='h-12 w-12 flex-1  flex-grow rounded-full object-cover filter hover:scale-100 hover:transform hover:cursor-pointer hover:transition-all hover:duration-200 hover:ease-in-out'
						src={
							state.User?.photoURL !== null
								? state.User?.photoURL
								: 'https://picsum.photos/200/300'
						}
						width={48}
						height={48}
						alt='TaxNigeria User Profile Image'
					/>
					<div
						className={clsMerge(
							'flex flex-col justify-between',
							collapse && ['hidden']
						)}
					>
						<h6 className='text-base font-bold text-dark'>
							{state.User?.displayName ?? ''}
						</h6>
						<p className='text-[14px] font-medium text-dark'>
							{state.User?.email}
						</p>
					</div>
				</div>
			</div>
		</aside>
	);
};

const sidebar_data = [
	{
		id: 'sidebar-001',
		title: 'Overview',
		Icon: FaList,
		path: '/',
	},
	{
		id: 'sidebar-002',
		title: 'Tax data view',
		Icon: FaNetworkWired,
		path: '/tax-data-view',
	},
	{
		id: 'sidebar-003',
		title: 'Stakeholders',
		Icon: MdPerson,
		path: '/stakeholders',
	},
];

const more_data = [
	{
		id: 'more-data=001',
		title: 'Settings',
		Icon: CiSettings,
		path: '/settings',
	},
];

interface MobileSideBarProps extends SideBarProps {
	closeAction: () => void;
	width?: number;
	mobileView: boolean;
}

export const MobileSideBar: React.FC<MobileSideBarProps> = ({
	closeAction,
	mobileView,
	width = 0,
	collapse,
	handleCollapse,
	handleVisible,
	visibleHover,
	state,
	setVisibleHover,
}) => {
	return mobileView && width <= 767 ? (
		<div
			className='fixed inset-0 left-0 z-50 overflow-y-auto'
			tabIndex={-1}
			role='dialog'
		>
			<div
				aria-hidden={true}
				className='fixed inset-0 bg-gray-500 bg-opacity-60 transition-opacity'
				role='presentation'
				onClick={closeAction}
			></div>
			<div
				className='flex min-h-screen transform flex-col items-start justify-start transition delay-500 duration-1000 ease-in-out'
				role='presentation'
			>
				<SideBar
					collapse={collapse}
					handleCollapse={handleCollapse}
					handleVisible={handleVisible}
					visibleHover={visibleHover}
					state={state}
					setVisibleHover={setVisibleHover}
					options='mobile'
					closeAction={closeAction}
				/>
			</div>
		</div>
	) : null;
};
