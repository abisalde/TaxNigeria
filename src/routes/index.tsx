import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';

/**
 * ? Local & Shared Imports
 */
import {
	DashboardHome,
	NotFound,
	ProtectedPages,
	SignIn,
	SignUp,
	VerifyEmail,
	VerifyEmailLoader,
} from '@pages';
import {AuthLayout} from '@tax-nigeria-components/Layout';

export const ROUTES = {
	home_page: '/',
	sign_in: '/sign-in',
	sign_up: '/sign-up',
	verify_email: '/verify-email',
	settings_page: '/settings',
	stakeholders_page: '/stakeholders',
	tax_data_view_page: '/tax-data-view',
};

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route element={<ProtectedPages />} errorElement={<NotFound />}>
				<Route index path={ROUTES.home_page} element={<DashboardHome />} />
				<Route path={ROUTES.settings_page} element={<div>Settings</div>} />
				<Route
					path={ROUTES.tax_data_view_page}
					element={<div>Task Data View</div>}
				/>
				<Route
					path={ROUTES.stakeholders_page}
					element={<div>Stake Holders Page</div>}
				/>
			</Route>
			<Route element={<AuthLayout />} errorElement={<NotFound />}>
				<Route index path={ROUTES.sign_in} element={<SignIn />} />
				<Route path={ROUTES.sign_up} element={<SignUp />} />
				<Route
					path={ROUTES.verify_email}
					element={<VerifyEmail />}
					loader={VerifyEmailLoader}
				/>
			</Route>
		</>
	)
);
