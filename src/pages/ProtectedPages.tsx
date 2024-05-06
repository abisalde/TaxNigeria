import {Navigate, Outlet} from 'react-router-dom';
/**
 * ? Local & Shared Imports
 *
 */

import {useGlobalState} from '@lib/reducer';
import {storeCookie} from '@lib/storage';
import {USER_EMAIL_KEY} from '@constants/env';
import {DashboardLayout} from '@tax-nigeria-components/Layout';

export const ProtectedPages = () => {
	const {state} = useGlobalState();

	if (!state.isAuthenticated) {
		return <Navigate to='/sign-in' replace state={{path: location.pathname}} />;
	} else if (!state.User?.emailVerified) {
		storeCookie({
			key: USER_EMAIL_KEY,
			value: JSON.stringify(state.User?.displayName),
		});
		return <Navigate to='/verify-email' />;
	} else {
		return (
			<DashboardLayout>
				<Outlet />
			</DashboardLayout>
		);
	}
};
